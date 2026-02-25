import "./LongOperation.css";

const DivisionTool = ({ num1, num2 }) => {
  return (
    <div className="long-op">
      <div className="row">
        <div className="digit"> {num1} ÷ {num2} </div>
      </div>

      <hr />

      {/* خطوات القسمة */}
      <div className="row">
        <input className="cell step" placeholder="المقسوم" />
      </div>
      <div className="row">
        <input className="cell step" placeholder="المقسوم عليه" />
      </div>
      <div className="row">
        <input className="cell step" placeholder="النتيجة" />
      </div>
    </div>
  );
};

export default DivisionTool;
