import React from "react";

export const Sidebar = ({ setCenter, stations, setStation, setActive }) => {
  function MenuItem({ station, setCenter, setActive }) {
    return (
      <div
        className="menu_item"
        onClick={(e) => {
          setCenter(station.coords);
          setStation(station);
          setActive(true);
        }}
      >
        {station.menuItem_content()}
      </div>
    );
  }
  return (
    <div className="sidebar">
      <div style={{ overflow: "auto" }}>
        <p>
          Police Stations Statistics
          <em style={{ fontSize: "6px", color: "red" }}>-new project</em>
        </p>

        {stations.map((station, i) => (
          <MenuItem
            key={i}
            station={station}
            setCenter={setCenter}
            setStation={setStation}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
};
