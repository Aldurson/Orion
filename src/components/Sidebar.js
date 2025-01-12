import React from "react";

export const Sidebar = ({ setCenter, stations, setStation }) => {
  function MenuItem({ station, setCenter }) {
    return (
      <div
        className="menu_item"
        onClick={(e) => {
          setCenter(station.coords);
          setStation(station);
        }}
      >
        {station.name}
      </div>
    );
  }
  return (
    <div className="sidebar">
      <h2 style={{ textAlign: "center" }}>Projects</h2>
      <div style={{ overflow: "auto" }}>
        {stations.map((station, i) => (
          <MenuItem
            key={i}
            station={station}
            setCenter={setCenter}
            setStation={setStation}
          />
        ))}
      </div>
    </div>
  );
};
