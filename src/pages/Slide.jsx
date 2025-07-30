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
