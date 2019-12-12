import React from 'react';
import { postComment, getComments } from "./Private";
import Autocomplete from "./Autocomplete";
import { getStatus } from "./Public";

async function displayComments() {
    console.log("in displayComments");
    let commentArr = await getComments();
    console.log("comment array: ");
    // this is doing something whacky take a look at it
    console.log(commentArr);
    let output = [];
    console.log(commentArr.length)
    for (let i = 0; i < commentArr.length; i++) {
        let value = commentArr[i];
        return output.push(<li key={i}>
            <div>
                <p>{value["name"]} said: </p>
                <p>{value["comment"]}</p>
            </div>
        </li>)
    }

    console.log("display comments output: ");
    console.log(output);
    return output;
}

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentElements: null,
        };
    }


    componentDidMount() {
        this.initializeComments();
    }

    async initializeComments() {
        let comments = await displayComments();
        this.setState({ commentElements: comments });
    }

    render() {
        return (
            <div>
                <div class="div-pad">
                    <h2 class="title-text">About the Game</h2>
                    <p class="p-font">This is CS Cookie Clicker, a spicy hot take on the classic <a href="https://orteil.dashnet.org/cookieclicker/">Cookie Clicker</a> game. </p>
                    <p class="p-font">Our version is based on the faculty of the UNC Computer Science Department, and clicking their faces earns you tickets to the <a href="http://hootpage.com">Mike Watt</a> concert in October 2019!</p>
                    <p class="p-font">Here's more information about the tickets you can earn when you click on each professor's face: </p>
                    <div className="searchBar">
                        <h2 class="title-text">Search for professors to learn about them!</h2>
                        </div>
                    <div>
                        <Autocomplete
                            suggestions={[
                                "Kris",
                                "Stotts",
                                "Montek",
                                "Jeffay",
                                "KMP"
                            ]}
                        />
                    </div>
                </div>
                <div class="div-pad">
                    <h2 class="title-text">Forum</h2>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const com = e.target.comment.value;
                        if (await postComment(com)) {
                            console.log("Comment posted!");
                            // window.location.reload();
                        } else {
                            console.log("Comment failed :(");
                        }
                    }}>
                        <textarea class="textArea" name="comment"></textarea> <br></br>
                        <input class="buyButton" type="submit" value={"Comment"} />
                    </form>

                    <h3 class="title-text">Other Comments</h3>
                    <div id="comments">
                        {/* previous reviews here */}
                        <ul>
                            {this.state.commentElements}
                        </ul>
                        {/* <BuildComments /> */}
                    </div>
                </div>
            </div >

        )
    }
}
export default Info;
