import React, { useEffect, useState } from "react";
import Calculate from "./Calculate";
import "./style.css";

const BuildMatrix = () => {
  const [length, setLength] = useState(2);
  const [breadth, setBreadth] = useState(2);

  const getLength = (e) => {
    setLength(e.target.value);
  };

  const getBreadth = (e) => {
    setBreadth(e.target.value);
  };

  useEffect(() => {
    if (length > 10 || breadth > 10) {
      alert("Length and Breadth should be less than 10");
      setLength(2);
      setBreadth(2);
    }
  }, [length, breadth]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Rows"
          name="length"
          value={length}
          onChange={(e) => getLength(e)}
        />
        <input
          type="number"
          placeholder="Columns"
          name="breadth"
          value={breadth}
          onChange={(e) => getBreadth(e)}
        />
      </form>
      <Calculate length={length} breadth={breadth} />
    </div>
  );
};

export default BuildMatrix;
