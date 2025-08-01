# 구글 로그인

## 1. GCP(구글 클라우드 플랫폼) 서비스 신청

- https://console.cloud.google.com
- https://iwoohaha.tistory.com/318

## 2. `.env` 내용 작성

- 접두어 주의 `REACT_APP_`

```txt
REACT_APP_GOOGLE_CLIENT_KEY=키
REACT_APP_GOOGLE_SECRET_KEY=키
```

## 3. 폴더 및 파일 구조

- /src/google 폴더 생성
- /src/google/googleapi.js

```js
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
const GOOGLE_REDIRECT_URI = "http://localhost:3000/member/google";
// 구글 로그인시 활용
export const getGoogleLoginLink = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
};

export const getGoogleToken = async code => {
  const REST_API_KEY = GOOGLE_CLIENT_ID;
  const REDIRECT_URI = GOOGLE_REDIRECT_URI;
  const SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;
  const response = await fetch(
    `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
  );
  return response.json();
};

export const getGoogleUserInfo = async accessToken => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Google user info");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching Google user info:", error);
    return null;
  }
};
```

## 3. 로그인 후 이동페이지 만들기

- /src/pages/member/AfterGoogle.jsx 생성

```jsx
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
```

## 5. 라우터 구성

- App.jsx

```jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";
import AfterGoogle from "./pages/member/AfterGoogle";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kko" element={<After />}></Route>
        <Route path="/member/google" element={<AfterGoogle />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 6. 구글로그인 버튼 배치

- /src/pages/LoginPage.jsx

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../atoms/kkoLoginAtom";
import { getGoogleLoginLink } from "../google/googleapi";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  //   console.log(kkoLoginUrl);
  const logOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      email: "",
      thumbnail_image_url: "",
    });
    navigate("/");
  };
  // 구글 로그인
  const googleLogin = () => {
    getGoogleLoginLink();
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={logOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오 로그인</Link>
      )}
      <div>
        <button onClick={googleLogin}>구글로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
```
