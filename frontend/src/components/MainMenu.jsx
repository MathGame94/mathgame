import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  /* 🔊 Sounds */
  const clickSound = new Audio("/sound/CLICK.mp3");
  const startSound = new Audio("/sound/start.mp3");

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  /* 🚀 Start Game */
  const startGame = () => {
    if (!selectedLevel || !selectedOperation) return;

    startSound.play();
    document.body.classList.add("shake");

    setTimeout(() => {
      navigate(`/game/${selectedOperation}?level=${selectedLevel}`);
    }, 400);
  };

  /* 🖱️ Mouse Parallax */
  /*useEffect(() => {
    const move = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;

      const menu = document.querySelector(".menu-container");
      if (menu) {
        menu.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []); */

  return (
    <div className="menu-container">
      <h1>Educators</h1>

      <h2 className="title">📚 اختر المرحلة الدراسية</h2>

      {/* 🎴 LEVEL CARDS */}
      <div className="levels-container">
        {/* CARD 1 */}
        <div
          className={`level-card ${selectedLevel === "1-5" ? "active" : ""}`}
          onClick={() => {
            playClick();
            setSelectedLevel("1-5");
          }}
        >
          <div className="card-inner">
            <div className="card-front card1">
              <h3>Beginner level</h3>
              <h3>مستوى مبتدئ</h3>
            </div>

            <div className="card-back">
              <p>أساسيات الجمع والطرح والضرب والفسمة</p>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className={`level-card ${selectedLevel === "6-9" ? "active" : ""}`}
          onClick={() => {
            playClick();
            setSelectedLevel("6-9");
          }}
        >
          <div className="card-inner">
            <div className="card-front card2">
              <h3>Intermediate level</h3>
              <h3>مستوى متوسط</h3>
            </div>

            <div className="card-back">
              <p>الجمع والضرب والطرح والقسمة من منزلتين مع  منزلة واحدة</p>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div
          className={`level-card ${selectedLevel === "10-12" ? "active" : ""}`}
          onClick={() => {
            playClick();
            setSelectedLevel("10-12");
          }}
        >
          <div className="card-inner">
            <div className="card-front card3">
               <h3>Advance level</h3>
              <h3>مستوى متقدم</h3>
            </div>

            <div className="card-back">
              <p>الجمع والضرب والطرح والقسمة من منزلتين مع  منزلتين</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🧮 OPERATIONS */}
      <h2 className="title">🧮 اختر العملية</h2>

      <div className="buttons">
        <button
          className={selectedOperation === "add" ? "active" : ""}
          onClick={() => {
            playClick();
            setSelectedOperation("add");
          }}
        >
          ➕ جمع
        </button>

        <button
          className={selectedOperation === "sub" ? "active" : ""}
          onClick={() => {
            playClick();
            setSelectedOperation("sub");
          }}
        >
          ➖ طرح
        </button>

        <button
          className={selectedOperation === "mul" ? "active" : ""}
          onClick={() => {
            playClick();
            setSelectedOperation("mul");
          }}
        >
          ✖️ ضرب
        </button>

        <button
          className={selectedOperation === "div" ? "active" : ""}
          onClick={() => {
            playClick();
            setSelectedOperation("div");
          }}
        >
          ➗ قسمة
        </button>
      </div>

      {/* 🚀 START */}
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
