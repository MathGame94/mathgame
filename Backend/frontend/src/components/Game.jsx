import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Game.css";

const Game = () => {
  const { operation } = useParams();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level"); // "1-5" | "6-9" | "10-12"

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [support, setSupport] = useState(false);
  // 🔢 RANGE BASED ON LEVEL
  const getMaxNumber = () => {
    if (level === "1-5") {
      setSupport("true");
      return 10;
    }
    if (level === "6-9") {
      setSupport(true);
      return 20;
    }
    return 50; // 10-12
  };

  const generateQuestion = () => {
    const max = getMaxNumber();

    if (operation !== "div") {
      const a = Math.floor(Math.random() * max) + 1;
      const b = Math.floor(Math.random() * max) + 1;

      setNum1(a);
      setNum2(b);
      setAnswer("");
    } else {
      // ✅ EXACT DIVISION
      const divisor = Math.floor(Math.random() * (max / 2)) + 1;
      const quotient = Math.floor(Math.random() * 10) + 1;
      const dividend = divisor * quotient;

      setNum1(dividend);
      setNum2(divisor);
      setAnswer("");
    }
  };

  useEffect(() => {
    generateQuestion();
  }, [operation, level]);

  const getCorrectAnswer = () => {
    switch (operation) {
      case "add":
        return num1 + num2;
      case "sub":
        return num1 - num2;
      case "mul":
        return num1 * num2;
      case "div":
        return num1 / num2;
      default:
        return 0;
    }
  };

  const getExplain = () => {
    switch (operation) {
      case "add":
        return `ضع الرقم ${Math.max(num1, num2)} في عقلك وضع الرقم ${Math.min(
          num1,
          num2,
        )} على يدك ثم ابدأ بالعد تصاعديا`;
      case "sub":
        return `ضع الرقم ${Math.max(num1, num2)} في عقلك واطرح ${Math.min(
          num1,
          num2,
        )} منه تدريجيا`;
      case "mul":
        return `قم بجمع ${Math.max(num1, num2)} بنفسه ${Math.min(
          num1,
          num2,
        )} مرات`;
      case "div":
        return `الرقم ${Math.max(num1, num2)} كم ${Math.min(num1, num2)} فيه`;
      default:
        return "";
    }
  };

  const getHint = () => {
    switch (operation) {
      case "add":
        return "➕احفظ رقم في عقلك والرقم الاخر في يدك ثم ابدأ بالعد تصاعديا";
      case "sub":
        return "➖احفظ رقم في عقلك والرقم الاخر في يدك ثم ابدأ بالعد تنازليا";
      case "mul":
        return "✖️ اجمع الرقم الاول بنفسه عدة مرات تساوي الرقم الثاني";
      case "div":
        return "➗ اسال نفيك الرقم الكبير كم مرة يحتوي على الرقم الصغير ";
      default:
        return "";
    }
  };
    const getHigherHint = () => {
    switch (operation) {
      case "add":
        return "➕ استخدم الجمع الطويل (تكتب الارقام تحت  بعضها) او استخدم الجمع الذهني (فصل الخانات)" ;
      case "sub":
        return "➖استخدم الطرح الطويل (تكتب الارقام تحت  بعضها ولا تنسى الاستلاف) او استخدم الطرح الذهني (فصل الخانات)";
      case "mul":
        return "✖️ استخدم الضرب الطويل";
      case "div":
        return "➗ استخدم القسمة الطويلة ";
      default:
        return "";
    }
  };


  const getOperationSymbol = () => {
    switch (operation) {
      case "add":
        return "+";
      case "sub":
        return "-";
      case "mul":
        return "×";
      case "div":
        return "÷";
      default:
        return "?";
    }
  };

  const checkAnswer = () => {
    if (Number(answer) === getCorrectAnswer()) {
      setScore((prev) => prev + 1);
      setMessage("✅ Correct!");

      setTimeout(() => {
        generateQuestion();
        setMessage("");
      }, 1000);
    } else {
      setMessage("❌ Wrong!");
    }
  };

return (
  <div className="game-page">
    <div className="game-card">
      {/* HEADER */}
      <div className="game-header">
        <h2>🧮 Math Game</h2>
        <span className="score">Correct: {score}</span>
      </div>

      {/* HINT */}
      {support && (
        <section className="hint-box">
          <h4>💡 Hint</h4>
          <p>{getHint()}</p>
        </section>
      )}
      {!support && (
        <section className="hint-box">
          <h4>💡 Hint</h4>
          <p>{getHigherHint()}</p>
        </section>
      )}

      {/* QUESTION */}
      <div className="question-box">
        <span>{Math.max(num1, num2)}</span>
        <span className="op">{getOperationSymbol()}</span>
        <span>{Math.min(num1, num2)}</span>
      </div>

      {/* EXPLAIN */}
      {support && (
        <div className="explain-box">
          <p>{getExplain()}</p>
        </div>
      )}

      {/* ✅ LONG OPERATION TOOLS */}
      {!support && operation === "add" && <AdditionTool num1={num1} num2={num2} />}
      {!support && operation === "sub" && <SubtractionTool num1={num1} num2={num2} />}
      {!support && operation === "mul" && <MultiplicationTool num1={num1} num2={num2} />}
      {!support && operation === "div" && <DivisionTool num1={num1} num2={num2} />}

      {/* INPUT */}
      <div className="answer-box">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button onClick={checkAnswer}>Check</button>
      </div>

      {/* MESSAGE */}
      <p className="message">{message}</p>
    </div>
  </div>
);
};

export default Game;
