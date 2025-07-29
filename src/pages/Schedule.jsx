import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    startday: "2025-06-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    startday: "2025-05-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    startday: "2025-06-05",
    endday: "2025-06-07",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    startday: "2025-07-09",
    endday: "2025-07-15",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일 ~ 6:토요일
    //console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };

  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날자를 비교해서 결과를 찾아낸다.
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h2>{dayResult.title}</h2>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);

  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };
  const [clickInfo, setClickInfo] = useState(null);

  // 6. 캘린더 클릭된 날짜값 설정
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));

  // 7. 일정이 있는 날짜만 css 적용하기
  const tileClassNameShow = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };
  // 8. 캘린더 기본 일정(Range) 출력하기 설정
  // 날짜의 범위 초기값
  const initRange = {
    start: "2025-07-07",
    end: "2025-07-20",
  };
  // 화면에 출력할 날짜 sate 관리
  // react-calendar 에서는 JS의 Date 객체를 사용합니다.
  // 단지 우리가 moment 로 글자를 변환해서 보여줄 뿐
  const [selectedRange, setSelectedRange] = useState([
    new Date(initRange.start),
    new Date(initRange.end),
  ]);
  // Range 를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    if (checkDay >= initRange.start && checkDay <= initRange.end) {
      // CSS 적용하기
      return "sun";
    }
  };

  // 9. 캘린더 외부 API 의 결과가 일정인 경우 출력
  // Range 를 사용하는 경우의 내용출력하기
  const tileContentRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 만약  checkDay : 2024-06-01
    // 1. 배열의 각 요소를 찾는다.
    // 2. 찾은 요소의 값을 이용한다.
    const dayResults = allData.filter(item => {
      return checkDay >= item.startday && checkDay <= item.endday;
    });
    // console.log("필터링 된 내용 : ", dayResults);
    if (dayResults.length > 0) {
      return (
        <div>
          {dayResults.map(dayResult => (
            <div key={dayResult.pk}>
              <h2>{dayResult.title}</h2>
              <div>
                <img
                  src={dayResult.img}
                  alt={dayResult.title}
                  style={{ width: "10px", height: "10px" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  // Range 를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange2 = ({ date }) => {
    // console.log(date);
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 범위 안에 있는가의 변수를 찾자, 결과로 true 와 false 리턴한다.
    // 배열을 대상으로 매개변수로 요소를 전달하고
    // 요소를 전달받아서 함수를 실행하도록 하는
    // 고차함수의 일종입니다.
    const isRange = allData.some(
      item => checkDay >= item.startday && checkDay <= item.endday,
    );
    if (isRange) {
      return "sun";
    }
  };
  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContentRange}
          formatDay={formatDay}
          onClickDay={onClickDay}
          selectRange={true}
          //   value={selectedRange}
          tileClassName={tileClassNameRange2}
        />
      </div>
    </div>
  );
}

export default Schedule;
