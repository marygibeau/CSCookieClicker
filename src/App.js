/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import KMPImage from "../assets/kmp_button.png";
import KrisImage from "../assets/kris.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import Login from "./LoginComponent";
import Logout from "./LogoutComponent";
import Info from "./InfoComponent";
import StottsImage from "../assets/stotts.png";
import MontekImage from "../assets/montek.png";
import JeffayImage from "../assets/jeffay.png";

const krisTPS = 0.5;
const stottsTPS = 5;
const montekTPS = 10;
const jeffayTPS = 50;

let krises = [];
let stotts = [];
let montek = [];
let jeffay = [];

class App extends Component {

  constructor(props) {
    super(props);
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

  initializeState() {
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

    const Game = () => (
      <div className="App">
        <div className="wrapper">
          <div className="text-group">
            <h1 className="chrome-text">CS</h1>
            <h3 class="pink-text">Clicker</h3>
          </div>
        </div>
        <div id="gameSpace">
          <div id="buttonArea">
            <img id="kmpbutton" src={KMPImage} onClick={() => this.KMPClickCallback()} alt={"kmp button"} />
            <p class="content-text">{this.state.score} Tickets</p>
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
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={LoginPage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/game" component={Game} />
          <Route path="/leaderboard" component={LeaderboardPage} />
        </div>
      </Router>
    );
  }
}

const LoginPage = () => (
  <div>
    <Login />
    <CreateAccount />
    <Logout />
  </div>

);

// const InfoPage = () => (
//   <div>
//     <Info/>
//   </div>
// );

const LeaderboardPage = () => (
  <div>
    <Leaderboard />
  </div>
);

class InfoPage extends Component {
  // I did this as a class because the reviews component was refreshing every second, which means
  // that it was sending an axios request per second, which is wasteful
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div>
        <Info />
      </div>
    )
  }
}

export default App;
