import { getAxiosInstance } from "./config/Axios";

const axios = getAxiosInstance('/public');

export async function postReview(name, rate) {

    try {
      console.log("posting review");
      await axios.post('/reviews', { data: { "name": name, "rating": rate }});
      return true;
    } catch (error) {
      return false;
    }
}

export async function getStatus() {
    try {
      return (await axios.get(`/reviews`)).data;
    } catch (error) {
      return false;
    }
  }