/**
 * src/constants/api.js
 */

import axios from "axios";
import { Alert } from "react-native";

const api = axios.create({
  baseURL: "http://192.168.0.3:3001", // http://localhost:3001
  timeout:  10000
});

function handleError(error) {
  if (error.response?.data.error)
      Alert.alert(error.response?.data.error);
  else
      Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
}

export { api, handleError };
