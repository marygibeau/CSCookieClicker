import React from 'react';
import { postComment, getComments } from "./Private";
import Autocomplete from "./Autocomplete";
import { getStatus } from "./Public";

let loggedIn = "";

class Info extends React.Component {
    constructor(props) {
        super(props);
        loggedIn = props.loggedInValue;
        this.state = {
            comments: [],
        };
    }


    componentDidMount() {
        this.initializeComments();
    }

    async initializeComments() {
        // let comments = await getComments();
        let comments = [{ name: "mary", comment: "cool beans" },
                        { name: "natalie", comment: "excellent game" },
                        { name: "mary", comment: "hello again" },
                        { name: "haley", comment: "yooo" },
                        { name: "jeremiahalfaro", comment: "hi" },
                        { name: "armando", comment: "ayy lmao" }]
        this.setState({ comments: comments });
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
                            document.getElementById("commentList").append(loggedIn + " said: ");
                            document.getElementById("commentList").append(com);
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
                        {(loggedIn !== "") ?
                            <ul id="commentList" class="ul-no-bullet">
                                {(this.state.comments !== null && this.state.comments !== []) ?
                                    this.state.comments.map((value, index) => {
                                        return <li key={index}>
                                            <div>
                                                <p>{value["name"]} said: {value["comment"]}</p>
                                            </div>
                                        </li>
                                    }) :
                                    <li key="none">No Comments Right Now!</li>}
                            </ul> :
                            <p>make sure you're logged in to be able to see comments!</p>
                        }
                        {/* <BuildComments /> */}
                    </div>
                </div>
            </div >

        )
    }
}
export default Info;
