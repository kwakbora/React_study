# section07.input 상태 관리

src 디렉토리 내부에 components 라는 디렉토리를 만드세요. 그리고, 그 안에 PhoneForm.js 라는 파일을 만들어서 다음 코드를 입력합니다.

```jsx
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
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

