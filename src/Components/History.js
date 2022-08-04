import React, { useEffect, useState } from 'react';
import * as Realm from "realm-web";


const History = (hx) => {

    const history = hx.hx

    return (
        <div>
            <table className = "Hist-list">
  <thead>
    <tr>
    <td>Date</td>
    <td>Food</td>
    <td>Treats</td>
    <td>Comments</td>
    </tr>

  </thead>
  <tbody>
  {
  history.map( day =>
                    <tr key={day.date}>
                        <td>{day.date}</td>
                        <td>{day.food}%</td>
                        <td>{day.treats}</td>
                        <td className="Comment-review">{day.comments}</td>
                    </tr>
                )
                }
</tbody>
</table>
        </div>
    );
};

export default History;