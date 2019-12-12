/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateAccount from "./CreateAccountComponent";
import Game from "./GameComponent";
import Login from "./LoginComponent";
import Logout from "./LogoutComponent";
import Info from "./InfoComponent";
import { login } from './Account';

let loggedIn = "";

class App extends Component {

  render() {
    return (

      <Router>
        <div class="nav-div">
          <ul class="nav-bar">
            <li class="nav-link">
              <Link class="link" to="/">Login</Link>
            </li>
            <li class="nav-link">
              <Link class="link" to="/info">Info</Link>
            </li>
            <li class="nav-link">
              <Link class="link" to="/game">Game</Link>
            </li>
          </ul>
        </div>
        <div class="wrapper">
          <div class="text-group">
            <h1 class="chrome-text">CS</h1>
            <h3 class="pink-text">Clicker</h3>
          </div>
        </div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/game" component={GamePage} />
      </Router>
    );
  }
}

function loginCallback(data) {
  loggedIn = data.name;
  console.log("logged in changed to " + loggedIn);
}

const GamePage = () => {
  return (
  <div>
    {(loggedIn !== "") && <Logout />}
    <Game loggedInValue={loggedIn}/>
  </div>);
}

const LoginPage = () => (
  <div>
    <Login callbackFromParent={loginCallback}/>
    <CreateAccount callbackFromParent={loginCallback}/>
    {(loggedIn !== "") && <Logout />}
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
        {(loggedIn !== "") && <Logout />}
        <Info />
      </div>
    )
  }
}

export default App;
