# section06. 리액트 작업환경 직접 설정하기

## 01.Node.js 설치하기

Node.js 를 현재 기준 LTS 버전인 v8 버전을 설치하세요. [윈도우의 경우에는 노드 공식 홈페이지 다운로드](https://nodejs.org/ko/download/) 페이지 에서 설치하면 됩니다.



그리고 macOS, Linux 의 경우 다음과 같이 nvm 을 통해서 설치하는것을 추천합니다.

<https://github.com/nvm-sh/nvm>

nvm은 여러 종유릐 Node.js 버전을 설치 할 수 있게 해주는 버전입니다. 나중에 새 버전이 나왔을때 업데이트 하기도 쉽고, 터미널을 통해 어떤 버전을 사용 할지 설정 할 수도 있어서 편리합니다.



```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

or

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

 위에 코드를 코드창에 쓰고 아래 코드를 넣으면 됩니다.

```
nvm install --lts
```





## 02.Yarn 설치하기

다시 Node.js 로 돌아가서 설치가 완료되면 노드 모듈관리자인 npm이 설치가 됩니다.

라이브러리 버전관리를 위해 npm을 사용하는데 npm 대신에 yarn 을 사용합니다,

<https://yarnpkg.com/lang/en/>

더 나은 속도 더 나은 캐싱시스템을 위해 yarn 을 사용합니다. 우리나라는 인터넷속도가 빨라 문제는 안되지만 성능이나 인터넷 속도가 느릴때 사용하면 좋습니다.





## 03.에디터 설치

강좌에서는 VSCode 사용

그리고 윈도우의 경우 , Git Bash를 설치합니다. (편의상 설치)





## 04.설치가 잘 되었는지 확인하자!

설치한 폴더에서 Git Bash를 열어 

```
node -v
v10.16.0  /* 버전 확인 */
```

```
yarn -v
1.16.0  /* 버전 확인 */
```

버전 8이상이면 됩니다.



<https://github.com/facebook/create-react-app>

위 페이지에서 설치하는 방법이 자세히 나와있습니다.

## 05.React 사용하기

파일을 생성하여 react를 설치해 봅니다.

1.원하는 폴더를 생성합니다.

```
mkdir react-tutorials
```

2.폴더 내 React 프로젝트 명 폴더를 생성합니다.

```
cd contact-app
```

3.React를 시작합니다.

```
npm create-react-app contact-app
```

4.설치가 되고 마지막에 yarn start 를 하겠냐는 문구가 나오면 아래와 같이 입력합니다.

(yarn 개발서버 환경 설정)

```
cd contact-app
yarn start
```

5.브라우저가 뜨면서 React 사용할 수 있는 환경이 만들어집니다.

6.VScode로 가서 contact-app 폴더를 열어 살펴보면 src 폴더내 index.js 에서 확인 할 수 있습니다.

7.create-react-app 설정하여 사용하게 되면 React 에서 사용하는 webpack과 babel설정은node_modules > react-script > config 안에서 확인 하실 수 있습니다.
