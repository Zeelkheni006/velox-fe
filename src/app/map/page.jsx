// components/ManhattanMap.js
"use client";

import { useEffect, useRef } from "react";

const ManhattanMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) return;

      const manhattan = { lat: 40.7831, lng: -73.9712 };
      const map = new google.maps.Map(mapRef.current, {
        zoom: 13,
        center: manhattan,
        mapTypeId: google.maps.MapTypeId.ROADMAP, // ⭐ Normal Map (Not Satellite)
      });

      // Drawing Manager
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ["polygon"],
        },
        polygonOptions: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeWeight: 2,
          strokeColor: "#FF0000",
          editable: true,
          draggable: false,
        },
      });

      drawingManager.setMap(map);
    };

    // Inject Google Maps script WITH drawing library
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=drawing";
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  return (
    <div>
      <h3>Manhattan Map</h3>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default ManhattanMap;
