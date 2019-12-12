import React from 'react';
import './App.css';
import KMPImage from "../assets/kmp_button.png";
import SnowKMPImage from "../assets/kmp_button_snow.png";
import TicketImage from "../assets/ticket.png";
import TicketWater from "../assets/ticketwater.png";
import WindyImage from "../assets/windy.png";
import CloudsImage from "../assets/clouds.png";
import KrisImage from "../assets/kris.png";
import StottsImage from "../assets/stotts.png";
import MontekImage from "../assets/montek.png";
import JeffayImage from "../assets/jeffay.png";
import checkLoggedIn from "./Private";
import { updateTicketCount, deleteTicketCount, readTicketCount } from "./User";
import Rating from "./RatingComponent"

let KMP = KMPImage;
let Ticket = TicketImage
let Clouds;
let Windy;

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
        this.initializeState();
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState((state) => ({ score: state.score + (krisTPS * state.krisCount) + (stottsTPS * state.stottsCount) + (montekTPS * state.montekCount) + (jeffayTPS * state.jeffayCount) })), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getWeather() {
        console.log("getting weather");
        fetch('http://api.openweathermap.org/data/2.5/weather?zip=27514&APPID=9b480b2d714bad8368d57be060e9ac29&units=imperial').then(result => {
            return result.json();
        }).then(result => {
            this.state.temperature = result.main.temp;
            this.state.humidity = result.main.humidity;
            this.state.windspeed= result.wind.speed;
            this.state.clouds= result.clouds.all;
            this.state.descrip = result.weather[0].description;
            if (this.state.temperature <= 32) {
                KMP = SnowKMPImage;
            }
            if (this.state.humidity > 50) {
                Ticket = TicketWater;
            }
            if (this.state.clouds > 0) {
                Clouds = CloudsImage;
            }
            if (this.state.windspeed > 5) {
                Windy = WindyImage;
            }
        })
    }

    async loadSave() {
        let gameStateResponse = await readTicketCount(loggedIn);
        let gameState = gameStateResponse.data.result["gameState"];
        if (gameState !== {}) {
            this.setState({
                score: gameState["score"],
                krisCount: gameState["krisCount"],
                krisCost: gameState["krisCost"],
                stottsCount: gameState["stottsCount"],
                stottsCost: gameState["stottsCost"],
                montekCount: gameState["montekCount"],
                montekCost: gameState["montekCost"],
                jeffayCount: gameState["jeffayCount"],
                jeffayCost: gameState["jeffayCost"],
            })
            krises = [];
            stotts = [];
            montek = [];
            jeffay = [];
            for (let i = 0; i < gameState["krisCount"] && i < 10; i++) {
                krises.push(<img class='kris' src={KrisImage} />);
            }
            for (let i = 0; i < gameState["stottsCount"] && i < 10; i++) {
                stotts.push(<img class='stotts' src={StottsImage} />);
            }
            for (let i = 0; i < gameState["montekCount"] && i < 10; i++) {
                montek.push(<img class='montek' src={MontekImage} />);
            }
            for (let i = 0; i < gameState["jeffayCount"] && i < 10; i++) {
                jeffay.push(<img class='jeffay' src={JeffayImage} />);
            }
        }
    }

    async initializeState() {
        console.log("initializing state");
        this.getWeather();
        if (loggedIn !== "") {
            await this.loadSave()
        }
    }

    boughtJeffayCallBack() {
        if (this.state.score >= this.state.jeffayCost) {
            if (this.state.jeffayCount < 10) {
                jeffay.push(<img class='jeffay' src={JeffayImage} />);
            }
            this.setState({
                score: this.state.score - this.state.jeffayCost,
                jeffayCount: this.state.jeffayCount + 1,
                jeffayCost: this.state.jeffayCost + (75 * (this.state.jeffayCount + 1))
            });
        }
    }

    boughtMontekCallBack() {
        if (this.state.score >= this.state.montekCost) {
            if (this.state.montekCount < 10) {
                montek.push(<img class='montek' src={MontekImage} />);
            }
            this.setState({
                score: this.state.score - this.state.montekCost,
                montekCount: this.state.montekCount + 1,
                montekCost: this.state.montekCost + (20 * (this.state.montekCount + 1))
            });
        }
    }

    boughtStottsCallBack() {
        if (this.state.score >= this.state.stottsCost) {
            if (this.state.stottsCount < 10) {
                stotts.push(<img class='stotts' src={StottsImage} />);
            }
            this.setState({
                score: this.state.score - this.state.stottsCost,
                stottsCount: this.state.stottsCount + 1,
                stottsCost: this.state.stottsCost + (10 * (this.state.stottsCount + 1))
            });
        }
    }

    boughtKrisCallBack() {
        if (this.state.score >= this.state.krisCost) {
            console.log(this.state.krisCount);
            if (this.state.krisCount < 10) {
                krises.push(<img class='kris' src={KrisImage} />);
            }
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
                        <img id="clouds" src={Clouds} />
                        <br></br>
                        <img id="windy1" src={Windy} />
                        <img id="kmpbutton" src={KMPImage} onClick={() => this.KMPClickCallback()} alt={"kmp button"} />
                        <img id="windy2" src={Windy} />
                        <p class="content-text">{this.state.score} Tickets</p>
                        {(loggedIn !== "") && <div>
                            <button class="buyButton" onClick={() => { updateTicketCount(loggedIn, this.state) }}>Save</button>
                            <button class="buyButton" onClick={() => { deleteTicketCount(loggedIn) }}>Delete Saves</button>
                            <button class="buyButton" onClick={async () => { await this.loadSave() }}>Load Previous Save</button>
                        </div>}
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <img id="ticketimage" src={Ticket} />
                        <p class="content-text">{this.state.descrip}</p>
                    </div>
                    <div id="storeArea">
                        <div id="KrisArea" class="profContainer">
                            <div class="buyDiv">
                                <button class="buyButton" onClick={() => this.boughtKrisCallBack()}>Buy a Kris: {this.state.krisCost} Tickets</button>
                            </div>
                            <div id="krises" class="profArray">
                                <div class="table">
                                    <ul class="horizontal-list">
                                        {krises.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div class="costDiv">
                                <p class="content-text">Kris Count: {this.state.krisCount}</p>
                            </div>

                        </div>
                        <div id="StottsArea" class="profContainer">
                            <div class="buyDiv">
                                <button class="buyButton" onClick={() => this.boughtStottsCallBack()}>Buy a Stotts: {this.state.stottsCost} Tickets</button>
                            </div>
                            <div id="stottses" class="profArray">
                                <div class="table">
                                    <ul class="horizontal-list">
                                        {stotts.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div class="costDiv">
                                <p class="content-text">Stotts Count: {this.state.stottsCount}</p>
                            </div>

                        </div>
                        <div id="MontekArea" class="profContainer">
                            <div class="buyDiv">
                                <button class="buyButton" onClick={() => this.boughtMontekCallBack()}>Buy a Montek: {this.state.montekCost} Tickets</button>
                            </div>
                            <div id="monteks" class="profArray">
                                <div class="table">
                                    <ul class="horizontal-list">
                                        {montek.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div class="costDiv">
                                <p class="content-text">Montek Count: {this.state.montekCount}</p>
                            </div>

                        </div>
                        <div id="JeffayArea" class="profContainer">
                            <div class="buyDiv">
                                <button class="buyButton" onClick={() => this.boughtJeffayCallBack()}>Buy a Jeffay: {this.state.jeffayCost} Tickets</button>
                            </div>
                            <div id="jeffays" class="profArray">
                                <div class="table">
                                    <ul class="horizontal-list">
                                        {jeffay.map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div class="costDiv">
                                <p class="content-text">Jeffay Count: {this.state.jeffayCount}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <Rating />
            </div>
        );
    }
}

export default Game;
