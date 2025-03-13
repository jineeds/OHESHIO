import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    if (!container || !window.kakao || !window.kakao.maps) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.549635, 126.9177),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.549635, 126.9177),
    });
    marker.setMap(map);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px', border: '2px solid #ddd' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default Map;
