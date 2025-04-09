---
# Header
layout: post
title: "lighthouse 성능 100점 달성하기 with.이미지 렌더링 속도 개선 (SVG, WebP)"
date: "2025-04-09"
categories:
  - Front
tags: 
  - "2025"
  - "CS"
image: "/assets/img/thumbnail/svgfast.jpg"
toc: true
toc_sticky: true
---

### 2줄 요약
1. 이미지 색감이 선명하게 정해져있다? => SVG
2. 이미지에 부드럽고 자연스러운 색감이 많이 포함되어있다? => WEBP

저번에 제작한 [사과 게임](https://drag-make-11-front.vercel.app/) 사이트를 들어가면 이미지 확장자 때문에 초기 로딩이 쫌 느리다.
근데 쫌?이라는건 사람마다 다르지 않는가. [lighthouse](https://en.wikipedia.org/wiki/Lighthouse_(software))로 성능을 재보자 ㄱㄱ

![alt text](/assets/img/posts/250409/1.png)

아닛, 겁나 느리잖아.

어디선가 svg로 바꾸면 렌더링 속도가 빨라진다고 들었던 것 같다.

구글에 svg 변환 사이트를 검색해서 웹사이트에 사용한 에셋들의 포맷을 svg로 바꿔보자.

![alt text](/assets/img/posts/250409/2.jpg)

으아닛, 색감이 통일되었잖아.

왤까? SVG에 대해 알아보자.

### [SVG](https://www.adobe.com/kr/creativecloud/file-types/image/vector/svg-file.html)
SVG(Scalable Vector Graphics)란 약자 그대로 Vector 기반 파일 포맷을 말한다. 이 말은 이미지에 들어가는 모든 요소(color, line, dot, ...)를 수학적으로 정의한다는거다.

그럼 SVG로 간단하게 빨-> 파 그라데이션 사각형을 그려보자.

```xml
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
  <!-- 화면에 직접 그리진 않고 나중에 필요할 때 사용할 목록을 정의(definitions)하는 구간 -->
    <linearGradient id="grad1">
      <stop offset="0%" stop-color="blue" />
      <stop offset="100%" stop-color="red" />
    </linearGradient>
  </defs>
  <rect width="200" height="100" fill="url(#grad1)" />
</svg>
```

1. 먼저 xml 포맷으로 파일을 하나 만든다.
2. 그 후 안에 들어갈 요소들은 `<svg>` 태그로 감싸준다. 이 때 가장 중요한건 `xmlns="http://www.w3.org/2000/svg`"을 선언해줘야한다. xmls란 XML Namespace를 의미하는데, xml 안에서도 여러 종류의 태그가 존재하기 때문에 이 태그가 svg라는걸 xmls로 선언해줘야 한다. 참고로 svg는 그 유명한 월드 와이드 웹 컨소시엄(W3C)에서 개발했다. 그래서 링크에서도 w3.org 도메인을 적는거다.
3. 그 후 `<svg>` 태그 안에다 그리고 싶은 요소들을 적어주면 된다. 사각형을 그리고 싶으면 `<rect>` 태그, 원을 그리고 싶으면 `<circle>`, 직선을 그리고 싶으면 `<line>`, 복잡한 곡선을 그리고 싶으면 `<path>` 등...
4. 요소를 다 넣었다면 마지막으로 포맷을 svg로 변경한다. 

그럼 아래 사진처럼 svg로 만들어진 그래픽을 볼 수 있다.

![alt text](/assets/img/posts/250409/3.png)

그래서 SVG는 그래픽을 수학으로 정의하다보니 포맷 자체의 용량이 작아지는거고, (픽셀로 이뤄진 래스터 이미지들은 그 크기만큼 격자 안에 수 많은 점을 표현하기에 용량이 커질 수 밖에 없다.)

이러면 리소스도 적어지기에 에셋들의 포맷을 SVG로 사용하면 로딩 속도가 빨라진다는거다.

따라서 svg는 특성상, 색이 단일적으로 쓰이는 `아이콘`이나 `깔끔한 일러스트`에서 주로 사용된다.

근데 내가 이 사이트에서 사용하는 에셋들은 몽글몽글(?)한 분위기의 일러스트기에 색감들의 경계가 불확실하다. 

그래서 래스터 이미지를 활용해야 하는데, 이럴땐 webp 포맷을 사용하면 브라우저 렌더링 속도를 빠르게 해준다고 한다. 왜일까?

### [WebP](https://developers.google.com/speed/webp?hl=ko)
WebP는 Google이 개발한 압축 기술로, VP8 비디오 코덱에 기반한 알고리즘을 사용해 JPEG보다 25-34% 더 작은 파일 크기를 달성한다고 한다.

<p align="center"><a href="https://developers.google.com/speed/webp/docs/webp_study?hl=ko"><img src= "/assets/img/posts/250409/4.png"></a></p>
<p align="center" style="color:#c3c4ca;">이미지를 누르면 표 원본 사이트로 이동된다.</p>

그 유명한 [Lenna](https://en.wikipedia.org/wiki/Lenna) 이미지로 SSIM과 파일 크기의 비율을 측정했을 때 SSIM은 유지하면서도 파일 크기는 줄어든걸 볼 수 있다.

> SSIM이란, 
>> Structural Similarity Index Measure의 약자로, 이미지 품질을 평가하는 측정 방법이다. 단순히 픽셀별 차이를 계산하는 것이 아닌 이미지의 구조적 정보를 비교한다. 이미지의 구조적 정보에는 휘도, 대비, 구조(패턴과 텍스처)가 포함되며 따라서 사람의 눈이 이미지를 인식하는 방식에 더 가깝게 설계된 측정 방법이다.

![alt text](https://i.namu.wiki/i/YwRsVptxVwZIvI42MDBajz9c9vSY48vpXk8UdYRnGo2mqugFkTRprJC7EudbgsnoYEE2RnlbqZBNyqPSMS3xqA.webp){:width='200'}

Wa. 그래서 대부분의 웹사이트에서 이미지를 저장하면 확장자가 webp로 된 이미지들이 많았던거였다.

그래서 나도 당장 에셋의 파일 포맷들을 다 webp로 변경하고 배포를 해봤다.

![alt text](/assets/img/posts/250409/5.png)

오, 조금 빨라졌다. 근데 LCP는 아직도 개선이 되질 않았었다.

LCP란 Largest Contentful Paint의 약자로 사용자가 페이지로 처음 이동한 시점을 기준으로 표시 영역에 표시되는 가장 큰 이미지를 말한다. [참고](https://web.dev/articles/lcp?hl=ko)

이를 개선하는 방법을 우리의 지피티에게 물어보니, 이미지 속성에 fetchpriority="high"를 추가하면 개선된다고 해서 시도해봤다.

>왜냐면 네트워크 자원이 많을 때도 우선 해당 이미지를 먼저 다운로드하게 하기 때문이다.

근데 이래도 점수는 똑같았고 성능에 전혀 반영되질 않았었다. 

왜냐면 나는 메인(스타팅) 화면에서 이미지를 하나밖에 안 불러왔기에, 얘를 우선순위로 둔다고해서 큰 차이가 생기진 않는 것 같았다.

그러다 곰곰히 생각을 해보니 현재 스타팅 화면에서 css로 fade in 애니메이션 효과를 줬었다.
효과를 준 이유는, 그냥 요소들이 fade in으로 나타나면 예쁘니까ㅋㅋ 좋을 것 같다고 생각했다.

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

근데 생각해보면 이건 어디까지나 갠취고, 사용자 입장에서는 보여지는 페이지가 빠르면 빠를 수록 좋다.

게임 화면이 fade로 오면 모를까. 스타팅 화면은 초기화면이기에 모든 요소가 fade로 뜨면 사용자는 자칫 페이지의 로딩이 안 된 줄 알고 사이트를 이탈할 수도 있다.

그래서 그냥 과감히 fade animation 부분을 삭제하고 다시 성능을 재봤다.

그랬더니 결과는? 100점 달성 WA~

<p align="center"><a href="https://pagespeed.web.dev/analysis/https-drag-make-11-front-vercel-app/oolqso1br7?form_factor=desktop&category=performance&category=accessibility&category=best-practices&category=seo&hl=ko&utm_source=lh-chrome-ext"><img src= "/assets/img/posts/250409/6.png"></a></p>
<p align="center" style="color:#c3c4ca;">이미지를 누르면 성능을 측정한 원본 페이지를 볼 수 있다.</p>

### 후기
평소 개발하기에만 급급했지 제대로 된 리팩토링은 이번 프로젝트에서 처음으로 진행해본 것 같다. 

근데 WebP가 빠르다는건 알겠는데, 왜 그런지는 WebP 변환에 사용되는 VP8의 알고리즘을 알아봐야 될 것 같다.

고로 다음엔 VP8 코덱에 대해 탐구를 해보는 걸로..

그럼 글 마치겠습니다.