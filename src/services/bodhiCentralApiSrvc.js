import config from "config";
import axios from "axios";

const bodhiCentralApiSrvc = axios.create({
  baseURL: config.domain
});

export default bodhiCentralApiSrvc;
