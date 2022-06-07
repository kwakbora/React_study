## 1. props test

### _01. props 의 기본 사용법

컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있습니다. props 는 객체 형태로 전달되며, 만약 `name` 값을 조회하고 싶다면 `props.name` 을 조회하면 됩니다.

#### App.js

```javascript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;

```



#### Hello.js

```javascript
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```



### _02. 여러개의 props, 비구조화 할당

#### App.js

```javascript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}

export default App;

```

그 다음에는, Hello 컴포넌트에서 `color` 값을 조회해서 폰트의 색상으로 설정을 해보겠습니다.

#### Hello.js

```javascript
import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;

```

props 내부의 값을 조회 할 때마다 `props.` 를 입력하고 있는데요, 함수의 파라미터에서 [비구조화 할당](https://learnjs.vlpt.us/useful/06-destructuring.html) (혹은 구조 분해라고도 불립니다) 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있습니다.



#### Hello.js (비구조 할당)

```javascript
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```



### _03. defaultProps 로 기본값 설정

컴포넌트에 props 를 지정하지 않았을 때 기본적으로 사용 할 값을 설정하고 싶다면 컴포넌트에 `defaultProps` 라는 값을 설정하면 됩니다.

#### Hello.js

```javascript
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;

```

한번 App 에서 name 이 없는 Hello 컴포넌트를 렌더링해보세요.

#### App.js

```javascript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}

export default App;
```



### _04. props.children

컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children` 을 조회하면 됩니다.

이번에, `props.children` 을 사용하는 새로운 컴포넌트를 만들어보겠습니다.

#### Wrapper.js

```javascript
import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Wrapper;
```

이 컴포넌트를 App 에서 사용해봅시다!

#### App.js

```javascript
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;

```

이렇게 Wrapper 태그 내부에 Hello 컴포넌트 두개를 넣었는데요, 브라우저를 확인하면 다음과 같이 Hello 컴포넌트들은 보여지지 않을 것입니다.



## 2. useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

리액트 16.8 이전 버전에서는 함수형 컴포넌트에서는 상태를 관리할 수 없었는데요, 리액트 16.8 에서 Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태를 관리할 수 있게 되었습니다. 이번에는 useState 라는 함수를 사용해보게 되는데, 이게 바로 리액트의 Hooks 중 하나입니다.

컴포넌트에서 동적인 값을 상태(state)라고 부릅니다. 리액트에 `useState` 라는 함수가 있는데요, 이것을 사용하면 컴포넌트에서 상태를 관리 할 수 있습니다.

```javascript
import React, { useState } from 'react';
```

이 코드는 리액트 패키지에서 `useState` 라는 함수를 불러와줍니다.

```javascript
const [number, setNumber] = useState(0);
```

`useState` 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출해줍니다. 이 함수를 호출해주면 배열이 반환되는데요, 여기서 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수입니다.



## 3. useRef 로 특정 DOM 선택하기

JavaScript 를 사용 할 때에는, 우리가 특정 DOM 을 선택해야 하는 상황에 `getElementById`, `querySelector` 같은 DOM Selector 함수를 사용해서 DOM 을 선택합니다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있습니다. 예를 들어서 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야된다던지, 또는 포커스를 설정해줘야된다던지 등 정말 다양한 상황이 있겠죠. 추가적으로 Video.js, JWPlayer 같은 HTML5 Video 관련 라이브러리, 또는 D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리를 사용해야 할 때에도 특정 DOM 에다 적용하기 때문에 DOM 을 선택해야 하는 상황이 발생 할 수 있습니다.

그럴 땐, 리액트에서 `ref` 라는 것을 사용합니다.

함수형 컴포넌트에서 `ref` 를 사용 할 때에는 `useRef` 라는 Hook 함수를 사용합니다. 



#### InputSample.js

```javascript
import React, { useRef } from 'react';

function InputSample() {

  const nameInput = useRef();

  const onReset = () => {
    nameInput.current.focus(); //현재값을 선택한다. current
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} // ref 를 설정해 준다
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
    </div>
  );
}

export default InputSample;

```

`useRef()` 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 `ref` 값으로 설정해주어야 합니다. 그러면, Ref 객체의 `.current` 값은 우리가 원하는 DOM 을 가르키게 됩니다.

위 예제에서는 `onReset` 함수에서 input 에 포커스를 하는 `focus()` DOM API 를 호출해주었습니다.

## 4. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

이번에는 useEffect 라는 Hook 을 사용하여 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법에 대해서 알아보겠습니다.

### _01. 마운트 / 언마운트

#### UserList.js

```javascript
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
    useEffect(()=>{
        console.log('컴포넌트가 화면에 나타남');
        //props -> strate
        //REST API
        //D3 Video.js
        //setInterval, setTimeout
        return()=>{
            //clearInterval, clearTimeout
            //라이브러리 인스턴스 제거
            console.log('컴포넌트가 사라짐');
        }
    },[]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;

```

`useEffect` 를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 (`deps`)을 넣습니다. 만약에 `deps` 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 `useEffect` 에 등록한 함수가 호출됩니다.

그리고, `useEffect` 에서는 함수를 반환 할 수 있는데 이를 `cleanup` 함수라고 부릅니다. `cleanup` 함수는 `useEffect` 에 대한 뒷정리를 해준다고 이해하시면 되는데요, `deps` 가 비어있는 경우에는 컴포넌트가 사라질 때 `cleanup` 함수가 호출됩니다.

주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있습니다.

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

그리고 언마운트 시에 하는 작업들은 다음과 같은 사항이 있습니다.

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거
- ​

### _02. deps 에 특정 값 넣기

이번에는 deps 에 특정 값을 넣어보도록 하겠습니다. deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 됩니다. 그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 됩니다.

```javascript
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
```

`useEffect` 안에서 사용하는 상태나, props 가 있다면, `useEffect` 의 `deps` 에 넣어주어야 합니다. 그렇게 하는게, 규칙입니다.

만약 `useEffect` 안에서 사용하는 상태나 props 를 `deps` 에 넣지 않게 된다면 `useEffect` 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 됩니다.
