import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Apples from './Apples';

function Gameboard({ setGameover }) {
  const [coords, setCoords] = useState({
    x: getRandomCoordinate(),
    y: getRandomCoordinate()
  });
  const [eaten, setEaten] = useState(false);

  function getRandomCoordinate() {
    return Math.floor(Math.random() * Math.floor(16)) + 1;
  }

  useEffect(() => {
    if (eaten) {
      setCoords({
        x: getRandomCoordinate(),
        y: getRandomCoordinate(),
      });
      setEaten(false);
    }
  }, [eaten]);

  return (
    <div className="gameboard">
      <Apples coords={coords} eaten={eaten}></Apples>
      <Snake
        setGameover={setGameover}
        appleCoords={coords}
        eatApple={() => { setEaten(true); }}
      ></Snake>
    </div>
  )
}

export default Gameboard;
