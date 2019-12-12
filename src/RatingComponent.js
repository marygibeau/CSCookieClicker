import React from 'react';
import { postReview, getStatus } from './Public'

let reviewTotal = "";

async function displayRatings() {
    console.log("in displayRatings");
    let reviews = await getStatus();
    console.log(reviews);
    let output = "The average rating of this game is: " + reviews;
    console.log("hey")
    console.log(output);
    reviewTotal = output;
    return output;
}

class Rating extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        displayRatings();
        return (
            <div class="rating-div">
                <p><h2>Tell us what you think!</h2></p>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const rev = e.target.review.value;
                    if (await postReview(name, rev)) {
                        // confirmation = "Account created!";
                        // log the user in
                        console.log("review posted");
                    } else {
                        console.log("review failed to post");
                        // confirmation = "Error in creating account";
                    }
                    displayRatings();
                }} name="review form">
                    <label htmlFor="name">Enter Your Name: </label>
                    <input id="name" name="name" type="text" class="form-input-2"/>
                    <br />
                    <label htmlFor="review">Rate us 1 - 5</label>
                    <div class="slidecontainer">
                        1<input type="range" min="1" max="5" class="slider" name="review" />5
                    </div>
                    <br />
                    <button class="buyButton" type="submit">Send data!</button>
                </form>
                <p class="content-text">{reviewTotal}</p>
            </div>
        );
    }
} 

export default Rating;
