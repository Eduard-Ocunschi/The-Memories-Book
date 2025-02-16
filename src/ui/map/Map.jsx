import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationByCoords,
  fetchWeatherByCoords,
  setLatitude,
  setLongitude,
} from "../../features/pages/create-new-page/weatherSlice";

function Map() {
  const dispatch = useDispatch();
  const { latitude, longitude, city } = useSelector(
    (state) => state.data.weather
  );

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
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Current position <br /> {city}
          </Popup>
        </Marker>
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
