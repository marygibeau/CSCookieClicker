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


export async function updateReview(name, rate) {
  try {
      await axios.post(`/reviews`, {
          "name": name,
          "Authorization": "Bearer " + name,
          "data": {
              "rating": rate
          }
      });
      return true;
  } catch (error) {
      return false;
  }
}

export async function deleteReview(name) {
  try {
      await axios.delete(
          "/reviews",
          {
              headers: {
                  Authorization: "Bearer " + name
              }
          }
      );
      return true;
  } catch (error) {
      return false;
  }
}
