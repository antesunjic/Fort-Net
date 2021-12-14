import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import "./Map.scss";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import fortIcon from "../../../../assets/fortLogo.svg";

function Map() {
  const products = useSelector((state) => state.products);
  const filteredResults = useSelector((state) => state.filteredResults);

  let list;

  if (products.length !== 0) {
    list = products;
  }
  if (filteredResults.length !== 0) {
    list = filteredResults;
  }
  if (filteredResults.length !== 0) {
    list = filteredResults;
  }

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const mapCenter =
    filteredResults.length > 0
      ? {
          lat: parseFloat(list[0].location.geoLatitude),
          lng: parseFloat(list[0].location.geoLongitude),
        }
      : { lat: 42.640278, lng: 18.108334 };
  const mapZoom = filteredResults.length > 0 ? 11 : 8;

  return (
    <GoogleMap defaultZoom={mapZoom} center={mapCenter}>
      {list ? (
        <MarkerClusterer>
          {list?.map((listItem) => (
            <Marker
              key={listItem.location.id}
              position={{
                lat: parseFloat(listItem.location.geoLatitude),
                lng: parseFloat(listItem.location.geoLongitude),
              }}
              onClick={() => {
                setSelectedItem(listItem);
              }}
              icon={{
                url: fortIcon,
                scaledSize: new window.google.maps.Size(25, 35),
              }}
            />
          ))}
        </MarkerClusterer>
      ) : null}
      {selectedItem && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedItem(null);
          }}
          position={{
            lat: parseFloat(selectedItem.location.geoLatitude),
            lng: parseFloat(selectedItem.location.geoLongitude),
          }}
        >
          <div className="infoWindow">
            <img alt={`${selectedItem.name}Img`} src={selectedItem.photoUrl} />
            <h4>{selectedItem.name}</h4>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div className="googleMap">
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
