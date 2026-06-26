import { useState } from "react";
import { colors, styles, responsive } from "../styles/theme";
import { lesson } from "../data/lesson";

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "").replace(/،/g, ",").replace(/−/g, "-");
}

function checkAnswer(input, accepted) {
  const n = normalize(input);
  return accepted.some(a => n.includes(normalize(a)));
}

function StepItem({ step, index, isLocked, result, inputValue, onInput, onCheck, showHint, onToggleHint }) {
  const answered = result !== undefined;

  return (
    <div style={{
      ...styles.card,
      opacity: isLocked ? 0.4 : 1,
      border: answered
        ? `1.5px solid ${result ? "#4caf50" : colors.softCoral}88`
        : `1.5px solid ${colors.border}`,
      transition: "all 0.3s",
      marginBottom: "14px",
    }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        {/* رقم الخطوة */}
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
          background: answered ? (result ? "#4caf50" : colors.softCoral) : colors.warmAmber,
          color: "#fff", display: "flex", alignItems: "center",
          justifyContent: "center", fontWeight: "700", fontSize: "14px",
        }}>
          {answered ? (result ? "✓" : "✗") : index + 1}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: "700", color: colors.textDark, fontSize: "clamp(14px, 3vw, 15px)", marginBottom: "4px" }}>
            {step.label}
          </div>
          <div style={{ color: colors.textMed, fontSize: responsive.smallSize, marginBottom: "12px" }}>
            {step.prompt}
          </div>

          {!answered && !isLocked && (
            <>
              {/* Input + زر تحقق — بيصير عمود على الموبايل */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => onInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && onCheck()}
                  placeholder={step.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: `1.5px solid ${colors.border}`,
                    background: "#fffdf8",
                    fontSize: "clamp(13px, 3vw, 14px)",
                    fontFamily: "Georgia, serif",
                    color: colors.textDark,
                    outline: "none",
                    direction: "ltr",
                    boxSizing: "border-box",
                    minHeight: "44px",
                  }}
                  disabled={isLocked}
                />
                <button
                  style={{ ...styles.btn("sky"), width: "100%", textAlign: "center" }}
                  onClick={onCheck}
                  disabled={isLocked}
                >
                  تحقق من الإجابة
                </button>
              </div>

              <button
                onClick={onToggleHint}
                style={{
                  marginTop: "10px", background: "none", border: "none",
                  color: colors.textLight, fontSize: "12px", cursor: "pointer",
                  fontFamily: "inherit", padding: "4px 0", minHeight: "36px",
                }}
              >
                {showHint ? "إخفاء التلميح ▲" : "💡 أظهر تلميح ▼"}
              </button>

              {showHint && (
                <div style={{ marginTop: "4px", fontSize: responsive.smallSize, color: colors.warmAmber, fontWeight: "600" }}>
                  {step.hint}
                </div>
              )}
            </>
          )}

          {answered && (
            <div style={{
              background: result ? "#e8f7ee" : "#fdf0ec",
              border: `1px solid ${result ? "#b2d8be" : "#f0c4b0"}`,
              borderRadius: "8px", padding: "10px 14px",
              fontSize: responsive.smallSize,
              color: result ? "#2d6a2d" : "#8b1a1a",
              fontWeight: "600",
              lineHeight: 1.5,
            }}>
              {result ? "✓ إجابة صحيحة!" : `✗ غير صحيح — ${step.explanation}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuestionPage() {
  const { question } = lesson;
  const steps = question.steps;

  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [showHint, setShowHint] = useState({});

  const allDone = steps.every(s => results[s.id] !== undefined);
  const score = steps.filter(s => results[s.id] === true).length;

  const handleCheck = (step) => {
    const correct = checkAnswer(inputs[step.id] || "", step.accepted);
    setResults(r => ({ ...r, [step.id]: correct }));
  };

  const handleReset = () => {
    setInputs({});
    setResults({});
    setShowHint({});
  };

  return (
    <div style={styles.page}>
      <h2 style={{ fontSize: responsive.headingSize, fontWeight: "800", color: colors.textDark, marginBottom: "6px" }}>
        التدريب
      </h2>

      {/* بطاقة السؤال */}
      <div style={{
        ...styles.card,
        background: colors.sky + "15",
        border: `1.5px solid ${colors.sky}44`,
        marginBottom: "24px",
      }}>
        <div style={{ fontSize: responsive.smallSize, color: colors.sky, fontWeight: "700", marginBottom: "6px" }}>
          السؤال
        </div>
        <div style={{
          fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "800",
          color: colors.textDark, direction: "ltr", fontFamily: "Georgia, serif",
          wordBreak: "break-word",
        }}>
          {question.problem}
        </div>
        <div style={{ fontSize: responsive.smallSize, color: colors.textMed, marginTop: "8px" }}>
          💡 {question.hint}
        </div>
      </div>

      {/* الخطوات */}
      {steps.map((step, si) => {
        const isLocked = si > 0 && results[steps[si - 1].id] !== true;
        return (
          <StepItem
            key={step.id}
            step={step}
            index={si}
            isLocked={isLocked}
            result={results[step.id]}
            inputValue={inputs[step.id] || ""}
            onInput={val => setInputs(i => ({ ...i, [step.id]: val }))}
            onCheck={() => handleCheck(step)}
            showHint={!!showHint[step.id]}
            onToggleHint={() => setShowHint(h => ({ ...h, [step.id]: !h[step.id] }))}
          />
        );
      })}

      {/* النتيجة النهائية */}
      {allDone && (
        <div style={{
          ...styles.card,
          background: score === steps.length ? "#e8f7ee" : colors.warmAmber + "18",
          border: `2px solid ${score === steps.length ? "#4caf50" : colors.warmAmber}`,
          textAlign: "center", marginTop: "8px",
        }}>
          <div style={{ fontSize: "clamp(32px, 10vw, 40px)", marginBottom: "8px" }}>
            {score === steps.length ? "🎉" : score >= 3 ? "👍" : "💪"}
          </div>
          <div style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: "800", color: colors.textDark, marginBottom: "4px" }}>
            {score}/{steps.length}
          </div>
          <div style={{ color: colors.textMed, fontSize: responsive.bodySize, marginBottom: "16px", lineHeight: 1.6 }}>
            {score === steps.length
              ? "ممتاز! أتقنت حل المعادلة التربيعية!"
              : score >= 3
              ? "عمل رائع! راجع الخطوات الخاطئة."
              : "حاول مرة أخرى بعد مراجعة الأمثلة."}
          </div>
          <button style={{ ...styles.btn("secondary"), width: "100%" }} onClick={handleReset}>
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
}
