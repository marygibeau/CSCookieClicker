import React from 'react';
import {postComment, getComments} from "./Private";

function BuildComments() {
    let comments = getComments().data;
    console.log("result of getComments: " + comments);
    let result = ``;
    if (comments !== null && comments !== undefined ) {
        // loop through reviews and append html to result
        Object.keys(comments).forEach(function(key) {
            result += `<div><h4>` + comments[key].name + `</h4><p>` + comments[key].text +  `</p></div>`;
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
                    const com = e.target.comment.value;
                    if (await postComment(com)) {
                        console.log("Comment posted!");
                        window.location.reload();
                    } else {
                        console.log("Comment failed :(");
                    }
                }}>
                    <textarea name="comment"></textarea> <br></br>
                    <input className="button is-primary" type="submit" value={"Comment"} />
                </form>

                <h3>Other Comments</h3>
                <div id="comments">
                    {/* previous reviews here */}
                    <BuildComments/>
                </div>
            </div>
        </div>

    )
}
export default Info;
