import { getToken } from "./config/Token";
import { getAxiosInstance } from "./config/Axios";

export async function checkLoggedIn() { // checks to see if user is logged in
    let axios = getAxiosInstance('/account');
    let loggedIn = "";
    try {
        let res = await axios.get(`/status`, { "Authorization": "Bearer " + getToken() });
        loggedIn = res.data.user.name;
        return loggedIn;
    } catch (error) {
        console.log(error);
        return loggedIn;
    }
}

export async function postReview(review) {
    const axios = getAxiosInstance('/private');
    let loggedIn = checkLoggedIn();

    if (loggedIn === "") {
        alert("Must be logged in before commenting!");
    } else {
        console.log("in postReview");
        try {
            await axios.post(`/review`, {
                "Authorization": "Bearer " + getToken(),
                "data": {
                    "name": loggedIn,
                    "text": review
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export async function getReviews() {
    const axios = getAxiosInstance('/private');
    let loggedIn = checkLoggedIn();

    if (loggedIn !== "") { // T = they're logged in, show reviews
        try {
            return await axios.get(`/review`, {"Authorization": "Bearer " + getToken()});
        } catch (error) {
            console.log("problem getting reviews")
            return null;
        }
    } else {
        console.log("not logged in to see reviews");
        return null;
    }
}
