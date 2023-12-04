import React, { useEffect, useState } from "react";

const { kakao } = window;

const Kakao = ({ onLocationChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.450416956915774, 127.12994454291355),
      level: 3,
    };
    const initialMap = new kakao.maps.Map(container, options);

    // 초기에 지도와 마커 설정
    setMap(initialMap);
    setMarker(
      new kakao.maps.Marker({
        position: options.center,
        clickable: true,
        map: initialMap, // 마커가 지도에 표시되도록 추가
      })
    );
  }, []);

  useEffect(() => {
    if (!map || !marker) return;

    // 클릭 이벤트 등록
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;

      // 마커 위치 업데이트
      marker.setPosition(latlng);

      // 외부에서 전달된 콜백 함수 호출
      if (onLocationChange) {
        onLocationChange(latlng.getLat(), latlng.getLng());
      }
    });
  }, [map, marker, onLocationChange]);

  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "400px",
      }}
    ></div>
  );
};

export default Kakao;
