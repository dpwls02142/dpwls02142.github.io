---
# Header
layout: post
title: "TypeScript 기초"
date: "2025-04-30"
categories:
  - FRONT
tags: 
  - "2025"
  - "ts"
image: "/assets/img/thumbnail/ts_1.jpg"
toc: true
toc_sticky: true
---

### 타입스크립트란?
타입스크립트는 마이크로소프트에서 개발한 정적 타입 언어다.

자바스크립트는 런타임 시점에 변수의 타입이 결정되는 동적 타입 언어인 반면,
타입스크립트는 코드를 작성하는 시점에 변수의 타입을 지정해줘야 하는,
쉽게 말해 자바스크립트에 **정적 타입 시스템**을 추가한 언어다.

그리고 타입스크립트는 **자바스크립트의 상위 집합(Superset)**이기 때문에
기존 자바스크립트 코드도 .ts 파일 안에 그대로 사용할 수 있다.

### 왜 타입스크립트를 쓸까?

1. 런타임 오류를 줄일 수 있다.
- 코드를 작성할 때 타입 오류를 미리 확인할 수 있기에 배포 이후에 발생하는 런타임 에러를 줄일 수 있다.

2. [계약 설계](https://en.wikipedia.org/wiki/Design_by_contract)가 가능하다.
- 변수나 함수가 어떤 타입의 데이터를 다루는지 명확하게 표현할 수 있다.
- 덕분에 각 컴포넌트나 모듈이 어떤 책임을 지는지도 선명해진다.

3. IDE 자동완성과 같은 개발 도구 지원이 향상된다.
- 타입 정보를 바탕으로 자동완성, 리팩토링, 네비게이션 기능이 훨씬 똑똑해진다.
- VSCode 같은 에디터에서 타입스크립트 지원이 특히 강력하다.

### 타입스크립트를 사용하는 방법

#### 개발 환경 설정

먼저 프로젝트 디렉토리에서 아래 명령어로 초기 설정을 해준다.
```bash
# package.json 생성
npm init -y

# 타입스크립트 설치 (개발용 의존성)
npm install typescript --save-dev
```

그리고 타입스크립트 파일을 컴파일할 때는 `tsc` 명령어를 사용한다.
```bash
tsc {파일명}.ts
```

하지만 매번 이렇게 컴파일하기는 귀찮으니까 `tsconfig.json` 파일을 만들어서 컴파일 옵션을 설정해두자. [참고](https://www.typescriptlang.org/tsconfig/)
```bash
{
    "compilerOptions": {
        "allowJs": true,        // 자바스크립트 파일 컴파일 허용
        "checkJs": true,        // 자바스크립트 파일의 오류 검사 수행
        "noImplicitAny": true,  // 암시적 any 타입 사용 시 오류 발생
        "target": "es5",        // 컴파일된 자바스크립트의 버전 설정
        "outDir": "./dist",     // 컴파일된 파일이 저장될 디렉토리
        ...                     
    }
}
```
이제 `tsc`만 입력하면 현재 디렉토리의 설정에 따라 전체 프로젝트가 컴파일된다.

##### 용어 정리
- npm: Node Package Manager의 약자로, 외부 라이브러리나 도구를 설치하고 관리할 수 있는 툴. Node.js 설치 시 자동 포함된다.
- json: JavaScript Object Notation의 약자로, 자바스크립트 문법을 기반으로 데이터를 구조화한 포맷. 설정 파일이나 API 데이터 등에 자주 쓰인다.

### 타입스크립트에서의 변수 선언

- 문자열


```ts
let str: string = "hello";
```

- 숫자


```ts
let num: number = 10;
```

- 배열


```ts
// 배열 타입 선언 - 제네릭 사용
let numArr: Array<number> = [1, 2, 3];
let stringArr: Array<string> = ['1', '2', '3'];

// 혹은 이런 방식도 가능
let items: number[] = [1, 2, 3];
```


- 튜플


```ts
// 배열과 비슷하지만, 요소의 개수와 타입을 고정
let address: [string, number] = ['gangnam', 100];
address[0] = 'japan';
```

> 참고: 파이썬에서는 튜플이 **불변(immutable)**이지만, 타입스크립트의 튜플은 그냥 인덱스별 타입만 고정된 배열일 뿐, 그 안의 값은 변경 가능하다.
>> [왜 파이썬에서는 튜플이 불변 객체일까?](https://stackoverflow.com/questions/1538663/why-are-python-strings-and-tuples-made-immutable)


- 객체


```ts
let person: { name: string; age: number } = {
  name: 'dpwls',
  age: 100,
};
```


- Boolean


```ts
let show: boolean = true;
```

### 타입스크립트에서의 함수 선언

#### 기본 형태
```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

#### 함수 파라미터 개수
자바스크립트에서는 함수 호출 시, 정의된 파라미터의 개수보다 적거나 많은 인자를 전달해도 오류가 나지 않는다. 없는 인자는 그냥 undefined로 처리된다.

```js
function jsFunc(a, b) {
  return a + b;
}
jsFunc(1); // → NaN
```

하지만 타입스크립트에서는 정의된 파라미터 개수와 호출 시의 파라미터 인자 개수가 다르면, 코드를 작성하는 과정에서 오류가 발생한다.

```ts
function tsFunc(a: number, b: number): number {
  return a + b;
}
tsFunc(1); // → Error (Expected 2 arguments, but got 1.)
```

#### 옵셔널 파라미터 (Optional Parameter)
```ts
function log(a: string, b?: string, c?: string) {
  // b와 c는 선택적으로 받을 수 있음
}
```
변수명 뒤에 `?`를 붙이면 해당 파라미터는 **옵션(선택)** 사항이라는거다.
즉 함수 호출 시 해당 파라미터를 넣지 않아도 오류가 발생하지 않는다.

### 참고
[타입스크립트 입문 - 기초부터 실전까지](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%85%EB%AC%B8/dashboard)