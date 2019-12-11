import React from 'react';
import {setToken} from "./config/Token";

function Logout() {
  return (
    <button className="button is-danger"
            onClick={() => {
              setToken('');
              window.location.reload();
              alert("You've logged out");
            }}>Logout</button>
  );
}

export default Logout;