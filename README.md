# 프론트엔드 개발 환경 설치 가이드 (Next.js & pnpm)

Node.js 24 LTS 버전 확인

```bash
node -v
```

## 1. pnpm 설치

pnpm은 효율적인 패키지 관리와 디스크 공간 절약을 위해 사용됩니다.

```bash
npm install -g pnpm
```

## 2. 새 프로젝트 생성

최신 Next.js 프로젝트를 TypeScript, ESLint, Tailwind CSS와 함께 생성합니다

```bash
pnpm create next-app@latest my-project
```

- TypeScript? yes
- ESLint? yes
- TailwindCSS? yes
- src/ directory? yes
- App Router? yes
- import alias (@/\*)? yes

## 3. pnpm 설정 최적화 (Peer Dependencies 관리)

peer dependency 충돌을 유연하게 처리하고 자동 설치되도록 설정합니다.

```bash
# 필요한 peerDependencies를 자동으로 설치해 줍니다. (편의성 증가)
pnpm config set auto-install-peers true
# peerDependencies 버전 불일치 시에도 경고만 표시 (설치 안정성 향상)
pnpm config set strict-peer-dependencies false
```

## 4. shadcn/ui 설치 및 초기화

컴포넌트 개발에 필수적인 shadcn/ui를 설치하고 초기 환경을 설정합니다.

```bash
pnpm dlx shadcn@latest init
```

### 4.1 shadcn/ui 컴포넌트 개별설치(예시)

```bash
pnpm dlx shadcn@latest add accordion alert-dialog alert aspect-ratio avatar badge breadcrumb button-group button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu empty field form hover-card input-group input-otp input item kbd label menubar native-select navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner spinner switch table tabs textarea toggle-group toggle tooltip
```

## 5. Storybook 설치 및 설정

컴포넌트 시각화 및 테스트를 위한 Storybook 환경을 구축합니다.

```bash
# minimal 선택으로 개별 애드온 추가
pnpm dlx storybook@latest init
? What configuration should we install? Minimal
# 필수 유틸리티, 문서화, 접근성(A11y), 테스트 자동화, Figma 연동 애드온 추가
pnpm add -D @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-docs
```

## 6. MSW(Mock Service Worker) 설치 및 설정

개발 환경에서 API 목킹(Mocking)을 통해 백엔드 없이 컴포넌트를 독립적으로 테스트합니다.

```bash
pnpm add msw --save-dev
# MSW와 Storybook 연동 애드온 설치
pnpm add msw msw-storybook-addon --save-dev
# public 디렉토리에 MSW 서비스 워커 파일 생성
npx msw init public/ --save
```

### 6.1. 목킹 핸들러 정의 (src/mocks/handlers.ts)

목킹할 API 엔드포인트와 응답 데이터를 정의합니다.

```typescript
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: 1,
      name: "John Doe",
      email: "hong@example.com",
    });
  }),
];
```

### 6.2. Storybook에 MSW 연동 (.storybook/preview.ts)

MSW를 Storybook에 초기화하고 모든 스토리에 핸들러를 로드합니다.

```typescript
import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../src/mocks/handlers";
import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

initialize();

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: handlers,
    },
  },
};

export default preview;
```

### 6.3. Storybook 설정 파일 업데이트 (.storybook/main.ts)

MSW 애드온을 등록하고 Next.js 환경 설정을 명시합니다.

```typescript
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "msw-storybook-addon",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  features: {
    experimentalRSC: true,
  },
};

export default config;
```

## 7. 스타일 설정 src/app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css"; //shadcn/ui에서 사용
@import "../styles/tokens.css"; //figma token style

html {
  font-size: 62.5%; /* 1rem = 10px */
}
```
## React 강좌

HTML, JavaScript 에 대한 이해가 필요합니다. 이 강좌에서 사용되는 리액트 버전은 16.3 이상 버전 입니다.

### section01. 리액트는 무엇인가 

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section01/README.md)

### section02. 리액트 프로젝트 시작하기

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section02/README.md)

### section03. JSX 기본문법 알아보기

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section03/README.md)

### section04. props 와 state 사용하는 방법

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section04/README.md)

### section05. Lifecycle API 소개 및 사용법

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section05/README.md)

### section06. 리액트 작업환경 직접 설정하기

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section06/README.md)

### section07. 인풋 상태 관리

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section07/README.md)

### section08. 배열 데이터 랜더링 및 관리

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section08/README.md)

### section09. 최적화,활용,Ref

--> [작업 확인하기](https://github.com/kwakbora/React_study/blob/master/section09/README.md)
