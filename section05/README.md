# Section05.LifeCycleAPI

 이 API 는 컴포넌트가 여러분의 브라우저에서 나타날때, 사라질때, 그리고 업데이트 될 때, 호출되는 API 입니다.

![img](https://pbs.twimg.com/media/DZ-97vzW4AAbcZj.jpg)



## 01.컴포넌트 초기 생성

### constructor

```jsx
constructor(props) {
  super(props);
}
```

이 부분은 컴포넌트 생성자 함수입니다. 컴포넌트가 새로 만들어질 때마다 이 함수가 호출됩니다.



### componentWillMount

```jsx
componentWillMount() {

}
```

이 API 는 컴포넌트가 여러분의 화면에 나가나기 직전에 호출되는 API 입니다.

v16.3 이후부터는 `UNSAFE_componentWillMount()` 라는 이름으로 사용됩니다. 기존에 이 API 에서 하던 것들은 위에 있는 constructor 와 아래에서 다뤄볼 componentDidMount 에서 충분히 처리 할 수 있습니다.



### componentDidMount

```jsx
componentDidMount() {
  // 외부 라이브러리 연동: D3, masonry, etc
  // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
  // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
}
```

이 API 는 여러분의 컴포넌트가 화면에 나타나게 됐을 때 호출됩니다. 여기선 주로 D3, masonry 처럼 DOM 을 사용해야하는 외부 라이브러리 연동을 하거나, 해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나, DOM 의 속성을 읽거나 직접 변경하는 작업을 진행합니다.



## 02.컴포넌트 업데이트

컴포넌트가 업데이트는 props 의 변화, 그리고 state 의 변화에 따라 결정됩니다. 



### componentWillReceiveProps

```jsx
componentWillReceiveProps(nextProps) {
  // this.props 는 아직 바뀌지 않은 상태
}
```

이 API 는 컴포넌트가 새로운 props 를 받게됐을 때 호출됩니다. 이 안에서는 주로, state 가 props 에 따라 변해야 하는 로직을 작성합니다. 새로 받게될 props 는 nextProps 로 조회 할 수 있으며, 이 때 this.props 를 조회하면 업데이트 되기 전의 API 이니 참고하세요. **이 API 또한 v16.3 부터 deprecate 됩니다.** v16.3 부터는 `UNSAFE_componentWillReceiveProps()` 라는 이름으로 사용됩니다. 그리고, 이 기능은 상황에 따라 새로운 API [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 로 대체 될 수도 있습니다.

### [NEW] static getDerivedStateFromProps()

이 함수는, v16.3 이후에 만들어진 라이프사이클 API 인데요, 이 API 는 props 로 받아온 값을 state 로 동기화 하는 작업을 해줘야 하는 경우에 사용됩니다.

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  // 여기서는 setState 를 하는 것이 아니라
  // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
  // 사용됩니다.
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```



### shouldComponentUpdate (완전중요)

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```

이 API 는 컴포넌트를 최적화하는 작업에서 매우 유용하게 사용됩니다. 우리가 저번에 배웠을 떄, 리액트에서는 변화가 발생하는 부분만 업데이트를 해줘서 성능이 꽤 잘 나온다고 했었지요? 하지만, 변화가 발생한 부분만 감지해내기 위해서는 Virtual DOM 에 한번 그려줘야합니다.

즉, 현재 컴포넌트의 상태가 업데이트되지 않아도, 부모 컴포넌트가 리렌더링되면, 자식 컴포넌트들도 렌더링 됩니다. 여기서 “렌더링” 된다는건, render() 함수가 호출된다는 의미입니다.

변화가 없으면 물론 DOM 조작은 하지 않게 됩니다. 그저 Virutal DOM 에만 렌더링 할 뿐이죠. 이 작업은 그렇게 부하가 많은 작업은 아니지만, 컴포넌트가 무수히 많이 렌더링된다면 얘기가 조금 달라집니다. CPU 자원을 어느정도 사용하고 있는것은 사실이니까요.

쓸대없이 낭비되고 있는 이 CPU 처리량을 줄여주기 위해서 우리는 Virtual DOM 에 리렌더링 하는것도,불필요할경우엔 방지하기 위해서 shouldComponentUpdate 를 작성합니다.

이 함수는 기본적으로 true 를 반환합니다. 우리가 따로 작성을 해주어서 조건에 따라 false 를 반환하면 해당 조건에는 render 함수를 호출하지 않습니다.



## 03.컴포넌트 제거

컴포넌트가 더 이상 필요하지 않게 되면 단 하나의 API 가 호출됩니다.



### componentWillUnmount

```jsx
componentWillUnmount() {
  // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
}
```

여기서는 주로 등록했었던 이벤트를 제거하고, 만약에 setTimeout 을 걸은것이 있다면 clearTimeout 을 통하여 제거를 합니다. 추가적으로, 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose 기능이 있다면 여기서 호출해주시면 됩니다.



## 04.컴포넌트에 에러 발생

render 함수에서 에러가 발생한다면, 리액트 앱이 크래쉬 되어버립니다. 그러한 상황에 유용하게 사용 할 수 있는 API 가 한가지 있는데 한번 알아봅시다!



### componentDidCatch

```jsx
componentDidCatch(error, info) {
  this.setState({
    error: true
  });
}
```

에러가 발생하면 이런식으로 componentDidCatch 가 실행되게 하고, state.error 를 true 로 설정하게 하고, render 함수쪽에서 이에 따라 에러를 띄워주시면 됩니다.

이 API 를 사용하시게 될 때 주의하실 점이 있는데요, 컴포넌트 자신의 render 함수에서 에러가 발생해버리는것은 잡아낼 수는 없지만, 그 대신에 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러들을 잡아낼 수 있습니다.

예시) Counter 생성해 보기

```jsx
import React, { Component } from 'react';

const Promblematic = () => {
  throw (new Error('버그가 나타났다!'));
  return (
    <div>
      
    </div>
  );
};

class Counter extends Component {
  state = {
    number: 0,
    error: false
  }

  // (...)
  
  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }
  
  render() {
    if (this.state.error) return (<h1>에러발생!</h1>);

    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        { this.state.number === 4 && <Promblematic /> }
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

