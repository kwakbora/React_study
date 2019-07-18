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
