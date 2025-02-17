import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const nbmClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

nbmClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default nbmClient;

export const googleClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_URL,
});
