import React from 'react';
import { postReview } from './Public'

class Rating extends React.Component {
    constructor() {
        super();
        this.state = {};
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
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

                }} name="review form">
                    <label htmlFor="name">Enter Your Name: </label>
                    <input id="name" name="name" type="text" />
                    <br />
                    <label htmlFor="review">Rate us 1 - 5</label>
                    <div class="slidecontainer">
                        1<input type="range" min="1" max="5" class="slider" name="review" />5
                    </div>
                    <br />
                    <button type="submit">Send data!</button>
                </form>
            </div>
        );
    }
} 

export default Rating;