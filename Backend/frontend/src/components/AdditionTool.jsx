import "./LongOperation.css";

const AdditionTool = ({ num1, num2 }) => {
  const digits1 = num1.toString().split("");
  const digits2 = num2.toString().split("");
  const maxLength = Math.max(digits1.length, digits2.length);

  return (
    <div className="long-op">
      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits1[i - (maxLength - digits1.length)] || ""}
          </div>
        ))}
      </div>

      <div className="row">
        {Array.from({ length: maxLength }).map((_, i) => (
          <div key={i} className="digit">
            {digits2[i - (maxLength - digits2.length)] || ""}
          </div>
        ))}
      </div>

      <hr />

      <div className="row">
        {Array.from({ length: maxLength + 1 }).map((_, i) => (
          <input key={i} className="cell result" />
        ))}
      </div>
    </div>
  );
};

export default AdditionTool;
