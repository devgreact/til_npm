# 카카오 로그인

- CRA 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기/로그인하기

- https://developers.kakao.com
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱` 선택 후 이동
  <img width="1182" height="519" alt="Image" src="https://github.com/user-attachments/assets/fbfb8cd8-1a6d-4059-a399-b303f89844d0" />
- 내용 작성하기
  <img width="1181" height="656" alt="Image" src="https://github.com/user-attachments/assets/b9d11121-8af3-450a-ad81-4a6d1df55a5e" />
  <img width="1178" height="657" alt="Image" src="https://github.com/user-attachments/assets/74ef3374-2b16-4cef-8a5d-f5c51f5a89e3" />
- 목록 확인하기  
  <img width="1173" height="507" alt="Image" src="https://github.com/user-attachments/assets/78804d6a-1afd-4203-aad3-decf5847c0d0" />
- 비즈앱 등록하기
  <img width="1138" height="684" alt="Image" src="https://github.com/user-attachments/assets/bd191d38-3da0-4947-9891-67fd0e113513" />
  <img width="1338" height="612" alt="Image" src="https://github.com/user-attachments/assets/e4dff7e3-8ab4-40b0-b204-a89b2bce175a" />
  <img width="1336" height="718" alt="Image" src="https://github.com/user-attachments/assets/e6deccbd-4761-4c7a-97f8-c2789e8d76fc" />

## 3. Rest API 및 JS 키 관리

- `외부노출 금지`
- / 폴더에 `.env `파일 생성
- `생성되는 파일 위치 절대 주의`
  <img width="409" height="427" alt="Image" src="https://github.com/user-attachments/assets/e36bf54d-3f8b-4c9a-a3ad-0105df45d6ed" />

### 3.1. 접두어는 `REACT_APP_` 으로 `약속`됨

- 예) Next.js 프로젝트에서는 `NEXT_APP_` 으로 약속됨
- 예> Vite 프로젝트에서는 `VITE_` 로 약속됨

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=본인키
REACT_APP_KKO_LOGIN_JS_API_KEY=본인키
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성확인
  <img width="1157" height="709" alt="Image" src="https://github.com/user-attachments/assets/077380ab-7043-4c0f-b25e-b36a7ff395fd" />

## 4. 카카오 로그인 플랫폼 설정하기

<img width="1169" height="677" alt="Image" src="https://github.com/user-attachments/assets/7400dca9-4657-4c7f-9da0-eb35988b62c6" />

### 4.1. 리다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인
  <img width="829" height="581" alt="Image" src="https://github.com/user-attachments/assets/b3cb9dfc-2b8f-4da3-bd25-fffa32c8a4d0" />
  <img width="1036" height="356" alt="Image" src="https://github.com/user-attachments/assets/bece3ecb-8881-436d-b285-17e70c1606d6" />

## 5. 동의항목 설정

<img width="1569" height="380" alt="Image" src="https://github.com/user-attachments/assets/3aec58cf-fdcd-4153-8889-808d61ebe813" />
<img width="713" height="747" alt="Image" src="https://github.com/user-attachments/assets/1e39f61e-974d-4a07-b10f-0ffa8c49c54d" />
<img width="1593" height="409" alt="Image" src="https://github.com/user-attachments/assets/04536186-eb9d-4a7d-91cc-8e4670071cad" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 생성

### 6.1. 1단계

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios 로 변경 권장`)

```js
// git 에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

## 6.4. 코드 반영

- /src/pages/LoginPage.jsx 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";

function LoginPage() {
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  console.log(kkoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kkoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일생성

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

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
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

### 6.4.1. Router 셋팅

- /src/App.js

```js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/atoms/kkoLoginAtom.js

```js
import { atom } from "recoil";

export const KKOLoginAtom = atom({
  key: "KKOLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../atoms/kkoLoginAtom";

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
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={logOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/login")
- 조건문으로 안내메시지 및 버튼으로 이동권장
