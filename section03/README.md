# Section03. JSX 기본문법 알아보기

리액트를 사용하면 여러분의 웹 애플리케이션에서 사용하는 유저 인터페이스를 재사용 가능한 컴포넌트로 분리하여 작성함으로서, 프로젝트의 유지보수성을 우수하게 해줍니다.

**파일에서 JSX 를 사용하려면, 꼭 React 를 import 해주어야 합니다.**

 import 를 하는 것은, 우리가 webpack 을 사용하기에 가능한 작업입니다. 이렇게 불러오고나면 나중에 프로젝트를 빌드하게 됐을 때 웹팩에서 파일의 확장자에 따라 다른 작업을 하게 됩니다. CSS 파일을 불러오게되면, 나중에 프로젝트에서 사용한 프로젝트를 한 파일에 모두 결합해주는 작업을 진행하고, 자바스크립트 파일을 불러오게되면 모든 코드들이 제대로 로딩되게끔 순서를 설정하고 하나의 파일로 합쳐집니다.

브라우저 상에 우리의 리액트 컴포넌트를 보여주기 위해서는 `ReactDOM.render`함수를 사용합니다. 첫번째 파라미터는 렌더링 할 결과물이고, 두번째 파라미터는 컴포넌트를 어떤 DOM 에 그릴지 정해줍니다.

id 가 root 인 DOM 을 찾아서 그리도록 설정이 되어있는데요, 해당 DOM 은 public/index.html 파일에서 찾아보실 수 있습니다.

해당 파일 안에 있는

```
<div id="root"></div>
```

를 찿아서 렌더링해주게 되는것이죠.



## JSX 알아보기



Babel --> <http://bit.ly/2FJsJmo>

만약에, 컴포넌트를 만들 때 우측에 있는 것처럼 작성해야한다면, 정말 작업하기 싫겠죠? 리액트 개발을 쉽게 하기 위해서, HTML 과 비슷한 문법으로 작성을 하면 이를 React.createElement 를 사용하는 자바스크립트 형태로 변환시켜줍니다.

XML 형태의 코드를, 자바스크립트로 변환해야 하기 때문에, JSX를 제대로 사용하기 위해서 우리는 몇가지 규칙을 준수해줘야 합니다.



### 01. 꼭 닫혀야 하는 태그

태그는 꼭 닫혀있어야 합니다. `<div>` 태그를 열었으면, `</div>` 를 통하여 태그를 꼭 닫아주어야 합니다. 우리가 html 에서 input 이나 br 태그를 작성 할 때 태그를 안닫을때도 있는데요, 똑같이 리액트에서 하시면 이런 오류를 겪에 될 테니 참고하세요.

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <input type="text" /> //input,br 태그는 꼭 닫아준다.
      </div>
    );
  }
}

export default App;
```



### 02. 감싸져 있는 엘리먼트

두개 이상의 엘리먼트는 무조건 하나의 엘리먼트로 감싸져있어야 합니다. 한번, 다음과 같이 코드를 작성해보세요.

```jsx
// src/App.js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
      <div>
        Bye
      </div>
    );
  }
}

export default App;
```

그런데, 가끔 어떠한 상황에선 단순히 감싸기 위해서 새로운 div 를 사용하는게 맘에들지 않을 수도 있습니다. 예를들어서, 스타일 관련 설정을 하면서 코드가 꼬이게 될 수도 있고, table 관련 태그를 작성 할 때 번거로워질 수도 있죠.

그러한 상황엔 다음과 같이 Fragment라는것을 사용하면 됩니다. (이 기능은 v16.2 에 도입되었습니다.)

```jsx
import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          Hello
        </div>
        <div>
          Bye
        </div>
      </Fragment>
    );
  }
}

export default App;
```



### 03. JSX안에 자바스크립트 값 사용하기

JSX 내부에서 자바스크립트 값을 사용 할 땐 이렇게 할 수 있습니다.

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    const name = 'react';
    return (
      <div>
        hello {name}!
      </div>
    );
  }
}

export default App;
```

const 는 ES6 에 도입된 키워드로서, 한번 선언하고 바뀌지 않는 값을 설정 할 때 사용됩니다. 그리고, 바뀌게 될 수 있는 값은 let 을 사용하여 선언합니다.

기존 자바스크립트의 var 과 비슷하다고 생각하시면 되는데, 작동 방식에 있어서 scope 가 다릅니다var 은 scope 가 함수단위 입니다.



### 04. 조건부 렌더링

JSX 내부에서 조건부 렌더링을 할 때는 보통 삼항 연산자를 사용하거나, AND 연산자를 사용합니다.반면에 if 문을 사용 할 수는 없어요 (사용하려면 IIFE(즉시 실행 함수 표현) 을 사용해아합니다.)

#### - 삼항연산자

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {
          1 + 1 === 2 
            ? (<div>맞아요!</div>)
            : (<div>틀려요!</div>)
        }
      </div>
    );
  }
}

export default App;
```



#### - AND연산자

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {
          1 + 1 === 2 && (<div>맞아요!</div>)
        }
      </div>
    );
  }
}

export default App;
```

대부분의 상황엔 위의 방식으로 해결 할 수 있지만, 가끔씩은 좀 복잡한 조건을 작성해야 할 때도 있습니다. 그러한 조건들은 웬만하면 JSX 밖에서 로직을 작성하는것이 좋습니다. 하지만, 꼭 JSX 내부에서 작성해야 한다면, 이렇게 IIFE 를 사용합니다.

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    const value = 1;
    return (
      <div>
        {
          (function() {
            if (value === 1) return (<div>하나</div>);
            if (value === 2) return (<div>둘</div>);
            if (value === 3) return (<div>셋</div>);
            return '없다'
          })()
        }
      </div>
    );
  }
}

export default App;
```

if 문 대신에 switch 문을 사용하셔도 상관 없습니다. 그리고 위 코드는 다음과 같이 쓸 수도 있습니다.

```jsx
(() => {
  if (value === 1) return (<div>하나</div>);
  if (value === 2) return (<div>둘</div>);
  if (value === 3) return (<div>셋</div>);
})()
```



### 05. Style과 ClassName

JSX 에서 style 과 CSS 클래스를 설정 할 때, html 에서 하는 것과 사뭇 다릅니다.우선, 스타일은 다음과 같이 작성 할 수 있습니다.

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: '12px'
    };

    return (
      <div style={style}>
        hi there
      </div>
    );
  }
}

export default App;
```



#### - css 파일을 불러오는 방법

App.css 파일을 열어서 다음과 같이 수정하세요:

```css
.App {
  background: black;
  color: aqua;
  font-size: 36px;
  padding: 1rem;
  font-weight: 600;
}
```

그리고, App.js 는 이렇게 수정해보세요.

```jsx
import React, { Component } from 'react';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        리액트
      </div>
    );
  }
}

export default App;
```



### 06. 주석

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        {/* 주석은 이렇게 */}
        <h1
          // 태그 사이에
        >리액트</h1>
      </div>
    );
  }
}

export default App;
```

