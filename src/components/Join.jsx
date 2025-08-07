import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DaumPostcodeEmbed, { useDaumPostcodePopup } from "react-daum-postcode";

// 회원가입 데이터의 초기값
const initData = {
  userid: "aaa",
  useremail: "",
  userpass: "",
  userphone: "",
  address1: "",
  address2: "",
  zipcode: "",
};
// 회원가입 유효성 검사 스키마 설정
const JoinSchema = yup.object({
  userid: yup
    .string()
    .required("아이디는 필수입니다.")
    .min(4, "최소 4자입니다.")
    .max(8, "최대 8자입니다."),
  useremail: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("유효한 이메일 주소가 아닙니다."),
  userpass: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(4, "최소 4자입니다.")
    .max(8, "최대 8자입니다."),
  userphone: yup
    .string()
    .required("전화번호는 필수입니다.")
    .matches(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/, "유효한 전화번호를 입력하세요."),
  address1: yup.string().required("우편번호는 필수입니다."),
  address2: yup.string().required("상세주소는 필수입니다."),
});

const Join = () => {
  // js 자리
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initData,
    mode: "onChange",
    resolver: yupResolver(JoinSchema),
  });

  // 전화번호 글자변경 함수
  const handleChangePhone = e => {
    // 실제글자 : e.target.value
    const phoneNumber = formatPhoneNumber(e.target.value);
    console.log(phoneNumber);
    setValue("userphone", phoneNumber);
  };

  const formatPhoneNumber = value => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  // 우편번호검색 버튼을 클릭시 주소 검색창 출력
  // Daum Post 팝업
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);
  const handleClickZipCode = () => {
    // 웹브라우저에서 새창열어라
    open({ onComplete: handleCompletedZip });
  };
  // 사용자가 우편번호를 선택완료할 때 실행될 함수
  const handleCompletedZip = data => {
    // console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log("fullAddress : ", fullAddress);
    // console.log("zip : ", data.zonecode);
    setValue("address1", fullAddress);
    setValue("zipcode", data.zonecode);
  };

  // 전송할 데이터
  const onSubmitJoin = data => {
    console.log(data);
  };
  // jsx 자리
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitJoin)}>
        <div>
          <label>아이디</label>
          <input type="text" {...register("userid")} />
          {errors.userid?.message && (
            <span style={{ color: "red" }}> {errors.userid?.message} </span>
          )}
        </div>
        <div>
          <label>이메일</label>
          <input type="email" {...register("useremail")} />
          {errors.useremail?.message && (
            <span style={{ color: "red" }}> {errors.useremail?.message} </span>
          )}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" {...register("userpass")} />
          {errors.userpass?.message && (
            <span style={{ color: "red" }}> {errors.userpass?.message} </span>
          )}
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="text"
            {...register("userphone")}
            onChange={e => handleChangePhone(e)}
          />
          {errors.userphone?.message && (
            <span style={{ color: "red" }}> {errors.userphone?.message} </span>
          )}
        </div>
        <div>
          <label>우편번호</label>
          <input type="text" readOnly={true} {...register("zipcode")} />
        </div>
        <div>
          <label>주소</label>
          <input type="text" {...register("address1")} />
          {errors.address1?.message && (
            <span style={{ color: "red" }}> {errors.address1?.message} </span>
          )}
        </div>
        <div>
          <label>주소검색</label>
          {/* daumpost 사용예정 */}
          {/* <DaumPostcodeEmbed onComplete={handleCompletedZip} /> */}
          <button onClick={handleClickZipCode}>우편번호검색</button>
        </div>
        <div>
          <label>상세주소</label>
          <input type="text" {...register("address2")} />
          {errors.address2?.message && (
            <span style={{ color: "red" }}> {errors.address2?.message} </span>
          )}
        </div>
        <div>
          <button type="submit">회원가입</button>
          <button type="reset">재작성</button>
        </div>
      </form>
    </div>
  );
};

export default Join;
