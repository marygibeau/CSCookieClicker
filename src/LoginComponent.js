import React from 'react';
import { login } from "./Account";
let confirmation = "";
function Login() {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="text-group">
          <h1 className="chrome-text">CS</h1>
          <h3 class="pink-text">Clicker</h3>
        </div>
      </div>
      <h2>Login</h2>
      <form onSubmit={async event => {
        event.preventDefault();
        const name = event.target.username.value;
        const pass = event.target.password.value;
        if (await login({ name, pass })) {
          console.log('logged in');
          //window.location.reload();
          confirmation = "Logged in!";
        } else {
          console.log('failed');
          confirmation = "Error signing in :(";
        }

      }}>
        <div className="field">
          <input id="username" className="input" placeholder="Username" type="text" name="username" />
        </div>
        <div className="field">
          <input id="password" className="input" placeholder="Password" type="password" name="password" />
        </div>
        <input id="submitbutton" className="button is-primary" type="submit" value="Login" />
      </form>
      <p>{confirmation}</p>
    </div>
  );
}

export default Login;