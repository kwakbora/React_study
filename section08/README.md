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

#### 1_1. Map 함수 알아보기

배열을 가지고 내부에 있는 원소들에 2씩 곱하고 싶다고 가정해 봅시다.

```jsx
const a = [1,2,3,4,5];
const b = [];

b.forEach(number => b.push(number * 2));
```

하지만, forEach 대신에 map 을 사용하시면 조금 더 쉽게 해결 할 수 있습니다.

```jsx
const a = [1,2,3,4,5];
const b = a.map(number => number * 2);
```



#### 1_2. 컴포넌트 만들기

- **PhoneInfo**: 각 전화번호 정보를 보여주는 컴포넌트입니다.
- **PhoneInfoList**: 여러개의 PhoneInfo 컴포넌트들을 보여줍니다.

PhoneInfo.js

```jsx
// file: src/components/PhoneInfo.js
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { name, phone, id } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;
```

우리는 info 라는 객체를 props 로 받아와서 렌더링 해줄것입니다. 그런데, 우리가 실수로 info 값을 전달해주는것을 까먹게 된다면 컴포넌트가 크래쉬 될 것입니다. info 가 undefined 일 때에는 비구조화 할당을 통해 내부의 값을 받아올 수 없기 때문입니다.

그렇기 때문에 defaultProps 를 통하여 info 의 기본값을 설정해주었습니다.



PhoneInfoList.js

```jsx
// src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: []
  }

  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={info.id} info={info}/>)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;
```

defaultProps 를 선언할 때에는 앞에 static을 써줘야 합니다. defaultProps는 data의 값이 없을때 에러뜨는 현상을 방지하기 위해 선언합니다.

그리고 key 를 지정하는 이유는 우리가 데이터를 추가 할 때마다 고정적인 고유 값을 부여해주면, 리액트가 변화를 감지해내고 업데이트를 하게 될 때 조금 더 똑똑하게 처리 할 수 있게됩니다.



이제 PhoneInfoList 컴포넌트를 App 에서 렌더링해주세요. 그리고, data 값을 props 로 전달하세요.

```JSX
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
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
      information: information.concat({ id: this.id++, ...data })
    })
  }
  render() {
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <PhoneInfoList data={this.state.information}/>
      </div>
    );
  }
}

export default App;
```

가끔씩은, 데이터에 고유 값이 없을 수 도 있습니다. 그럴 때에는 만약에 key 값을 빼먹으면 렌더링이 되긴 하지만 개발자도구 콘솔에서 경고창이 뜨게 됩니다. 만약에 그 경고가 보고싶지 않다면 다음과 같이 작업 할 수 있습니다.

```jsx
const list = data.map(
      (info, index) => (<PhoneInfo key={index} info={info}/>)
    );
```
**위처럼 하면 단순히 경고만 감출 뿐이고 성능상으로는 key 가 없는 것과 동일합니다.**

### 04.데이터 제거

기존의 배열 데이터를 건들이지 않으면서 데이터를 제거하기 위해선, 여러가지 방법이 있을 수 있습니다.

첫번째 방법은 slice 와 concat 을 이용하는겁니다. 

ex)

```javascript
const number = [1,2,3,4,5];

number.slice(1,3); //[2,3] 1번부터 3번까지의 숫자
number.slice(0,2).concat(number.slice(3,5)); //[1,2,4,5]

//아래 배열 전개 연산자로도 구현가능
[
    ...number.slice(0,2),
    10,
    ...number.slice(3,5)    
] 
//[1,2,10,4,5]
```

두번째 방벙은 배열에는 filter 라는 내장함수가 있는데, 이 함수는 특정 조건에 부합되는 원소들만 뽑아내서 새 배열을 만들어줍니다.

```javascript
const number = [1,2,3,4,5];

number.filter(n => n>3); //[4,5]
number.filter(n => n !== 3); // [1, 2, 4, 5]
```



App.js

```jsx
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
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
      information: information.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { information } = this.state; //비구조할당
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <PhoneInfoList 
          data={information}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
```

PhoneInfoList 에서는 props 로 전달받은 onRemove 를 그대로 전달해주겠습니다. 이 함수가 전달되지 않았을 경우를 대비하여 해당 props 를 위한 defaultProps 도 설정하세요.



PhoneInfoList .js

```jsx
// file: src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
  }

  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
        />)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;
```

그 다음에는, PhoneInfo 쪽에서 삭제 기능을 구현해주겠습니다. 우리는 삭제 버튼을 만들어서 해당 버튼에 이벤트를 설정하겠습니다.



PhoneInfo .js

```jsx
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    },
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
```

### 05.데이터 수정

수정할때도 마찬가지로 불변성을 지켜줘야합니다. 기존의 배열과, 그리고 그 내부에있는 객체를 절대로 직접적으로 수정하시면 안됩니다.

데이트를 수정할떄는 slice,map 함수를 사용합니다.

PhoneInfoList.js

```jsx
// file: src/App.js
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
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
      information: information.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    /*
    this.setState({
     information: information.map(
     info =>{
         if(info.id === id){
             return{
			id,
			...data,
             };
         }
         return info;
     	}
     )
    })
    */
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data } 
          // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
          : info // 기존의 값을 그대로 유지
      )
    })
  }
  render() {
    const { information } = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <PhoneInfoList 
          data={information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```



PhoneInfoList .js

```jsx
// file: src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;
```



PhoneInfo.js

```jsx
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    },
  }

  state = {
    // 우리는 수정 버튼을 눌렀을 떄 editing 값을 true 로 설정해줄것입니다.
    // 이 값이 true 일 때에는, 기존에 텍스트 형태로 보여주던 값들을
    // input 형태로 보여주게 됩니다.
    editing: false,
    // input 의 값은 유동적이겠지요? input 값을 담기 위해서 각 필드를 위한 값도
    // 설정합니다
    name: '',
    phone: '',
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  // editing 값을 반전시키는 함수입니다
  // true -> false, false -> true
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  // input 에서 onChange 이벤트가 발생 될 때
  // 호출되는 함수입니다
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }


  componentDidUpdate(prevProps, prevState) {
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {
      // editing 값이 true -> false 로 전환 될 때
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    
    if (editing) { // 수정모드
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }


    // 일반모드
    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
```



