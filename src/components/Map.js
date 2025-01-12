import L from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import img1 from "../img/run.gif";
import img2 from "../img/run.gif";

import { COORDS, URL, ATTRIBUTION, ZOOM } from "../config";

function RenderMarker({ station, setStation, setActive }) {
  const getIcon = () => {
    return L.icon({
      iconUrl: img1,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });
  };
  return (
    <Marker
      position={station.coords}
      icon={getIcon()}
      eventHandlers={{
        mouseover: (evt) => evt.target.openPopup(),
        mouseout: (evt) => evt.target.closePopup(),
        click: (evt) => {
          setStation(station);
          setActive(true);
        },
      }}
    >
      <Popup closeButton={false} className={`running-popup`} offset={[0, -80]}>
        {station.popup_content()}
      </Popup>
    </Marker>
  );
}
export const Map = ({ setActive, center, stations, setStation }) => {
  function MoveTo({ mCoords }) {
    const map = useMap();
    useEffect(
      function () {
        if (!mCoords) return null;
        const coords = L.latLng(mCoords);
        if (!coords) return;
        map.panTo(coords, { animate: true, duration: 2 });
      },
      [mCoords]
    );
    return null;
  }

  return (
    <>
      <MapContainer zoom={ZOOM} center={COORDS} id="map">
        <TileLayer url={URL} attribution={ATTRIBUTION} />
        <MoveTo mCoords={center} />
        {stations.map((station, i) => (
          <RenderMarker
            key={i}
            station={station}
            setStation={setStation}
            setActive={setActive}
          />
        ))}
      </MapContainer>
    </>
  );
};
