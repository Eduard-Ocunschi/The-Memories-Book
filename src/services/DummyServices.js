export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getCurrentWeatherByLocation = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=7cba46f89e66aba0a2773153a41af2a5
    `
  );
  return await res.json();
};

export const getLocationByCoords = async ({ latitude, longitude }) => {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );

  return await res.json();
};
