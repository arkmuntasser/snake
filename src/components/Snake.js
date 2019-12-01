import React, { useState, useEffect } from 'react';
import useInterval from '../hooks/useInterval';
import useKeyPress from '../hooks/useKeyPress';

function Snake({ setGameover, appleCoords, eatApple }) {
  const [counter, setCounter] = useState(0);
  const [length, setLength] = useState(6);
  const [bits, setBits] = useState([
    { x: 9, y: 9},
    { x: 9, y: 9},
    { x: 9, y: 9},
    { x: 9, y: 9},
    { x: 9, y: 9},
    { x: 9, y: 9},
    { x: 9, y: 9},
  ]);
  const [head, setHead] = useState({ x: 9, y: 9 });
  const [direction, setDirection] = useState(['x', -1]);
  const w = useKeyPress('w');
  const up = useKeyPress('ArrowUp');
  const s = useKeyPress('s');
  const down = useKeyPress('ArrowDown');
  const a = useKeyPress('a');
  const left = useKeyPress('ArrowLeft');
  const d = useKeyPress('d');
  const right = useKeyPress('ArrowRight');

  useEffect(() => {
    if (up || w) { setDirection(['y', -1]); }
    else if (down || s) { setDirection(['y', 1]); }
    else if (left || a) { setDirection(['x', -1]); }
    else if (right || d) { setDirection(['x', 1]); }
  }, [up, down, left, right, w, s, a, d]);

  useInterval(() => {
    setCounter(counter + 1);
    updateHead();
    updateBits();
    if (counter > 6) {
      checkForSelfCollision();
      checkForAppleCollision();
    }
  }, 100);

  function checkForSelfCollision() {
    const headless = bits.slice(1);
    const collidedWithSelf = headless.some(bit => (bit.x === head.x && bit.y === head.y));
    setGameover(collidedWithSelf);
  }

  function checkForAppleCollision() {
    if (head.x === appleCoords.x && head.y === appleCoords.y) {
      eatApple();
      setLength(length + 1);
    }
  }

  function updateBits() {
    const beets = [...bits];
    beets.reverse();
    beets.push(head);
    const updated = beets.reverse().slice(0, length);
    setBits(updated);
  }

  function updateHead() {
    const clone = { ...head };
    const [coordinate, vector] = direction;
    let newVector = clone[coordinate] + vector;
    newVector = newVector === -1 ? 16 : newVector === 17 ? 1 : newVector;
    clone[coordinate] = newVector
    setHead(clone);
  }

  return (
    <>
      {bits.map((bit, i) => (
        <div
          className="snake-bit"
          key={i}
          style={{ '--col': bit.x, '--row': bit.y }}
        ></div>
      ))}
    </>
  )
}

export default Snake;
