import React from 'react';

function Leaderboard() {
    return (
            <div>
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
