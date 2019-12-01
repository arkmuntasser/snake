import React from 'react';

function Apples({ coords, eaten }) {
  return (
    <div
      className="apple"
      disabled={eaten}
      style={{ '--row': coords.y, '--col': coords.x }}
    ></div>
  );
}

export default Apples;
