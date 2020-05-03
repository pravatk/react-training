import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-88519.firebaseio.com"
});

export default instance;
