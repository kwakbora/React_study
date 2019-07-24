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

그리고 윈도우의 경우 ,Git Bash를 설치합니다. (편의상 설치)
