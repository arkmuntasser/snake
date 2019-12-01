import React, { useState } from 'react';
import Gameboard from './components/Gameboard';

function App() {
  const [gameover, setGameover] = useState(false);

  return (
    <div className="App">
      { gameover ? <p>gameover</p> : <Gameboard setGameover={setGameover}></Gameboard> }
    </div>
  );
}

export default App;
