import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGoogleToken, getGoogleUserInfo } from "../../google/googleapi";

function AfterGoogle() {
  // 사용자 정보저장
  const [userInfo, setUserInfo] = useState(null);

  // 구글의 사용자의 정보를 접근하는 토큰 즉, accessToken 을 관리
  const [accessToken, setAccessToken] = useState(null);

  // 쿼리 스트링을 분해해서 사용해야 합니다.
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // queryString 에서 code 에 담긴 내용을 알아낸다.
  const authCode = URLSearchParams.get("code");
  console.log(authCode);

  // 인증을 요청하면 구글에서 인가를 해줌
  // 비동기 이므로 async .... await 사용
  const getAccessTokenCall = async () => {
    try {
      // Acess Token 얻어오기
      const accessKey = await getGoogleToken(authCode);
      console.log("accessKey : ", accessKey);
      if (accessKey) {
        // 사용자 액세스 토큰 저장함.
        setAccessToken(accessKey.access_token);
        // 사용자 액세스 토큰으로 사용자 정보 요청하기
        const userData = await getGoogleUserInfo(accessKey.access_token);
        console.log("구글의 사용자 정보 : ", userData);
        // 사용자 정보 보관
        setUserInfo(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  // jsx 자리
  return (
    <div>
      <h1>구글 사용자 정보</h1>
      <p>인가코드 : {authCode} </p>
      <p>액세스토큰: {accessToken ? "성공적으로 가져옴" : "없음"}</p>
      <div>
        {userInfo ? (
          <div>
            <p>아이디: {userInfo.id}</p>
            <p>이름: {userInfo.name}</p>
            <p>이메일: {userInfo.email}</p>
            <p>
              프로필 사진:
              <img src={userInfo.picture} alt="프로필" width={50} />
            </p>
          </div>
        ) : (
          <p>사용자 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}

export default AfterGoogle;
