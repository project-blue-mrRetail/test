import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const MapComponent = ({ imageValue }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 37.0902, // Initial latitude for USA
    longitude: -95.7129, // Initial longitude for USA
    zoom: 4, // Initial zoom level for USA
  });

  const [markers, setMarkers] = useState([]);

  const handleStateClick = (state) => {
    // Zoom in on the selected state
    setViewport({
      ...viewport,
      latitude: state.latitude,
      longitude: state.longitude,
      zoom: 6, // Adjust zoom level as needed
    });

    // Add a marker for the selected state
    setMarkers([
      {
        latitude: state.latitude,
        longitude: state.longitude,
        content: `Marker for ${state.name}`,
      },
    ]);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {/* Add markers for selected states */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <div>{marker.content}</div>
          </Marker>
        ))}
      </ReactMapGL>

      {/* Example: Click on a state to zoom in */}
      <button
        onClick={() =>
          handleStateClick({
            name: "New York",
            latitude: 40.7128,
            longitude: -74.006,
          })
        }
      >
        Zoom to New York
      </button>
    </div>
  );
};

export default MapComponent;
