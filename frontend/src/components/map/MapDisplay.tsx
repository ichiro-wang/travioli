import {
  APIProvider,
  Map,
  type MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

const MapDisplay = () => {
  const [displayCoords, setDisplayCoords] = useState({
    lat: -33.860664,
    lng: 151.208138,
  });

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_MAPS_API}
      onLoad={() => console.log("Maps API has loaded")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={displayCoords}
        mapId={import.meta.env.VITE_MAP_ID}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "Camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      ></Map>
    </APIProvider>
  );
};

export default MapDisplay;
