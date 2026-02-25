import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  const startGame = () => {
    if (!selectedLevel || !selectedOperation) return;

    navigate(`/game/${selectedOperation}?level=${selectedLevel}`);
  };

  return (
    <div className="menu-container">
      <h1>Eductaors</h1>
      <h2 className="title">📚 اختر المرحلة الدراسية</h2>

      {/* LEVELS */}
      <div className="levels-container">
        <div
          className={`level-card ${selectedLevel === "1-5" ? "active" : ""}`}
          onClick={() => setSelectedLevel("1-5")}
        >
          <h3>الصف الأول – الصف الخامس</h3>
          <p>أساسيات الجمع والطرح والضرب</p>
        </div>

        <div
          className={`level-card ${selectedLevel === "6-9" ? "active" : ""}`}
          onClick={() => setSelectedLevel("6-9")}
        >
          <h3>الصف السادس – الصف التاسع</h3>
          <p>العمليات الأربع + مسائل من الحياة</p>
        </div>

        <div
          className={`level-card ${selectedLevel === "10-12" ? "active" : ""}`}
          onClick={() => setSelectedLevel("10-12")}
        >
          <h3>الصف العاشر – التوجيهي</h3>
          <p>رياضيات متقدمة وتفكير منطقي</p>
        </div>
      </div>

      {/* OPERATIONS */}
      <h2 className="title">🧮 اختر العملية</h2>

      <div className="buttons">
        <button
          className={selectedOperation === "add" ? "active" : ""}
          onClick={() => setSelectedOperation("add")}
        >
          ➕ Addition (جمع)
        </button>

        <button
          className={selectedOperation === "sub" ? "active" : ""}
          onClick={() => setSelectedOperation("sub")}
        >
          ➖ Subtraction (طرح)
        </button>

        <button
          className={selectedOperation === "mul" ? "active" : ""}
          onClick={() => setSelectedOperation("mul")}
        >
          ✖️ Multiplication (ضرب)
        </button>

        <button
          className={selectedOperation === "div" ? "active" : ""}
          onClick={() => setSelectedOperation("div")}
        >
          ➗ Division (قسمة)
        </button>
      </div>

      {/* START BUTTON */}
      <button
        className="start-btn"
        disabled={!selectedLevel || !selectedOperation}
        onClick={startGame}
      >
        🚀 ابدأ اللعبة
      </button>
    </div>
  );
};

export default MainMenu;
