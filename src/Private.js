import { getToken } from "./config/Token";
import { getAxiosInstance } from "./config/Axios";
import React from "react";


export async function checkLoggedIn() { // checks to see if user is logged in
    let axios = getAxiosInstance('/account');
    try {
        let response = await axios.get(`/status`, { "Authorization": "Bearer " + getToken() });
        console.log("username = " + response.data.user.name);
        return response.data.user.name;
    } catch (error) {
        console.log(error);
    }
}

const axios = getAxiosInstance('/private');

export async function postComment(comment) {
    let loggedIn = await checkLoggedIn();

    // console.log(loggedIn);

    if (loggedIn === "") {
        alert("Must be logged in before commenting!");
    } else {
        let url = "/" + loggedIn;
        try {
            let comments = [];
            try {
                let commentsResult = await axios.get(url, { "Authorization": "Bearer " + getToken() });
                // find last number of comment
                comments = commentsResult.data.result["comments"];
            } catch (error) {
                // if get doesn't work, index stays as 0
            }
            comments.push(comment);
            await axios.post(url, {
                "Authorization": "Bearer " + getToken(),
                "data": {
                    "comments": comments
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

export async function getComments() {
    const axios = getAxiosInstance('/private');
    let loggedIn = await checkLoggedIn();

    if (loggedIn !== "") {
        try {
            // gets names of commenters
            let response = await axios.get('/', { "Authorization": "Bearer " + getToken() });
            // console.log(response.data.result);
            // map commenters to their comments
            let output = await mapComments(response.data.result);
            // console.log(output);
            return output;
        } catch (error) {
            console.log("problem getting comments")
            return null;
        }
    } else {
        console.log("not logged in to see comments");
        return null;
    }
}

export async function mapComments(commenters) {
    let output = [];
    await commenters.map(async (name, index) => {
        let url = "/" + name;
        let commentResponse = await axios.get(url, { "Authorization": "Bearer " + getToken() });
        // console.log(commentResponse.data.result["comments"]);
        let commentArr = commentResponse.data.result["comments"];
        commentArr.map((comment, commentIndex) => {
            output.push({ "name": name, "comment": comment })
        })
    })
    return output;
}
