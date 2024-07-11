import React from 'react';

const FruitStand = ({fruits, addApple, addOrange, clearFruit}) => (
  <div>
    <ul>
      {fruits.map((fruit, idx) => <li key={idx}>{fruit}</li>)}
    </ul>

    <button onClick={addApple}>Apple</button>
    <button onClick={addOrange}>Orange</button>
    <button onClick={clearFruit}>Clear</button>
  </div>
)

export default FruitStand;
