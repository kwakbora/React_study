# section07.input 상태 관리

src 디렉토리 내부에 components 라는 디렉토리를 만드세요. 그리고, 그 안에 PhoneForm.js 라는 파일을 만들어서 다음 코드를 입력합니다.

```jsx
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
       //name : e.target.value
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name} {this.state.phone}</div>
      </form>
    );
  }
}

export default PhoneForm;
```

onChange 이벤트가 발생하면, e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어올 수 있습니다. 해당 값을 state 의 name 부분으로 설정하세요.
render 부분에서 input 을 렌더링 할 떄에는 value 값과 onChange 값을 넣어주었습니다. onChange 는 input 의 텍스트 값이 바뀔때마다 발생하는 이벤트입니다. 

여기에 우리가 만들어둔 handleChange 를 설정했습니다. 그리고, 나중에 우리가 데이터를 등록하고나면 이 name 값을 공백으로 초기화 해줄건데, 그렇게 초기화 됐을 때 input 에서도 반영이 되도록 value 를 설정해주었습니다.

그리고 그 하단에는 name 값이 잘 바뀌고 있는지 확인 할 수 있도록 값을 렌더링해주었습니다.

ex) {this.state.name}



App.js 설정은 아래 코드처럼 입력합니다.

```jsx
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';


class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```


### 부모 컴포넌트에게 정보 전달하기

이제 state 안에 있는 값들을 부모 컴포넌트에게 전달해줄 차례입니다.  

부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용합니다.

![img](https://i.imgur.com/xKe2v5s.png)



우리는 App 에서 handleCreate 라는 메소드를 만들고, 이를 PhoneForm 한테 전달해주겠습니다. 그리고, PhoneForm 쪽에서 버튼을 만들어서 submit 이 발생하면 props 로 받은 함수를 호출하여 App 에서 파라미터로 받은 값을 사용 할 수 있도록 하겠습니다.

우선 App 을 다음과 같이 수정하세요.

```JSX
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }
  render() {
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```

그 다음엔, PhoneForm 에서 버튼과 onSubmit 이벤트를 설정하겠습니다.

```jsx
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```

handleSubmit 함수를 확인해보세요. 맨 위에 `e.preventDefault()` 라는 함수가 호출됐죠? 이 뜻은, 원래 이벤트가 해야 하는 작업을 방지시킨다는 의미입니다. 원래는 form 에서 submit 이 발생하면 페이지를 다시 불러오게 되는데요, 그렇게 되면 우리가 지니고있는 상태를 다 잃어버리게 되니까 이를 통해서 방지해주었습니다.

그 다음에는, props 로 받은 onCreate 함수를 호출하고, 상태값을 초기화해주었습니다.

render 부분에서는 submit 버튼을 만들고, form 부분에 onSubmit 이벤트를 등록해주었습니다.
