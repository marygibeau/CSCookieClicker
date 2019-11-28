import React, { Component } from 'react';
import './App.css';
import KMPImage from "../assets/kmp_button.png";
import KrisImage from "../assets/kris.png";
// import KMPButton from './KMPButton';
// import Score from './Score';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      krisCount: 0,
      krises: [],
      krisCost: 5,
      krisTPS: 0.5,
    }
    this.KMPClickCallback.bind(this);
  }
  componentDidMount() {
    this.initializeState();
    this.interval = setInterval(() => this.setState((state) => ({ score: state.score + (state.krisTPS * state.krisCount) })), 1000);
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

  boughtKrisCallBack() {
    if (this.state.score >= this.state.krisCost) {
      this.state.krises.push(<img class='kris' src={KrisImage} />);
      this.setState({
        score: this.state.score - this.state.krisCost,
        krisCount: this.state.krisCount + 1,
        krisCost: this.state.krisCost + (1.5 * (this.state.krisCount + 1))
      });
    } else {
      alert("not enough tickets to bribe a Kris for help");
    }
  }

  KMPClickCallback() {
    this.setState({ score: this.state.score + 1 });
  }

  render() {
    return (
      <div className="App">
        <div class="App-header">
          <p class="App-intro">Welcome to UNC CS Clicker</p>
        </div>
        <div id="gameSpace">
          <div id="buttonArea">
            <img id="kmpbutton" src={KMPImage} onClick={() => this.KMPClickCallback()} alt={"kmp button"} />
            <p>{this.state.score} Tickets</p>
          </div>
          <div id="storeArea">
            <p onClick={() => this.boughtKrisCallBack()}>click me to buy a kris for {this.state.krisCost} tickets</p>
            <div id="krises">
              {/* <img class="kris"src={KrisImage}/> */}
              <div class="table">
                <ul class="horizontal-list">
                  {this.state.krises.map((value, index) => {
                    return <li key={index}>{value}</li>
                  })}
                </ul>
              </div>
              <p>kris count: {this.state.krisCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
