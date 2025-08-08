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
