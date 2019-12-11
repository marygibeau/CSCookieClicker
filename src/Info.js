import React from 'react';
import {postReview, getReviews} from "./Private";

function BuildReviews() {
    let reviews = getReviews().data;
    console.log("result of getReviews: " + reviews);
    let result = ``;
    if (reviews !== null && reviews !== undefined ) {
        // loop through reviews and append html to result
        Object.keys(reviews).forEach(function(key) {
            result += `<div><h4>` + reviews[key].name + `</h4><p>` + reviews[key].text +  `</p></div>`;
        });
        // for (rev in reviews) {
        //     // name is res.name, comment is res.text
        //     result += `<div><h4>{rev.name}</h4><p>{rev.text}</p></div>`
        // }
    }
    return result;
}

function Info() {
    return (
        <div>
            <div>
                <h2>About the Game</h2>
                <p>This is CS Cookie Clicker, a spicy hot take on the classic <a href="https://orteil.dashnet.org/cookieclicker/">Cookie Clicker</a> game. </p>
                <p>Our version is based on the faculty of the UNC Computer Science Department, and clicking their faces earns you tickets to the <a href="http://hootpage.com">Mike Watt</a> concert in October 2019!</p>
                <p>Here's more information about the tickets you can earn when you click on each professor's face: </p>
                {/* Haley: search bar here! */}
            </div>
            <div>
                <h2>Forum</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const rev = e.target.review.value;
                    if (await postReview(rev)) {
                        console.log("Comment posted!");
                        window.location.reload();
                    } else {
                        console.log("Comment failed :(");
                    }
                }}>
                    <textarea name="review"></textarea> <br></br>
                    <input className="button is-primary" type="submit" value={"Comment"} />
                </form>

                <h3>Other Reviews</h3>
                <div id="reviews">
                    {/* previous reviews here */}
                    <BuildReviews/>
                </div>
            </div>
        </div>

    )
}
export default Info;
