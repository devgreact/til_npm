# ESLint npm 변경하기

```bash
npm uninstall eslint @eslint/js
npm install --save-dev eslint@8.56.0
```

# swiper

- https://swiperjs.com/react
- https://swiperjs.com/demos

## 설치

```bash
npm i swiper
```

## 폴더 구성

- /src/pages/Slide.jsx 파일 생성

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";
function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

- /src/pages/slide.css 파일 생성

```css
.visual-slide {
  width: 80%;
  margin: 0 auto;
  background-color: skyblue;
}
.sw-visual {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
.sw-visual .swiper-slide {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellowgreen;
}
```

## 1. loop 와 navigation 적용예제

- 1 단계 : css 와 모듈을 확인함.

```jsx
// css 와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
```

- 2 단계 : modules 적용

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";

// css 와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

## 2. navigation 커스터마이징

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";

// css 와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        {/* 커스터마이징 네비게이션 */}
        <div className="prev">이전</div>
        <div className="next">다음</div>
        <Swiper
          loop={true}
          // navigation={true}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

```css
.visual-slide {
  position: relative;
  width: 80%;
  margin: 0 auto;
  background-color: skyblue;
}
.sw-visual {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
.sw-visual .swiper-slide {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: yellowgreen;
}
.prev,
.next {
  position: absolute;
  top: 50%;
  z-index: 99;
  width: 40px;
  height: 40px;
  background-color: #fff;
  cursor: pointer;
}
.prev {
  left: 20px;
}
.next {
  right: 20px;
}
```

## 3. api 연동과 Swiper 슬라이드

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 작업
import "swiper/css";
// 개별 작업
import "./slide.css";

// css 와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

// 외부 데이터
const slideData = [
  {
    title: "뉴진스 좋아요.",
    pic: "https://i.namu.wiki/i/WGsJjdq_YZ55OqLwDcVy03tPUDeuy2bFGjbv7hGdqeTxhugt9oQVd9skQTplZArzk64Id35mmLbkbcMwWEo2-g.webp",
  },
  {
    title: "뉴진스 화이팅",
    pic: "https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg",
  },
  {
    title: "뉴진스 사랑해요",
    pic: "https://img.sbs.co.kr/newsnet/etv/upload/2023/08/28/30000871570_1280.jpg",
  },
];

function Slide() {
  // js 자리
  const [data, setData] = useState([]);

  // 화면에 컴포넌트 보여질때 딱 한번 실행
  useEffect(() => {
    setData(slideData);
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        {/* 커스터마이징 네비게이션 */}
        <div className="prev">이전</div>
        <div className="next">다음</div>
        <Swiper
          loop={true}
          // navigation={true}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          modules={[Navigation]}
          className="sw-visual"
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.pic} alt={item.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```
