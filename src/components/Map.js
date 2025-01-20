import L from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { COORDS, URL, ATTRIBUTION, ZOOM } from "../config";

function RenderMarker({ station, setStation, setActive }) {
  return (
    <Marker
      position={COORDS}
      icon={station.getIcon() || [0, 0]}
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

        {stations.map((station, i) => (
          <RenderMarker
            key={i}
            station={station}
            setStation={setStation}
            setActive={setActive}
          />
        ))}
        <div
          className="projects"
          style={{
            zIndex: 9000,
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "20 rem",
            height: "20 rem",
            fontSize: "5px",
          }}
        >
          <h6>Old Projects</h6>
          <ol>
            <li>Local Network Design (green fields)</li>
            <li>National Network Refresh</li>
            <li>Satellite Environment Monitoring</li>
            <li>Internet Edge Network Design</li>
            <li>Aerial Systems Spec Development</li>
            <li>Teams Management</li>
            <li>Remote Network Systems Monitoring</li>
          </ol>
        </div>
      </MapContainer>
    </>
  );
};
