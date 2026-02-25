import { useState } from "react";
import "./LongOperation.css";

const AdditionTool = ({ num1, num2 }) => {
  const digits1 = num1.toString().split("");
  const digits2 = num2.toString().split("");
  const maxLength = Math.max(digits1.length, digits2.length);
  const [topValue, setTopValue] = useState("");
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");

  const handleClear = () => {
    setTopValue("");
    setResult1("");
    setResult2("");
    setResult3("");
  };
  return (
    <div className="long-op">
      {Number(digits1[1]) + Number(digits2[1]) >= 10 && (
        <div className="row">
          <input
            type="text"
            className="cell result"
            value={topValue}
            onChange={(e) => setTopValue(e.target.value)}
          />
          <p className="cell result"></p>
        </div>
      )}
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[0] > digits1[0]
              ? digits2[i - (maxLength - digits1.length)] || ""
              : digits1[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <div className="operation">➕</div>
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[0] > digits1[0]
              ? digits1[i - (maxLength - digits1.length)] || ""
              : digits2[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>
      <hr />
      <div className="row">
        <input
          className="cell result"
          value={result1}
          onChange={(e) => {
            setResult1(e.target.value);
          }}
        />
        <input
          className="cell result"
          value={result2}
          onChange={(e) => {
            setResult2(e.target.value);
          }}
        />
        <input
          className="cell result"
          value={result3}
          onChange={(e) => {
            setResult3(e.target.value);
          }}
        />
        <p className="cell result"></p>
      </div>
      <button className="clearBTN" onClick={handleClear}>
        clear
      </button>
    </div>
  );
};

export default AdditionTool;
