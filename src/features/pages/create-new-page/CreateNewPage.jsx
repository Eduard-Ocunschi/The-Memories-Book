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
import { FaArrowsRotate } from "react-icons/fa6";
import { store } from "../../../store";
import { useState } from "react";

function CreateNewPage() {
  const weatherSliceData = useSelector((state) => state.data.weather);
  const [flipped, setFlipped] = useState(false);

  return (
    <section className={styles.page_container}>
      <div className={`${styles.container} ${flipped ? styles.flip : ""}`}>
        <button
          className={styles.btn_flip}
          onClick={() => setFlipped(!flipped)}
        >
          <FaArrowsRotate />
        </button>
        <div className={styles.container_left}>
          <PageForm />
        </div>
        <div className={styles.container_right}>
          <div className={styles.container_right_weather}>
            <p>
              Location:{" "}
              {`${weatherSliceData.city}, ${weatherSliceData.country}`}
            </p>

            <p>
              {weatherSliceData.description.charAt(0).toUpperCase() +
                weatherSliceData.description.slice(1)}
            </p>
            <p>{weatherSliceData?.temperature} °C</p>
          </div>
          <div className={styles.map_border}>
            <Map data={weatherSliceData} zoom="13" />
          </div>
        </div>
      </div>
    </section>
  );
}

export async function loader() {
  let latitude, longitude;

  try {
    const geoLocation = await getGeoLocation();
    latitude = geoLocation.coords.latitude;
    longitude = geoLocation.coords.longitude;

    // if (!geoLocation?.coords) throw new Error("Failed to fatch location coords!");
  } catch (error) {
    console.warn(
      "Geolocation not allowed or failed. Falling back to Bologna.",
      error
    );
    latitude = 44.4949;
    longitude = 11.3426;
  }

  const locationCity = await getLocationByCoords(latitude, longitude);

  const weather = await getCurrentWeatherByLocation(latitude, longitude);

  store.dispatch(setLatitude(latitude));
  store.dispatch(setLongitude(longitude));
  store.dispatch(setCountry(locationCity.countryName));
  store.dispatch(setCity(locationCity.city));
  store.dispatch(setTemperature(weather.main.temp));
  store.dispatch(setDescription(weather.weather[0].description));

  return null;
}

export default CreateNewPage;
