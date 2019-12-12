import React from 'react';
import {createAccount, login} from "./Account";
import {createTicketCount} from "./User"
let confirmation = "";
function CreateAccount() {
    return (
      <div class="div-pad">
        <h1 class="title-text">Create Account</h1>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const name = e.target.name.value;
          const pass = e.target.pass.value;
          if (await createAccount({name, pass})) {
            confirmation = "Account created!";
            // log the user in
            if(login({name, pass})) {
            createTicketCount(name);
            } else {
              alert("log in failed");
            }
          } else {
            confirmation = "Error in creating account";
          }
          
        }}>
          <div className="field">
            <input class="form-input" placeholder="Username" type="text" name="name"/>
          </div>
          <div className="field">
            <input class="form-input" placeholder="Password" type="password" name="pass"/>
          </div>
          <input class="buyButton" type="submit" value={"Create"}/>
        </form>
        <p>{confirmation}</p>
      </div>
    );
  }
export default CreateAccount;
  