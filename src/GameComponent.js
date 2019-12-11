import React from 'react';
import './App.css';
import KMPImage from "../assets/kmp_button.png";
import KMPImage from "../assets/kmp_button.png";
import SnowKMPImage from "../assets/kmp_button_snow.png";
import KrisImage from "../assets/kris.png";
import KrisImage from "../assets/kris.png";
import StottsImage from "../assets/stotts.png";
import MontekImage from "../assets/montek.png";
import JeffayImage from "../assets/jeffay.png";
import checkLoggedIn from "./Private";
import { updateTicketCount, deleteTicketCount } from "./User";

let KMP = KMPImage;

const krisTPS = 0.5;
const stottsTPS = 5;
const montekTPS = 10;
const jeffayTPS = 50;

let loggedIn = "";

let krises = [];
let stotts = [];
let montek = [];
let jeffay = [];

class Game extends React.Component {

    constructor(props) {
        super(props);

        loggedIn = props.loggedInValue;

        this.state = {
            score: 0,
            krisCount: 0,
            krisCost: 5,
            stottsCount: 0,
            stottsCost: 50,
            montekCount: 0,
            montekCost: 100,
            jeffayCount: 0,
            jeffayCost: 1000,
        }
        this.KMPClickCallback.bind(this);
    }
    componentDidMount() {
        this.initializeState();
        this.interval = setInterval(() => this.setState((state) => ({ score: state.score + (krisTPS * state.krisCount) + (stottsTPS * state.stottsCount) + (montekTPS * state.montekCount) + (jeffayTPS * state.jeffayCount) })), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getWeather() {
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=27514&APPID=9b480b2d714bad8368d57be060e9ac29&units=imperial').then(result => {
            return result.json();
        }).then(result => {
            this.state.temperature = result.main.temp;
            if (this.state.temperature <= 32) {
                KMP = SnowKMPImage;
            }
        })
    }

    async initializeState() {
        console.log("initializing state");
        loggedIn = await checkLoggedIn();
        this.getWeather();
        // oldScore = await callToServer...
        // find out time since last log in and calculate points from automatic score generating items
        // accumulatedPoints = timeSinceLastLoginInSeconds * pointsPerSecond
        // newScore = oldScore + accumulatedPoints;
        // this.state.score = newScore;
    }

    boughtJeffayCallBack() {
        if (this.state.score >= this.state.jeffayCost) {
            jeffay.push(<img class='jeffay' src={JeffayImage} />);
            this.setState({
                score: this.state.score - this.state.jeffayCost,
                jeffayCount: this.state.jeffayCount + 1,
                jeffayCost: this.state.jeffayCost + (75 * (this.state.jeffayCount + 1))
            });
        }
    }

    boughtMontekCallBack() {
        if (this.state.score >= this.state.montekCost) {
            montek.push(<img class='montek' src={MontekImage} />);
            this.setState({
                score: this.state.score - this.state.montekCost,
                montekCount: this.state.montekCount + 1,
                montekCost: this.state.montekCost + (20 * (this.state.montekCount + 1))
            });
        }
    }

    boughtStottsCallBack() {
        if (this.state.score >= this.state.stottsCost) {
            stotts.push(<img class='stotts' src={StottsImage} />);
            this.setState({
                score: this.state.score - this.state.stottsCost,
                stottsCount: this.state.stottsCount + 1,
                stottsCost: this.state.stottsCost + (10 * (this.state.stottsCount + 1))
            });
        }
    }

    boughtKrisCallBack() {
        if (this.state.score >= this.state.krisCost) {
            krises.push(<img class='kris' src={KrisImage} />);
            this.setState({
                score: this.state.score - this.state.krisCost,
                krisCount: this.state.krisCount + 1,
                krisCost: this.state.krisCost + (1.5 * (this.state.krisCount + 1))
            });
        } else {
            // alert("not enough tickets to bribe a Kris for help");
        }
    }

    KMPClickCallback() {
        this.setState({ score: this.state.score + 1 });
    }


    render() {
        return (
            <div className="App">
                <div id="gameSpace">
                    <div id="buttonArea">
                        <img id="kmpbutton" src={KMPImage} onClick={() => this.KMPClickCallback()} alt={"kmp button"} />
                        <p class="content-text">{this.state.score} Tickets</p>
                        {(loggedIn !== "") && <div>
                            <button onClick={() => { updateTicketCount(loggedIn, this.state) }}>save</button>
                            <button onClick={() => { deleteTicketCount(loggedIn) }}>delete saves</button>
                        </div>}
                    </div>
                    <div id="storeArea">
                        <div id="KrisArea">
                            <p class="content-text" onClick={() => this.boughtKrisCallBack()}>click me to buy a kris for {this.state.krisCost} tickets</p>
                            <div id="krises">
                                <div class="table">
                                    <ul class="horizontal-list">
                                        {krises.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </div>
                                <p class="content-text">Kris count: {this.state.krisCount}</p>
                            </div>
                            <div id="StottsArea">
                                <p class="content-text" onClick={() => this.boughtStottsCallBack()}>click me to buy a Stotts for {this.state.stottsCost} tickets</p>
                                <div id="stottses">
                                    <div class="table">
                                        <ul class="horizontal-list">
                                            {stotts.map((value, index) => {
                                                return <li key={index}>{value}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <p class="content-text">Stotts count: {this.state.stottsCount}</p>
                                </div>
                            </div>
                            <div id="MontekArea">
                                <p class="content-text" onClick={() => this.boughtMontekCallBack()}>click me to buy a Montek for {this.state.montekCost} tickets</p>
                                <div id="monteks">
                                    <div class="table">
                                        <ul class="horizontal-list">
                                            {montek.map((value, index) => {
                                                return <li key={index}>{value}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <p class="content-text">Montek count: {this.state.montekCount}</p>
                                </div>
                            </div>
                            <div id="JeffayArea">
                                <p class="content-text" onClick={() => this.boughtJeffayCallBack()}>click me to buy a Jeffay for {this.state.jeffayCost} tickets</p>
                                <div id="jeffays">
                                    <div class="table">
                                        <ul class="horizontal-list">
                                            {jeffay.map((value, index) => {
                                                return <li key={index}>{value}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <p class="content-text">Jeffay count: {this.state.jeffayCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;