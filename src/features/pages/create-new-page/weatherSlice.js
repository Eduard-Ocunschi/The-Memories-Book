import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ latitude, longitude }) => {
    const res =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=7cba46f89e66aba0a2773153a41af2a5
    `);
    const data = await res.json();

    return {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  }
);

export const fetchLocationByCoords = createAsyncThunk(
  "weather/fetchLocationByCoords",
  async ({ latitude, longitude }) => {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await res.json();

    return {
      city: data.city,
      country: data.countryName,
    };
  }
);

const initialState = {
  city: "",
  country: "",
  temperature: null,
  description: "",
  latitude: null,
  longitude: null,
  isLoading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLatitude(state, action) {
      state.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.longitude = action.payload;
    },
    setTemperature(state, action) {
      state.temperature = action.payload;
    },
    setCountry(state, action) {
      state.country = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.temperature = action.payload.temperature;
        state.description = action.payload.description;
        state.isLoading = false;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLocationByCoords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLocationByCoords.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.isLoading = false;
      })
      .addCase(fetchLocationByCoords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setLatitude,
  setLongitude,
  setCity,
  setCountry,
  setTemperature,
  setDescription,
} = weatherSlice.actions;

export default weatherSlice.reducer;
