import { getAxiosInstance } from "./config/Axios";

const axios = getAxiosInstance('/public');

export async function postReview(name, rate) {
  let url = "/" + name;
  try {
    await axios.post(url, {
      "name": name,
      "data": {
        "rating": rate
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getStatus() {
  try {
    let total = (await axios.get(`/`));
    let sum = 0;
    for(let i = 0; i < total.data.result.length; i++) {
      let jer = await axios.get('/' + total.data.result[i])
      sum += parseInt(jer.data.result.rating);
    }
    sum /= total.data.result.length;
    console.log(sum);
    return sum;
  } catch (error) {
    return 0;
  }
}

export async function deleteReview(name) {
  try {
    await axios.delete("/reviews",
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
