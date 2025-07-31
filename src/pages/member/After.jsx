import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../../atoms/kkoLoginAtom";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo({
      id: info.id,
      nickname: info.kakao_account.profile.nickname,
      thumbnail_image_url: info.kakao_account.profile.thumbnail_image_url,
      email: info.kakao_account.email,
    });
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.id) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo.nickname}</div>
      <div>이메일 : {userInfo.email}</div>
      <div>
        <img src={userInfo.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
