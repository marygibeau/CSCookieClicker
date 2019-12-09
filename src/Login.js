import React from 'react';
import {login} from "./Account";

function Login() {
    return (
    <div className="login">
        <h2>Login</h2>
        <form onSubmit={async event => {
          event.preventDefault();
          const name = event.target.username.value;
          const pass = event.target.password.value;
          if (await login({ name, pass })) {
            console.log('logged in');
            window.location.reload();
          } else {
            console.log('failed')
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
      </div>
      );
  }

export default Login;