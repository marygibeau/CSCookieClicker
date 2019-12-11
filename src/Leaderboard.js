import React from 'react';

function Leaderboard() {
  return (
    <div>
      <div className="wrapper">
        <div className="text-group">
          <h1 className="chrome-text">CS</h1>
          <h3 class="pink-text">Clicker</h3>
        </div>
      </div>
      <h2>Leaderboard</h2>
      <div className="pve table">
        <table className="sortable">
          <thead>
            <tr>
              <th className="sorttable_numeric default-sort" data-id="position">#</th>
              <th data-id="name">Name</th>
              <th className="sorttable_numeric" data-id="score">Score</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

  )
}
export default Leaderboard;
