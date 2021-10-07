import axios from "axios";
import axiosRetry from "axios-retry";

const $host = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/"
});

axiosRetry($host, { retries: 5, noResponseRetries: 5, timeout: 100 });

export { $host };
