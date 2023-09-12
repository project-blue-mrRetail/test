import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";
import "./App.css";
import L from "leaflet";
import img from "./assets/png.png";

const center = [40.63463151377654, -97.89969605983609];

const markerIcon = new L.Icon({
  iconUrl: img,
  iconSize: [35, 45],
});

export default function Map({ setOpenValue }) {
  const [apiD, setApiD] = useState();
  const [mapData, setMapData] = useState();
  const [fillColor, setFillColor] = useState(
    statesData.features.map(() => "green")
  );
  const mapRef = useRef();
  const [selectedState, setSelectedState] = useState(null);
  const [visibilityStates, setVisibilityStates] = useState(
    statesData.features.map(() => true)
  );

  const handleStateClick = (e, state, index) => {
    setOpenValue(true);

    const map = mapRef.current;
    map.setView(e.target.getCenter(), 5);
    setSelectedState(state);
    setVisibilityStates(visibilityStates.map((_, i) => i === index));
    const apiData = () => {
      fetch("https://sheetdb.io/api/v1/i521rqr7n8ht1?limit=500")
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) => item.store_state === state.properties.name
          );
          setApiD(filteredData);
        });
    };
    apiData();
  };

  useEffect(() => {
    const apiData = () => {
      fetch("https://sheetdb.io/api/v1/i521rqr7n8ht1?limit=500")
        .then((res) => res.json())
        .then((data) => setMapData(data));
    };
    apiData();
  }, []);

  useEffect(() => {
    console.log(mapData);
  }, [mapData]);

  useEffect(() => {
    if (mapData) {
      const updatedFillColor = fillColor.map((color, index) => {
        const stateName = statesData.features[index].properties.name;

        // Calculate the sum of sales for the state
        const sumSales = mapData.reduce((acc, item) => {
          if (item.store_state === stateName) {
            return acc + parseFloat(item.Sales);
          }
          return acc;
        }, 0);

        console.log(sumSales);

        // Calculate the sum of targets for the state
        const sumTargets = mapData.reduce((acc, item) => {
          if (item.store_state === stateName) {
            return acc + parseFloat(item.Target);
          }
          return acc;
        }, 0);

        console.log(sumTargets);

        // Set color based on the condition (target > sum)
        return sumTargets > sumSales ? "red" : "green";
      });

      setFillColor(updatedFillColor);
    }
  }, [mapData]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={4}
      style={{ width: "55vw", height: "70vh" }}
      zoomControl={false}
      attributionControl={false}
      className="rounded-lg"
    >
      {statesData.features.map((state, index) => {
        if (!visibilityStates[index]) return null;

        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        const isSelected =
          selectedState?.properties.name === state.properties.name;

        return (
          <Polygon
            key={state.properties.name}
            pathOptions={{
              fillColor: isSelected ? "#c7f9cc" : fillColor[index],
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: isSelected ? "" : "3",
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              click: (e) => {
                handleStateClick(e, state, index);
              },
            }}
          >
            <Tooltip
              direction="center"
              offset={[0, 0]}
              opacity={1}
              permanent
              className="custom-tooltip"
            >
              {state.properties.name}
            </Tooltip>
          </Polygon>
        );
      })}

      {apiD &&
        apiD.map((city, id) => {
          const sales = city.Sales;
          const target = city.Target;
          // console.log(sales);
          let iconUrl;

          if (sales > target) {
            iconUrl =
              "https://th.bing.com/th/id/R.4ca6858ac91858abcdf6527002cf7923?rik=H02GCIGEnjQs6A&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fF%2fw%2fl%2fC%2fe%2fW%2fmap-marker.svg&ehk=ALSa4hKmAIpLTC08qRslruSeQKZ6grwKy6Ngk9a8ZIU%3d&risl=&pid=ImgRaw&r=0";
          } else if (sales === target) {
            iconUrl =
              "https://www.clker.com/cliparts/l/l/G/Y/u/m/map-pin-yellow.svg";
          } else {
            iconUrl =
              "https://th.bing.com/th/id/R.d2b2d7d42a95c1b35e91413b133add44?rik=ZYiEzAEXfjGKUA&riu=http%3a%2f%2fwww.downloadclipart.net%2flarge%2f35345-orange-pin-clipart.png&ehk=vTVt9Fw8bBKrkvfsSGGVXkuLWwYAvIik4YMAieBY5kM%3d&risl=&pid=ImgRaw&r=0";
          }

          const customIcon = new L.Icon({
            iconUrl: iconUrl,
            iconSize: [35, 45],
            iconAnchor: [17, 45],
            popupAnchor: [0, -45],
          });

          return (
            <Marker
              key={id}
              icon={customIcon}
              position={[city.latitude, city.longitude]}
              opacity={
                selectedState
                  ? city.store_state === selectedState.properties.name
                    ? 1
                    : 0
                  : 0
              }
            >
              <Popup>{city.store_city}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
