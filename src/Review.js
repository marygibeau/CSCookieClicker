import Rating from "./RatingComponent";
import React from 'react';
import Game from "./GameComponent";

class Review extends Game.Component {
    render() {
        return (
            <Rating />
        );
    }
}

export default Review;