import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

// Schema 를 먼저 구성함.
const loginSchema = yup.object({
  name: yup.string().required("이름은 필수입니다."),
  id: yup.string().required("아이디는 필수입니다."),
  email: yup
    .string()
    .email("유효한 이메일을 입력해주세요.")
    .required("이메일은 필수입니다."),
  pw: yup
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하이어야 합니다.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
    )
    .required("비밀번호는 필수입니다."),

  ufile: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("fileCount", "파일은 3개까지 첨부할 수 있습니다.", value => {
      return value && value.length <= 3;
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every(file =>
          ["image/jpeg", "image/png"].includes(file.type),
        )
      );
    })
    .test("filesize", "각 파일의 크기는 2MB 이하만 가능합니다", value => {
      return (
        value && Array.from(value).every(file => file.size <= 2 * 1024 * 1024)
      );
    }),
});

function App() {
  // js 자리

  // register : form 태그의 요소를 관리하겠다.
  // handleSubmit :  form 의 데이터를 백엔드로 전송하겠다.
  const {
    register,
    handleSubmit,
    trigger,
    setValue, // 강제로 데이터 넣기
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    // mode: "onSubmit", // 기본
    mode: "onChange", // 입력 중 체크
    // defaultValues: { name: "기본값", id: "기본값", pw: "", email: "" },
  });

  useEffect(() => {
    // 강제로 데이터값 지정
    setValue("email", "aaa@aaa.net");
  }, []);

  useEffect(() => {
    // trigger();
  }, [trigger]);

  // Submit 시 실행 될 함수
  const handleSumitUser = async data => {
    // data 는 객체 형태로 전달이 됩니다.
    // {...register("키명")}   ==> {  키명 : input 요소의 값 }
    console.log(data);
    try {
      // 1. 파일 첨부 없으면 axios.post("주소", data)

      // 2. 파일이 존재하는 경우
      const sendData = new FormData(); // 여러가지 포맷의 데이터를 전송
      // form객체에 appnend(키명, 키값);  // 전달할 요소를 추가한다.
      sendData.append("name", data.name);
      sendData.append("id", data.id);
      sendData.append("email", data.email);
      sendData.append("pw", data.pw);
      // 이미지 1장일 때 string 아니고, file
      sendData.append("previewfile", data.previewfile);
      // 이미지 여러장 일때 string 아니고, file
      sendData.append("previewlist", data.previewlist);
      // 아래는 글자외에 파일도 첨부되었을 때 headers 를 셋팅해주어야함.
      const res = await axios.post("주소", sendData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송 형식
        },
      });
      console.log(res.data); // 정상적으로 처리됨을 확인해 줌.
    } catch (error) {
      console.log(error);
    }
  };

  // 미리보기 이미지 주소 문자열
  const [previewList, setPreviewList] = useState([]);

  // 이미지 미리보기
  const handleChangePreview = e => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const list = files.map(item => URL.createObjectURL(item));
      setPreviewList(list);
    }
  };
  // jsx 자리
  return (
    <div>
      <h1>React Hook Form 예제</h1>
      <div>
        <form onSubmit={handleSubmit(handleSumitUser)}>
          <label>이름</label>
          <input type="text" {...register("name")} />
          {/* 오류메시지 */}
          <p>{errors.name?.message}</p>

          <label>아이디</label>
          <input type="text" {...register("id")} />
          <p>{errors.id?.message}</p>

          <label>이메일</label>
          <input {...register("email")} />
          <p>{errors.email?.message}</p>

          <label>비밀번호</label>
          <input type="password" {...register("pw")} />
          <p>{errors.pw?.message}</p>

          <div>
            <label>파일첨부</label>
            <div>
              {/* 미리보기 자리 */}
              {previewList.map((item, index) => (
                <img src={item} key={index} style={{ width: 300 }} />
              ))}
            </div>
            <input
              type="file"
              multiple={true}
              accept="image/png, image/jpeg"
              {...register("ufile")}
              onChange={e => handleChangePreview(e)}
            />
            <p style={{ color: "red" }}>{errors.ufile?.message}</p>
          </div>

          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
}

export default App;
