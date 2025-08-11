import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// js 관련 글자들을 특수한 글자로 변경한다.
import DOMPurify from "dompurify";

const AddForm = () => {
  // js 자리
  const [data, setData] = useState("");

  // 이미지 처리 1. HTML 태그 중에 Quill 을 참조하도록 보관함.
  const quillRef = useRef(null);

  // 이미지 처리 3. 사용자가 이미지 선택시 개발자가 직접 처리

  // 이미지 처리(프론트에서 처리)
  const imageHandler = () => {
    //console.log("이미지 처리하기");
    // 1. 현재 찾아서 에디터를 참조한다.
    // useRef 로 보관한 내용물 참조(current)
    const editor = quillRef.current.getEditor();
    // 2. js 로 <input type="file" /> 을 생성한다.
    const input = document.createElement("input");
    // 3. js 로 속성을 셋팅한다.
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // 4. js 로 마치 <input type="file" /> 을 클릭한 것처럼 실행한다.
    input.click(); // 각에 클릭
    // 5. js 로 "change" 이벤트를 생성해 준다.
    input.addEventListener("change", function () {
      //  안전한 코딩
      try {
        // 선택된 파일
        const file = input.files[0];
        // 임시 웹브라우저의 cache 이미지 URL 생성

        // 백엔드로 post 샘플 코드
        // const formData = new FormData();
        // formData.append("이름", file);
        // const res = axios.post("주소", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // let tempUrl = res.data;

        // 정석적으로 백엔드에 axios.post 로 이미지 전송후
        // 리턴 결과로 이미지의 URL 을 받아옵니다.
        // 받는 결과를 출력합니다.(샘플)
        let tempUrl = URL.createObjectURL(file);
        tempUrl =
          "https://i.namu.wiki/i/hHgClALonR25RtWcJfgpL9UM8BbDxN7A0oAHn4jljS_9529UDxCD551fz2kF631PfsS-sTd-rDZVIAGAnCNXmyz6thjeAqqkaQSUsU1ZCEnVifTUhK1uVNM0Suj72V6cg4bOMfrEQ9W2AfOFzeFoJQ.webp";

        // 에디터에 배치하기
        const range = editor.getSelection();
        // tempUrl 은 정확히 나온다.
        // 그런데 출력에는 <img src="//:0"> 가 나온다.
        editor.insertEmbed(range.index, "image", tempUrl);
        // 강제로 마우스 커서 위치 이동하기
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
    // 6. 이벤트로 가상의 image url 을 생성한다. URL.crateObjectURL
    // 7. 참조해둔 에디터에 img 태그를 밀어넣고 주소는 위의 주소로 넣는다.
    // 8. 마우스 커서 위치를 조절한다.
  };
  // module 설정
  // 모듈 활용
  // useMemo : `변수를 만들고 다시 생성되지 않도록 메모`한다.
  // useMemo : 리랜더링시 다시 변수를 만들지 않는다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  // format 설정
  // format 설정 (툴바에 맞춰서 허용 목록을 충분히 열어줌)
  const formats = [
    "header", // [{ header: [...] }]
    "font", // [{ font: [] }]
    "align", // [{ align: [] }]

    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",

    "list",
    "bullet", // [{ list: "ordered" }, { list: "bullet" }]
    "link",

    "color",
    "background", // [{ color: [...] }, { background: [] }]

    "image",
    "video", // ["image", "video"]
    // "clean"은 서식 지우기 버튼이라 formats에 넣을 필요 없음
  ];

  // jsx 자리
  return (
    <div>
      <form style={{ width: "80%", height: 500 }}>
        <ReactQuill
          ref={quillRef} // 이미지 처리 2. 참조연결
          modules={modules}
          formats={formats}
          onChange={e => setData(e)}
        />
        <button>확인</button>
      </form>
      <div>
        <p>{data}</p>
      </div>
      <div>
        입력중인 내용 :
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}></p>
      </div>
    </div>
  );
};

export default AddForm;
