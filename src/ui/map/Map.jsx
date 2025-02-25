import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useDispatch } from "react-redux";
import {
  fetchLocationByCoords,
  fetchWeatherByCoords,
  setLatitude,
  setLongitude,
} from "../../features/pages/create-new-page/weatherSlice";
import { useLocation } from "react-router-dom";

function Map({ data, zoom }) {
  const dispatch = useDispatch();
  const mapData = data;
  const pathLocation = useLocation();

  function DetectClick() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        dispatch(setLatitude(lat));
        dispatch(setLongitude(lng));

        dispatch(fetchWeatherByCoords({ latitude: lat, longitude: lng }));
        dispatch(fetchLocationByCoords({ latitude: lat, longitude: lng }));
      },
    });
    return null;
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={
          pathLocation.pathname === "/createpage"
            ? [mapData.latitude, mapData.longitude]
            : pathLocation.pathname === "/jurnal"
            ? [
                Number(mapData.jurnal[0]?.latitude) || 51.505,
                Number(mapData.jurnal[0]?.longitude) || -0.09,
              ]
            : [51.505, -0.09]
        }
        zoom={zoom}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {pathLocation.pathname === "/createpage" ? (
          <Marker position={[mapData.latitude, mapData.longitude]}>
            <Popup>
              Current position <br /> {mapData.city}
            </Popup>
          </Marker>
        ) : (
          mapData.jurnal?.map((location, index) => (
            <Marker
              key={index}
              position={[
                Number(location?.latitude) || 51.505,
                Number(location?.longitude) || -0.09,
              ]}
            >
              <Popup>
                {location?.title || "Unknown Title"} <br />
                {location?.place || "Unknown Place"}
              </Popup>
            </Marker>
          ))
        )}
        {pathLocation.pathname === "/createpage" && <DetectClick />}
      </MapContainer>
    </div>
  );
}

export default Map;
