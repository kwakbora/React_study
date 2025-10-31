# Section02. React 프로젝트 시작하기



리액트 프로젝트는 보통 우리가 옛날에 jQuery 같은것을 단순히 `<script src="..."><script>` 의 형태로 불러와서 사용했던 것 처럼 사용하지는 않습니다. 그렇게 하려면 할 수 는 있는데 굉장히 제한적입니다. 그 대신에, 리액트 프로젝트를 제대로 작업 하려면 컴퓨터에 Node, yarn, Webpack, Babel 등의 도구를 설치하여 프로젝트를 설정해주어야 합니다.

리액트 프로젝트를 바닥부터 설정하는 것은 초심자에겐 꽤나 복잡한 작업입니다. 다행히도, 페이스북에서 제공해주는 도구[create-react-app](https://github.com/facebook/create-react-app)를 통하여 이 작업을 간단하게 준비해줄 수 있답니다.

리액트 프로젝트를 만들게 되면서, **컴포넌트** 를 여러가지 파일로 분리해서 저장 할 것이고, 또 이 컴포넌트는 일반 자바스크립트가 아닌 **JSX** 라는 문법으로 작성하게 됩니다. 여러가지의 파일을 한개로 결합하기 위해서 우리는 Webpack 이라는 도구를 사용하고, JSX 를 비롯한 새로운 자바스크립트 문법들을 사용하기 위해서 우리는 Babel 이라는 도구를 사용합니다.



## 1. 리액트 하기 전 준비사항

1. **Node.js**: Webpack 과 Babel 같은 도구들이 자바스크립트 런타임인 Node.js 를 기반으로 만들어져있습니다. 그렇기에 해당 도구들을 사용하기 위해서 Node.js 를 설치합니다.

2. **Yarn**: Yarn 은 조금 개선된 버전의 npm 이라고 생각하시면 됩니다. npm 은 Node.js 를 설치하게 될 때 같이 딸려오는 패키지 매니저 도구입니다. 프로젝트에서 사용되는 라이브러리를 설치하고 해당 라이브러리들의 버전 관리를 하게 될 때 사용하죠. 우리가 Yarn 을 사용하는 이유는, 더 나은 속도, 더 나은 캐싱 시스템을 사용하기 위함입니다.

3. **코드 에디터**: 그리고, 코드 에디터를 준비하세요. 여러분이 좋아하는 에디터가 있다면, 따로 새로 설치하지 않고 기존에 사용하시던걸 사용하셔도 됩니다. 저는 주로 VSCode 를 사용합니다. 이 외에도, Atom, WebStorm, Sublime 같은 훌륭한 선택지가 있습니다.

4. 윈도우의 경우, [Git for Windows](https://gitforwindows.org/) 를 설치해서 앞으로 터미널에 무엇을 입력하라는 내용이 있으면 함께 설치되는 Git Bash 를 사용하세요.

   ​

#### Node.js 설치하기

Node.js 를 현재 기준 LTS 버전인 v8 버전을 설치하세요. 윈도우의 경우에 [노드 공식 홈페이지 다운로드 페이지](https://nodejs.org/ko/download/) 에서 설치를 하면 됩니다.

그리고, macOS, Linux 의 경우 다음과 같이 [nvm](https://github.com/creationix/nvm) 을 통해서 설치하는것을 추천드립니다. nvm 은 여러 종류의 Node.js 버전을 설치 할 수 있게 해주는 버전입니다. 나중에 새 버전이 나왔을 때 업데이트 하기도 쉽고, 터미널을 통해 어떤 버전을 사용 할지 설정 할 수도 있어서 편리합니다

#### Yarn 설치하기

Yarn 설치는 [Yarn Installation](https://yarnpkg.com/en/docs/install) 페이지에서 여러분의 운영체제에 맞는 방식에 따라 설치하시면 됩니다.



## 2. create-react-app설치 및 사용

설치경로 : https://github.com/facebook/create-react-app

다음 명령어를 입력하여 설치 할 수 있습니다.

```
npm install -g create-react-app
```
```
(2025년 업데이트 vita 버전)
npm create vite@latest
```

만약에 yarn 을 통하여 설치하고 싶다면 다음과 같이 입력하시면 됩니다.

```
yarn global add create-react-app
```



터미널에서 다음 명령어를 입력하세요.

```
create-react-app hello-react
```

성공적으로 설치되면 위와 같은 결과가 뜹니다. 위에서 나타난대로 다음과 같이

```
cd hello-react
yarn start
```

를 입력하시게 되면, 리액트 프로젝트가 시작 될 것입니다.

## 2. tailwind 설치
```
npm install -D tailwindcss
npx tailwindcss init                   # tailwind.config.js 생성
```

#### tailwind.config.js 파일에 코드 추가
```
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### index.css 추가
```
@import 'tailwindcss';
```
