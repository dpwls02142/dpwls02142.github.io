---
# Header
layout: post
title: "2025 OSSCA 체험형 Next.js 6주차 (마지막🥲) 요일별 회고록"
date: "2025-05-30"
categories:
  - OSSCA
tags: 
  - "2025"
  - "OSSCA"
image: "/assets/img/thumbnail/next_6.jpg"
toc: true
toc_sticky: true
---

## 0525

### 헤더 컴포넌트 리팩토링 하기
1. 헤더 로고 이미지에 priority 속성 추가
	- 이 속성을 추가하면 페이지를 렌더링 할 때 해당 요소를 제일 처음에 불러온다. 로고는 중요하니까 ... 가장 처음에 불러오는게 좋다.
2. div => navgatior로 변경
	- 시맨틱 태그에 맞춰서 nav 요소니까 태그 변경하기.
3. 드롭다운 아이템 현재 페이지에 해당될 때 경로 변경
	- 어제 리팩토링 할 때 변수명을 안 바꾸고 그냥 적용해서 현재 위치한 경로에 AppHeaderBottomBar가 뜨지 않는 문제가 있어 수정해줬다.
4. 드롭다운버튼 컴포넌트 이름 AppDropdownButton 으로 바꿔주기
	- 목욜에 멘토님 코드 리뷰 때 까먹고 DropdownButton은 컴포넌트명을 안 바꿨어서 AppDropdownButton으로 컴포넌트명을 바꿔줬다.
5. 스타일 간결하게 작성
	- div를 두 번 중복되게 사용하고 있어서 하나의 div로 바꿔줬다.

### tailwind에 대한 깊생하기
1. tailwind가 용량을 적게 먹는 이유
	1. Tailwind는 3.0 버전부터 JIT(Just-In-Time) 컴파일러를 사용한다.
		- Just In Time이란 말 그대로 사용한 스타일만 스타일을 생성해서 사용한다는거다. 
		- 옛날에는 JIT를 사용하고 싶으면 따로 mode에 명시해서 적어줘야 됐다. [참고 자료](https://github.com/tailwindlabs/tailwindcss/discussions/6256#discussioncomment-1747715)
	2. 옛날 (버전 2.x) 때는 purgeCSS를 활용해서 스타일을 제거했다.
		- purgeCSS는 번들(실제 프로젝트) 때 사용하지 않는 css는 제거해서 최종 css를 생성한다는 의미다.
		- purge란 한글로 "숙청" 이라는 의미를 갖고있다. 누군가가 잘못하면 숙청하라는 말을 하지 않는가 ㅋㅋ
2. tailwind의 로딩 순서
	1. postcss.config.js에서 Tailwind 플러그인 설정
	2. tailwind.config.js에서 설정 및 커스텀 스타일 정의
	3. globals.css에서 @tailwind 지시어로 베이스/컴포넌트/유틸리티 스타일 불러오기
	4. postcss가 Tailwind CSS를 처리하여 실제 CSS 생성
3. 왜 oklch 단위로 컬러를 설정했는가
	- oklch란? 사람의 시각 인지에 더 가까운 색상 공간. 
	- (Lightness, chroma, Hue)의 값을 갖고 있음.
	- **균등한 밝기**: 같은 L값을 가진 색상들은 실제로 같은 밝기로 보임
	- **넓은 색역**: sRGB보다 더 넓은 색상 범위 표현 가능
4. mjs, .cjs 파일의 차이
	- **.mjs**: ES Module 형식 (import/export 사용)
	- **.cjs**: CommonJS 형식 (require/module.exports 사용)

## 0526

### 함수를 컴포넌트 안에 두는 것과 외부에 두는 것의 차이
컴포넌트 안에 두면 해당 컴포넌트 내부에서만 사용 가능함.
응집도는 높고 결합도는 낮은게 좋음.
외부에서도 해당 함수를 많이 사용하면 결합도가 높아지기 때문에.. 우우
또한 컴포넌트 안에 함수를 두면 매개변수가 필요 없어지기에 가독성이 좋아짐.

## 0527 ~ 0529

- 메인 페이지 제작 [관련 PR](https://github.com/2025-contribution-nextjs-team5/ossca-team_nextjs/pull/71)
- Header 컴포넌트 추가 리팩토링 [관련 PR](https://github.com/2025-contribution-nextjs-team5/ossca-team_nextjs/pull/79)

## 회고
6주간의 멘토링 활동이 끝났다.

활동 하면서 좋은 분들을 너무 많이 만나 뵐 수 있어서 영광이었다. <br/>
혼자서만 개발하다가 다른 분들이랑 개발을 해볼 수 있다는 것 자체로도 의미가 컸고, <br/>
코드리뷰도 받아보고, 어떻게 오픈소스에 기여할 수 있는지 알 수 있어 좋았다. <br/>
깃허브를 남이랑 사용한다는 것 자체가 넘 재밌었다. <br/>

아직 프로젝트 개발은 안 끝나서 완전한 끝이라고 할 수 없지만..
리팩토링도 계속하고.. 해야지 음음

6주동안 너무 행복했다 <br/>
멘토님과 모든분들 그저 그냥 GOD <br/>
말재주가 없어서 제대로 된 표현을 못하는게 속상하고 아쉬울 따름이다 <br/>
욕심이 많으면 그만큼 표현 할 줄 알아야되는데, <br/>
여럿이서 있으면 부끄러워 하는 성격 좀 고치고 싶다..!

결론:: 진짜 감사했습니다

![alt text](https://i.pinimg.com/736x/4c/26/27/4c2627fbd0afa4b5ced526dd3f4f3cdc.jpg){:width="200"}