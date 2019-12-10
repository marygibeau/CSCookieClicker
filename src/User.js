import {setToken} from "./config/Token";
import {getAxiosInstance} from "./config/Axios";

const axios = getAxiosInstance('/user');

export async function createTicketCount(name) {
    try {
    //   const res = await axios.post(`/login`, {"name": name, "pass": pass, "data": {}});
      return true;
    } catch (error) {
      return false;
    }
  }