import { animate, createDraggable } from "animejs";
import { useEffect, useRef } from "react";

function AniPage() {
  // js 자리
  const BoxWrap = {
    position: "relative",
    width: "80%",
    height: "50vh",
    backgroundColor: "yellowgreen",
  };
  const BoxStyle = {
    position: "absolute",
    left: 100,
    top: 250,
    width: 50,
    height: 50,
    backgroundColor: "#ff0000",
  };
  // html 버전이면 querySelector(".클래스명")
  // React 에서는 useRef(null) 를 활용함
  const boxRef = useRef(null);
  // 모션
  const motionA = () => {
    animate(boxRef.current, {
      left: "240px",
      backgroundColor: ["#ff0000", "#ffff00"],
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
      duration: 5000,
    });
  };
  const motionB = () => {
    animate(boxRef.current, {
      scale: 1.5,
      left: 0,
      backgroundColor: ["#ff0000"],
      borderRadius: ["50%", "0%"],
      duration: 2000,
    });
  };
  const motionC = () => {
    animate(boxRef.current, {
      scale: 1,
      left: 100,
      top: 250,
      borderRadius: ["50%", "0%"],
      duration: 2000,
    });
  };

  useEffect(() => {
    if (boxRef.current) {
      createDraggable(boxRef.current);
    }
  }, [boxRef]);

  // jsx 자리
  return (
    <div>
      <div>
        <button onClick={motionA}>효과 1</button>
        <button onClick={motionB}>효과 2</button>
        <button onClick={motionC}>효과 3</button>
      </div>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}>
          모션의 대상
        </div>
      </div>
    </div>
  );
}
export default AniPage;
