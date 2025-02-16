import {
  getCurrentWeatherByLocation,
  getGeoLocation,
  getLocationByCoords,
} from "../../../services/DummyServices";
import PageForm from "../../../ui/components/form/PageForm";
import Map from "../../../ui/map/Map";
import styles from "./CreateNewPage.module.css";
import { useSelector } from "react-redux";
import {
  setCity,
  setCountry,
  setDescription,
  setLatitude,
  setLongitude,
  setTemperature,
} from "./weatherSlice";
import { store } from "../../../store";

function CreateNewPage() {
  const weatherSliceData = useSelector((state) => state.data.weather);

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <PageForm />
      </div>
      <div className={styles.container_right}>
        <div className={styles.container_right_weather}>
          <p>
            Location: {`${weatherSliceData.city}, ${weatherSliceData.country}`}
          </p>

          <p>
            {weatherSliceData.description.charAt(0).toUpperCase() +
              weatherSliceData.description.slice(1)}
          </p>
          <p>{weatherSliceData?.temperature} °C</p>
        </div>
        <div className={styles.map_border}>
          <Map />
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const geoLocation = await getGeoLocation();

  if (!geoLocation?.coords) throw new Error("Failed to fatch location coords!");

  const locationCity = await getLocationByCoords(
    geoLocation.coords.latitude,
    geoLocation.coords.longitude
  );

  const weather = await getCurrentWeatherByLocation(
    geoLocation.coords.latitude,
    geoLocation.coords.longitude
  );

  store.dispatch(setLatitude(geoLocation.coords.latitude));
  store.dispatch(setLongitude(geoLocation.coords.longitude));
  store.dispatch(setCountry(locationCity.countryName));
  store.dispatch(setCity(locationCity.city));
  store.dispatch(setTemperature(weather.main.temp));
  store.dispatch(setDescription(weather.weather[0].description));

  return null;
}

export default CreateNewPage;
