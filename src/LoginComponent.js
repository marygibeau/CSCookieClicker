import React from 'react';
import { login } from "./Account";
let confirmation = "";
<<<<<<< HEAD
function Login(props) {
  console.log(props);
    return (
    <div className="login">
        <h2>Login</h2>
        <form onSubmit={async event => {
          event.preventDefault();
          const name = event.target.username.value;
          const pass = event.target.password.value;
          if (await login({ name, pass })) {
            console.log('logged in');
            props.callbackFromParent({"name": name});
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
=======
function Login() {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="text-group">
          <h1 className="chrome-text">CS</h1>
          <h3 class="pink-text">Clicker</h3>
        </div>
>>>>>>> e1fa8e597322d34256e5759710612801007f9c32
      </div>
      <div class="div-pad">
      <h2 class="title-text">Login</h2>
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
    </div>
  );
}

export default Login;