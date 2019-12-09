import {setToken} from "./config/Token";
import {getAxiosInstance} from "./config/Axios";

const axios = getAxiosInstance('/account');

export async function login({name, pass}) {
  try {
    const res = await axios.post(`/login`, {name, pass});
    const jwt = res.data.jwt;
    setToken(jwt);
    return true;
  } catch (error) {
    return false;
  }
}
//`/create`, {name: name, pass: pass}
export async function createAccount({name, pass}) {
  try {
    console.log("creating account");
    await axios.post('/create', {"name": name, "pass": pass, "data": {}});
    // console.log(result);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getStatus() {
  try {
    return (await axios.get(`/status`)).data;
  } catch (error) {
    return false;
  }
}