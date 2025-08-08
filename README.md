# Kakao Map

- 개발자 : https://developers.kakao.com
- 참조 : https://velog.io/@tpgus758/React에서-Kakao-map-API-사용하기

## 1. API 신청하기

- 환경설정 내용

```
REACT_APP_KKO_MAP_REST_API_KEY=키값
REACT_APP_KKO_MAP_JS_API_KEY=키값
```

- 웹 플랫폼 설정

```
 http://localhost:3000
 http://localhost:5173
```

## 2. 카카오 지도 가이드

- https://apis.map.kakao.com/web/guide/
- 가능하면 위의 사항을 참조해서 진행하기를 권장함.

## 3. JS 로 출력하기 (기본)

- App.jsx

```jsx
import { useEffect } from "react";
import MapDiv from "./components/MapDiv";

function App() {
  // js 자리

  // 화면이 보이면 한번 만 실행
  useEffect(() => {
    // 카카오 맵 스크립트 태그(엘리먼트)를 생성하라.
    const kakaoMapscript = document.createElement("script");
    // 스크립트를 동적, 즉 비동기로 불러들여라.
    kakaoMapscript.async = true;
    // 카카오 SDK URL 을 설정하라.
    kakaoMapscript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KKO_MAP_JS_API_KEY}&autoload=false&libraries=services,clusterer`;

    // html 문서의 head태그 에 추가하라.
    document.head.appendChild(kakaoMapscript);

    // 스크립트가 로드가 완료되면 실행될 이벤트 리스너를 추가한다.
    kakaoMapscript.onload = () => {
      // console.log(window.kakao);
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    };
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>지도출력</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}

export default App;
```

## 4. react-kakao-maps-sdk 활용하기

- 레퍼런스 : https://react-kakao-maps-sdk.jaeseokim.dev
- 참조블로그: https://velog.io/@wlwl99/React-Kakao-Map-SDK-사용하기
- 설치 : `npm install react-kakao-maps-sdk`

### 4.1. 지도를 출력하기 위한 설정

- App.jsx 에 추가

```jsx
import { useEffect, useState } from "react";
import MapDiv from "./components/MapDiv";

function App() {
  // js 자리
  // 지도의 로딩 상태를 관리하는 state
  const [isMaploaded, setIsMaploaded] = useState(false);

  // 화면이 보이면 한번 만 실행
  useEffect(() => {
    // 카카오 맵 스크립트 태그(엘리먼트)를 생성하라.
    const kakaoMapscript = document.createElement("script");
    // 스크립트를 동적, 즉 비동기로 불러들여라.
    kakaoMapscript.async = true;
    // 카카오 SDK URL 을 설정하라.
    kakaoMapscript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KKO_MAP_JS_API_KEY}&autoload=false&libraries=services,clusterer`;

    // html 문서의 head태그 에 추가하라.
    document.head.appendChild(kakaoMapscript);

    // 스크립트가 로드가 완료되면 실행될 이벤트 리스너를 추가한다.
    kakaoMapscript.addEventListener("load", () => {
      // 카카오맵을 로딩하고 로딩상태가 변하면 리랜더링한다.
      window.kakao.maps.load(() => {
        // 카카오 지도 로딩 완료로 리랜더링 진행
        setIsMaploaded(true);
      });
    });
  }, []);

  // 지도가 로드가 되지 않으면 로딩메시지를 출력한다.
  if (!isMaploaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }

  // jsx 자리
  return (
    <div>
      <h1>지도출력</h1>
      <MapDiv />
    </div>
  );
}

export default App;
```

### 4.2. 지도 출력하기

- /src/components/Map.jsx

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

## 5. 다양한 예제

### 5.1. 기본 지도

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ width: "800px", height: "600px" }} // 지도 크기
          level={3} // 지도 확대 레벨
        ></Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.2. 마커 표시하기

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          {/* 마커 좌표 */}
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.3. 마커 여러개 표시하기

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const locations = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          {locations.map((loc, idx) => (
            <MapMarker
              key={`${loc.title}-${loc.latlng}`}
              position={loc.latlng}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: { width: 24, height: 35 },
              }}
              title={loc.title}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.4. 맵 위에 커스텀 오버레이 표시하기

```jsx
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <div className="overlay" style={{ background: "red", padding: 50 }}>
              Here!
            </div>
          </CustomOverlayMap>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.5. 지도 확대/축소 버튼 출력

```jsx
import { useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const [level, setLevel] = useState(3);
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={level}
        >
          <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <div className="overlay" style={{ background: "red", padding: 5 }}>
              Here!
            </div>
          </CustomOverlayMap>
          <button onClick={() => setLevel(level + 1)}>지도 축소 버튼</button>
          <button onClick={() => setLevel(level - 1)}>지도 확대 버튼</button>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.6. Geolocation API

- 사용자의 위치 정보를 웹 애플리케이션에 제공할 수 있는 API
- 개인정보 보호를 위해서 브라우저는 사용자에게 위치 정보에 대한 권한을 받은 후 위치 정보를 사용할 수 있다.
- Geolocation.getCurrentPosition() : 기기의 현재 위치를 가져오는 메소드
- Geolocation.watchPosition() : 기기의 위치가 바뀔 때마다, 새로운 위치를 사용하여 함수를 호출한다.

### 5.7. 현재 위치 마커 표시하기

- 조금 더 체크 해보자. 위치가 엉성하다.

```jsx
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  // 현재 위치의 좌표값을 저장할 상태 :  {위도: 값, 경도: 값}
  const [coordinates, setCoordinates] = useState(null);
  // map 태그를 보관함
  const mapRef = useRef();

  // 지도정보를 잘 불러온 경우 실행할 함수
  const successHandler = response => {
    // 각종 정보가 들어옴
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    // 위도와 경도를 추출
    const { latitude, longitude } = response.coords;
    setCoordinates({
      lat: latitude,
      lng: longitude,
    });
  };

  // 위치 정보를 못받은 경우 함수
  const errorHandler = error => {
    console.log(error);
  };

  useEffect(() => {
    // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true, // 가능한 가장 정확한 위치 정보 사용
      timeout: 5000, // 최대 대기 시간(ms)
      maximumAge: 0, // 캐시된 위치 사용 안 함
    });
  }, []);

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        {coordinates && (
          <>
            <Map
              center={{
                lat: coordinates.lat,
                lng: coordinates.lng,
              }}
              style={{ width: "800px", height: "600px" }}
              level={3}
              ref={mapRef}
            >
              <MapMarker
                position={{
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                }}
              />
            </Map>
          </>
        )}
      </div>

      <div>
        현재 위치의 좌표는..
        <p>위도 : {coordinates?.lat}</p>
        <p>경도 : {coordinates?.lng}</p>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.8. 좌표값으로 주소 얻기

```jsx
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  // 아래의 구문으로 window.kakao 를 접근할 수 있습니다.
  const { kakao } = window;

  const [address, setAddress] = useState(null); // 현재 좌표의 주소를 저장할 상태

  const getAddress = ({ lat, lng }) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    console.log(geocoder);

    const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 37.5566803113882, lng: 126.904501286522 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: 37.5566803113882, lng: 126.904501286522 }}
          />
          <button
            onClick={() =>
              getAddress({ lat: 37.5566803113882, lng: 126.904501286522 })
            }
          >
            현재 좌표의 주소 얻기
          </button>
        </Map>

        {address && (
          <div>
            현재 좌표의 주소는..
            <p>address_name: {address.address_name}</p>
            <p>region_1depth_name: {address.region_1depth_name}</p>
            <p>region_2depth_name: {address.region_2depth_name}</p>
            <p>region_3depth_name: {address.region_3depth_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.9. 지도 모양 바꾸기

```jsx
import { useState } from "react";
import { Map, MapTypeId } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const [mapTypeId, setMapTypeId] = useState("");
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          id="map"
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
          level={5}
        >
          {mapTypeId && <MapTypeId type={mapTypeId} />}
        </Map>
        <p>
          <button onClick={() => setMapTypeId("TRAFFIC")}>교통정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("ROADVIEW")}>
            로드뷰 도로정보 보기
          </button>{" "}
          <button onClick={() => setMapTypeId("TERRAIN")}>지형정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("USE_DISTRICT")}>
            지적편집도 보기
          </button>
        </p>
      </div>
    </div>
  );
};

export default MapDiv;
```
