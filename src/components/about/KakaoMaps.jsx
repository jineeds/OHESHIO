import React, { useEffect } from "react";

const KakaoMaps = () => {
  useEffect(() => {
    const loadKakaoMapScript = async () => {
      try {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a54578c6ac6c0ff4f3616e0eb0ec3cdc&autoload=false`;
          script.onload = resolve;
          document.head.appendChild(script);
        });

        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(37.54565747714666, 126.91621010338516),
            level: 1,
          };

          const mapInstance = new window.kakao.maps.Map(container, options);

          // 마커 생성
          const markerInstance = new window.kakao.maps.Marker({
            map: mapInstance, // 지도에 마커 추가
            position: new window.kakao.maps.LatLng(37.54565747714666, 126.91621010338516), // 마커 위치
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadKakaoMapScript();
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">DIRECTION</h3>
      <div id="map" style={{ width: "200px", height: "200px" }} />{" "}
    </div>
  );
};

export default KakaoMaps;
