# Section04. props 와 state



props 와 state 는 리액트 컴포넌트에서 데이터를 다룹니다.

props 는 부모 컴포넌트가 자식 컴포넌트에게 주는 값입니다. 자식 컴포넌트에서는 props 를 받아오기만하고, 받아온 props를 직접 수정 할 수는 없습니다.

반면에 state는 컴포넌트 내부에서 선언하며 내부에서 값을 변경 할 수 있습니다.



### 01. 새 컴포넌트 만들기

src 디렉토리에 MyName 이라는 컴포넌트를 만듭니다.

```jsx
import React, { Component } from 'react';

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```

자신이 받아온 props값는 this. 키워드를 통하여 조회 할 수 있습니다.
지금 name 이라는 props를 보여주도록 설정되었습니다.

App.js 에서 import를 통하여 컴포넌트를 불러오고, 랜더링해보았습니다.

```jsx
import React, { Component } from 'react';
import MyName from './MyName';

class App extends Component {
  render() {
    return (
      <MyName name="리액트" />
    );
  }
}

export default App;
```

이렇게 컴포넌트를 만들고나면, 일반 태그를 작성하듯이 작성하면됩니다. 그리고 props값은 name="리액트" 이런식으로 태그의 속성을 설정해주는 것 처럼 해줍니다.



### 02. defaultProps

가끔씩은 실수로 props 를 빠트려먹을때가 있습니다. 혹은, 특정 상황에 props 를 일부러 비워야 할 때도 있구요. 그러한 경우에, props 의 기본값을 설정해줄 수 있는데요, 그것이 바로 defaultProps 입니다.

```jsx
import React, { Component } from 'react';

class MyName extends Component {
  static defaultProps = {
    name: '기본이름'
  }
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

export default MyName;
```

이렇게 하면 만약에 App.js에서  `<MyName />` 이런식으로 name 값을 생략해버리면 “기본이름” 이 나타나게 될 것입니다. 참고로, defaultProps 는 다음과 같은 형태로도 설정 할 수 있습니다.

```jsx
import React, { Component } from 'react';

class MyName extends Component {
  render() {
    return (
      <div>
        안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
      </div>
    );
  }
}

MyName.defaultProps = {
  name: '기본이름'
};

export default MyName;
```

static 을 쓰는 형태는 최신 자바스크립트로 아래 코드로 나중에 Babel이 랜더링을 하게되어, 같은 형태로 나오게 되니, 동일한 코드라 할 수 있다.

### 03.함수형 컴포넌트

단순히 props 만 받아와서 보여주기만 하는 컴포넌트의 경우엔 더 간편한 문법으로 작성할 수 있는 방법이 있습니다. 

```jsx
import React from 'react';

const MyName = ({ name }) => {
  return (
    <div>
      안녕하세요! 제 이름은 {name} 입니다.
    </div>
  );
};

export default MyName;
```

{ Component } 를 불러오지 않고, React만 불러와 사용한다.

함수형 컴포넌트와 클래스형 컴포넌트의 주요 차이점은, state 와 LifeCycle 이 빠져있다는 점입니다. 

그래서, 컴포넌트 초기 마운트가 아주 미세하게 빠르고, 메모리 자원을 덜 사용합니다. 미세한 차이이니, 컴포넌트를 무수히 많이 렌더링 하게 되는게 아니라면 성능적으로 큰 차이는 없습니다.

### 05.state

동적인 데이터를 다룰 때는 state를 사용합니다.

props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이라면, state는 컴포넌트 내부에서 선언하며, 내부에서 값을 변경할 수 있습니다. 값을 변경할 때에는 꼭 setState를 사용해 변경해 주면 됩니다.

Counter.js 라는 파일을 생성하여 다음과 같이 입력해봅니다.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  }

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

만일, 함수형 컴포넌트 형태가 아닐때에는 아래와 같이 표현합니다.
```jsx
import React, { Component } from 'react';

class Counter extends Component {
    {/* super(props)를 호출한 이유는 우리가 컴포넌트를 만들게 되면, component를 상속했으며, 우리가 이렇게 constructor를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 됩니다. 그렇기에 리액트 컴포넌트가 지니고있던 생성자를 super를 통하여 미리 실행하고 그 다움에 우리가 할 작업(state 설정)을 해주는 것입니다.*/}
constructor(props) {
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
      state = {
        number: 0
      }
  }

  handleIncrease() {
    this.setState({
      number: this.state.number + 1
    });
  }
{/* 이렇게 되면 this와의 연경이 끊겨버리기 때문에 constructor에서 수정합니다.*/}

  handleDecrease(){
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

setState 는, 객체로 전달되는 값만 업데이트를 해줍니다.

지금은 state 에 number 값밖에 없지만 만약에 다음과 같이 다른 값이 있다고 가정해봅시다.

```jsx
  state = {
    number: 0,
    foo: 'bar'
  }
```

그러면, this.setState({ number: 1 }); 을 하게 된다면, foo 는 그대로 남고, number 값만 업데이트 됩니다. setState 는 객체의 깊숙한곳 까지 확인하지 못합니다. 예를들어서, state 가 다음과 같이 설정되어있다고 가정한다면,

```jsx
 state = {
    number: 0,
    foo: {
      bar: 0,
      foobar: 1
    }
  }
```

```jsx
this.setState({
  foo: {
    foobar: 2
  }
})
```

우와 같이 setState를 변경한다고 해서 foobar 값이 업데이트 되지 않습니다.

그 대신에 위와 같은 상황에서는 이렇게 해주어야합니다:

```jsx
this.setState({
  number: 0,
  foo: {
    ...this.state.foo,
    foobar: 2
  }
});
```

… 은 자바스크립트의 전개연산자입니다. 기존의 객체안에 있는 내용을 해당 위치에다가 풀어준다는 의미입니다. 그 다음에, 우리가 설정하고 싶은 값을 또 넣어주면 해당 값을 덮어쓰게 됩니다.



### 06.다른방식으로 구현해보기

setState 를 사용하여 값을 업데이트하게 될 때, 기존의 값을 참고하여 값을 업데이트를 하게 될 때, 조금 더 나은 문법으로 할 수 있습니다.

< 기존 작성된 코드 >

```jsx
this.setState({
  number: this.state.number + 1
});
```

< 다양한 방식으로 코드짜기 >

```jsx
{/* setState 에 updater 함수를 만들어서 전달 */}
this.setState(
  (state) => ({
    number: state.number
  })
);

{/* state가 ({number}) 가 되는 비구조화 할당 문법 */}
this.setState(
  ({ number }) => ({
    number: number + 1
  })
);

{/* state가 ({number}) 가 되는 비구조화 할당 문법을 더 간략하게 표현하는 방법 */}
const { number } = this.state;
this.setState({
  number: number + 1
})
```


