# section08. 배열 데이터 랜더링 및 관리

리액트에서는 배열을 다룰 때 평상시에 하던것 처럼 하시면 안 됩니다. 데이터 추가의 경우, 자바스크립트에서 배열을 다뤄보신분이라면 그냥 배열에 데이터를 추가할 때, push 를 사용하니까 `this.state.array.push('some value');` 이런식으로 하면 되겠지? 라고 생각하실 수 있는데요, 리액트애서는 state 내부의 값을 직접적으로 수정하면 절대로 안됩니다. 이를 불변성 유지라고 하는데요, push, splice, unshift, pop 같은 내장함수는 배열 자체를 직접 수정하게 되므로 적합하지 않습니다. 그 대신에, 기존의 배열에 기반하여 새 배열을 만들어내는 함수인 **`concat, slice, map, filter`** 같은 함수를 사용해야합니다.

리액트에서 불변성 유지가 중요한 이유는 불변성을 유지해야, 리액트에서 모든것들이 필요한 상황에 리렌더링 되도록 설계 할 수 있고, 그렇게 해야 나중에 성능도 최적화 할 수 있기 때문입니다.



### 01.문자열로 표현해보기

```jsx
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  state = {
    information: [],
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      //information: this.stage.information.concat(data)
        information: information.concat(data)
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;
```



### 02.데이터 추가

App 컴포넌트의 state 에 information 이라는 배열을 만들고, 그 안에 배열의 기본값들인 샘플 데이터 두개를 추가하겠습니다.

```jsx
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  id = 0
  state = {
    information: [
      {
        id: 0, // 고유의 키값이 된다
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
           ...data,
          id: this.id++ 
      })
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        {JSON.stringify(information)}
      </div>
    );
  }
}

export default App;
```

id 값의 경우에는, 컴포넌트의 일반 클래스 내부 변수로서 선언해주었습니다. 컴포넌트 내부에서 필요한 값 중에서, 렌더링 되는것과 상관이 없는것들은 굳이 state 에 넣어줄 필요가 없습니다.

render 함수에서는 information 값을 문자열로 변환하여 보여주었습니다. 잠시 후에는 이 데이터를 컴포넌트 형태로 렌더링해보겠습니다.

`Tip`

데이터를 가지고 올때 여러가지 방법들이 있습니다.

```jsx
// 1.  
handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
          name: data.name,
          phone: data.phone,
          id: this.id++ 
      })
    })
  }

// 2.비어 있는 객체에 데이터를 넣는다.
handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat(object.assign({}, data, {
          id: this.id++ 
      }))
    })
  }
```



### 03.데이터 렌더링

이제는 위 배열을 컴포넌트로 변환해서 바꿔주겠습니다. 이 튜토리얼 초반부에서도 언급했지만, 리액트를 다루는건 자바스크립트를 사용하는거랑 매우 비슷합니다. 컴포넌트를 여러개 렌더링 하기 위해서는, 앵귤러 뷰 처럼 디렉티브 같은걸 사용 할 필요 없이, 그냥 자바스크립트 배열의 내장함수인 map 을 사용하면 됩니다.
