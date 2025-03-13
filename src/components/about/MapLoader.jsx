// components/MapLoader.jsx
import React, { useEffect, useState } from 'react';
import Map from './Map';

const MapLoader = () => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=666bcfcdd7d0a8b8b464b3573fb20e9d&autoload=false';
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsSdkLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  return isSdkLoaded ? <Map /> : <p style={{ textAlign: 'center' }}>Loading Kakao Map SDK...</p>;
};

export default MapLoader;
