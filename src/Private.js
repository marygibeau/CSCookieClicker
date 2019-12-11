import { getToken } from "./config/Token";
import { getAxiosInstance } from "./config/Axios";

export async function checkLoggedIn() { // checks to see if user is logged in
    let axios = getAxiosInstance('/account');
    try {
        let response = await axios.get(`/status`, { "Authorization": "Bearer " + getToken() });
        console.log(response.data.user.name);
        return response.data.user.name;
    } catch (error) {
        console.log(error);
    }
}

export async function postComment(comment) {
    let loggedIn = await checkLoggedIn();

    console.log(loggedIn);

    const axios = getAxiosInstance('/private');

    if (loggedIn === "") {
        alert("Must be logged in before commenting!");
    } else {
        console.log("in postComment");
        try {
            await axios.post(`/comment`, {
                "Authorization": "Bearer " + getToken(),
                "data": {
                    "name": loggedIn,
                    "text": comment
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

}

export async function getComments() {
    const axios = getAxiosInstance('/private');
    let loggedIn = await checkLoggedIn();

    if (loggedIn !== "") { // T = they're logged in, show reviews
        try {
            let response = await axios.get(`/comment`, { "Authorization": "Bearer " + getToken() });
            console.log("in getComments: " + response);
            return response.data;
        } catch (error) {
            console.log("problem getting comments")
            return null;
        }
    } else {
        console.log("not logged in to see comments");
        return null;
    }
}
