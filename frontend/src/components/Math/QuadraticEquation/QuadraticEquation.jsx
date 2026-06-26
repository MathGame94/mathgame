import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

// ── Design tokens ─────────────────────────────────────
const COLORS = {
  paper: "#FBF7F0",
  paperAlt: "#F3ECE0",
  ink: "#2A2730",
  inkLight: "#6B6470",
  chalk: "#3D6B8A",
  chalkBg: "#E8F0F4",
  coral: "#D9695A",
  coralBg: "#FBEAE7",
  sage: "#5B8266",
  sageBg: "#EAF1EC",
  gold: "#C99A4B",
  goldBg: "#FAF1E0",
  border: "#E5DDD0",
};

const TYPES = [
  {
    id: "diff-squares",
    icon: "²−²",
    color: COLORS.sage,
    bg: COLORS.sageBg,
    title: "فرق مربعين",
    summary: "معادلات على الصورة a²x² − b² = 0",
    explanation:
      "فرق مربعين هو حالة خاصة من المعادلة التربيعية لا يحتوي فيها على حد بـ x (أي b = 0). يمكن تحليل الطرف الأيسر مباشرة باستخدام قانون فرق المربعين دون الحاجة للقانون العام.",
    formula: "a²x² − b² = (ax − b)(ax + b)",
    steps: [
      "تأكد أن المعادلة على الصورة x² − k = 0 (لا يوجد حد بـ x)",
      "اكتب k على صورة مربع كامل: k = b²",
      "حلّل باستخدام فرق المربعين: (x − b)(x + b) = 0",
      "اجعل كل عامل يساوي صفر واحسب القيمتين",
    ],
    link: "exampleDiffSquares",
  },
  {
    id: "a-equals-1",
    icon: "x²",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "معامل x² يساوي 1",
    summary: "معادلات على الصورة x² + bx + c = 0",
    explanation:
      "في هذه الحالة يكون معامل الحد التربيعي (a) يساوي 1، وهذا يسهّل عملية التحليل لأننا نبحث فقط عن رقمين حاصل ضربهما c ومجموعهما b.",
    formula: "x² + bx + c = (x + m)(x + n)",
    steps: [
      "ابحث عن رقمين m و n بحيث: m × n = c و m + n = b",
      "اكتب المعادلة على صورة العاملين: (x + m)(x + n) = 0",
      "اجعل كل عامل يساوي صفر",
      "احسب قيمتي x من كل معادلة بسيطة",
    ],
        link: "exampleAEquals1",

  },
  {
    id: "a-greater-1",
    icon: "ax²",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "معامل x² أكبر من 1",
    summary: "معادلات على الصورة ax² + bx + c = 0 حيث a > 1",
    explanation:
      "هنا يكون معامل الحد التربيعي (a) أكبر من 1، وغالباً يكون التحليل المباشر أصعب، فنستخدم القانون العام أو التحليل بطريقة الحد المتوسط (تجزئة b).",
    formula: "x = (−b ± √(b² − 4ac)) / 2a",
    steps: [
      "حدد قيم a و b و c من المعادلة",
      "احسب التمييز: Δ = b² − 4ac",
      "إذا كان Δ ≥ 0، عوّض القيم في القانون العام",
      "احسب الجذرين (أو الجذر الواحد إذا Δ = 0)",
    ],
    link: "exampleAGreaterThan1"
  },
];

// ── Quiz questions: identify type + extract a, b, c ──
const QUIZ = [
  { equation: "x² − 9 = 0", correctType: "diff-squares", a: 1, b: 0, c: -9 },
  { equation: "x² + 5x + 6 = 0", correctType: "a-equals-1", a: 1, b: 5, c: 6 },
  {
    equation: "3x² + 7x − 2 = 0",
    correctType: "a-greater-1",
    a: 3,
    b: 7,
    c: -2,
  },
  { equation: "4x² − 25 = 0", correctType: "diff-squares", a: 4, b: 0, c: -25 },
  { equation: "x² − 4x + 4 = 0", correctType: "a-equals-1", a: 1, b: -4, c: 4 },
  {
    equation: "2x² − 3x + 1 = 0",
    correctType: "a-greater-1",
    a: 2,
    b: -3,
    c: 1,
  },
];

export default function QuadraticEquation({ onExamples }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const active = TYPES.find((t) => t.id === selected);

  // ── Quiz state ──
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [coeffInputs, setCoeffInputs] = useState({ a: "", b: "", c: "" });
  const [coeffStatus, setCoeffStatus] = useState({ a: null, b: null, c: null });

  const quiz = QUIZ[quizIndex];

  const handleQuizAnswer = (typeId) => {
    setQuizAnswer(typeId);
    setShowQuizResult(true);
    setCoeffInputs({ a: "", b: "", c: "" });
    setCoeffStatus({ a: null, b: null, c: null });
  };

  const handleCoeffChange = (key, value) => {
    setCoeffInputs((prev) => ({ ...prev, [key]: value }));

    if (value === "") {
      setCoeffStatus((prev) => ({ ...prev, [key]: null }));
      return;
    }

    const num = Number(value);
    const correct = quiz[key];
    setCoeffStatus((prev) => ({
      ...prev,
      [key]: num === correct ? "correct" : "wrong",
    }));
  };

  const nextQuiz = () => {
    setQuizIndex((quizIndex + 1) % QUIZ.length);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setCoeffInputs({ a: "", b: "", c: "" });
    setCoeffStatus({ a: null, b: null, c: null });
  };

  const isTypeCorrect = quizAnswer === quiz.correctType;
  const allCoeffsCorrect =
    coeffStatus.a === "correct" &&
    coeffStatus.b === "correct" &&
    coeffStatus.c === "correct";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ── Header ── */}
        <div style={styles.eyebrow}>الدرس الثاني · الجبر</div>
        <h1 style={styles.h1}>المعادلة التربيعية</h1>
        <p style={styles.lede}>
          المعادلة التربيعية هي معادلة من الدرجة الثانية في مجهول واحد، تُكتب
          على الصورة
          <span style={styles.inlineFormula}> ax² + bx + c = 0 </span>
          حيث a ≠ 0. تختلف طريقة حلها باختلاف شكلها — اختر النوع لمعرفة طريقة
          الحل المناسبة له.
        </p>

        {/* ── Three type cards ── */}
        <div style={styles.typesGrid}>
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(selected === t.id ? null : t.id)}
              style={{
                ...styles.typeCard,
                background: selected === t.id ? t.bg : "#fff",
                borderColor: selected === t.id ? t.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: t.color }}>{t.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{t.title}</h3>
                <p style={styles.typeSummary}>{t.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: t.color }}>
                {selected === t.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content for the selected type ── */}
        {active && (
          <div style={{ ...styles.detailCard, borderColor: active.color }}>
            {/* Explanation */}
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>الشرح</p>
              <p style={styles.detailText}>{active.explanation}</p>
            </div>

            {/* Formula */}
            <div style={{ ...styles.formulaBox, background: active.bg }}>
              <span style={{ ...styles.formulaText, color: active.color }}>
                {active.formula}
              </span>
            </div>

            {/* Steps */}
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>طريقة الحل</p>
              <div style={styles.stepsList}>
                {active.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div
                      style={{ ...styles.stepBadge, background: active.color }}
                    >
                      {i + 1}
                    </div>
                    <p style={styles.stepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples button */}
            {/* Examples button */}
            <div style={styles.detailFooter}>
              <button
                onClick={() => navigate(`/${active.link}`)}
                style={{ ...styles.examplesBtn, background: active.color }}
              >
                الأمثلة ←
              </button>
            </div>
          </div>
        )}

        {/* ── Quiz: identify type and extract a, b, c ── */}
        <h2 style={{ ...styles.h2, marginTop: 36 }}>اختبر نفسك</h2>
        <div style={styles.quizCard}>
          <p style={styles.quizHint}>
            حدد نوع المعادلة، ثم استخرج قيم a و b و c
          </p>

          <div style={styles.quizEquationBox}>
            <span style={styles.quizEquation}>{quiz.equation}</span>
          </div>

          {/* Type buttons */}
          <div style={styles.quizTypesRow}>
            {TYPES.map((t) => {
              const isCorrect = t.id === quiz.correctType;
              const isChosen = quizAnswer === t.id;
              let bg = "#fff";
              let border = COLORS.border;
              let color = COLORS.ink;

              if (showQuizResult) {
                if (isCorrect) {
                  bg = COLORS.sageBg;
                  border = COLORS.sage;
                  color = COLORS.sage;
                } else if (isChosen) {
                  bg = COLORS.coralBg;
                  border = COLORS.coral;
                  color = COLORS.coral;
                }
              }

              return (
                <button
                  key={t.id}
                  onClick={() => !showQuizResult && handleQuizAnswer(t.id)}
                  disabled={showQuizResult}
                  style={{
                    ...styles.quizTypeBtn,
                    background: bg,
                    borderColor: border,
                    color,
                    cursor: showQuizResult ? "default" : "pointer",
                  }}
                >
                  {t.title}
                  {showQuizResult && isCorrect && " ✓"}
                  {showQuizResult && isChosen && !isCorrect && " ✗"}
                </button>
              );
            })}
          </div>

          {/* a, b, c inputs — shown once a type is chosen */}
          {showQuizResult && (
            <div style={styles.quizCoeffSection}>
              <p style={styles.quizCoeffHint}>
                {isTypeCorrect
                  ? "جيد! الآن حدد قيم a و b و c من المعادلة:"
                  : "حاول استخراج a و b و c من المعادلة مع ذلك:"}
              </p>
              <div style={styles.quizCoeffRow}>
                <CoeffInput
                  letter="a"
                  value={coeffInputs.a}
                  status={coeffStatus.a}
                  onChange={(v) => handleCoeffChange("a", v)}
                  hint="الرقم جنب x² هو a"
                  color={COLORS.chalk}
                />
                <CoeffInput
                  letter="b"
                  value={coeffInputs.b}
                  status={coeffStatus.b}
                  onChange={(v) => handleCoeffChange("b", v)}
                  hint="الرقم جنب x هو b"
                  color={COLORS.chalk}
                />
                <CoeffInput
                  letter="c"
                  value={coeffInputs.c}
                  status={coeffStatus.c}
                  onChange={(v) => handleCoeffChange("c", v)}
                  hint="الحد الثابت (بدون x) هو c"
                  color={COLORS.chalk}
                />
              </div>

              {allCoeffsCorrect && (
                <div style={styles.quizSuccessBanner}>
                  ✓ ممتاز! جميع القيم صحيحة
                </div>
              )}
            </div>
          )}

          {showQuizResult && (
            <button onClick={nextQuiz} style={styles.quizNextBtn}>
              السؤال التالي ←
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CoeffInput({ letter, value, status, onChange, hint, color }) {
  let borderColor = COLORS.border;
  let bg = "#fff";
  if (status === "correct") {
    borderColor = COLORS.sage;
    bg = COLORS.sageBg;
  }
  if (status === "wrong") {
    borderColor = COLORS.coral;
    bg = COLORS.coralBg;
  }

  return (
    <div style={styles.coeffInputBox}>
      <span style={{ ...styles.coeffLetter, color }}>{letter} =</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...styles.coeffInputField,
          borderColor,
          background: bg,
        }}
      />
      {status === "correct" && <span style={styles.coeffFeedback}>✓ صحيح</span>}
      {status === "wrong" && (
        <span style={{ ...styles.coeffFeedback, color: COLORS.coral }}>
          {hint}
        </span>
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: COLORS.paper,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    padding: "32px 16px 60px",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
    width: "100%",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: COLORS.coral,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  h1: {
    fontFamily: "'Amiri', Georgia, serif",
    fontSize: "clamp(28px, 6vw, 40px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 14px",
  },
  lede: {
    fontSize: "clamp(14px, 2.6vw, 17px)",
    color: COLORS.inkLight,
    lineHeight: 1.9,
    margin: "0 0 28px",
  },
  inlineFormula: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    display: "inline-block",
    fontWeight: 700,
    color: COLORS.ink,
    padding: "0 4px",
  },

  // Type cards
  typesGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 4,
  },
  typeCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
    border: "2px solid",
    borderRadius: 16,
    padding: "16px 18px",
    cursor: "pointer",
    textAlign: "right",
    transition: "all 0.15s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  typeIcon: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: 700,
    flexShrink: 0,
    width: 56,
    height: 56,
    borderRadius: 12,
    background: "rgba(0,0,0,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  typeTextBox: {
    flex: 1,
    minWidth: 0,
  },
  typeTitle: {
    margin: 0,
    fontSize: "clamp(15px, 3vw, 18px)",
    fontWeight: 700,
    color: COLORS.ink,
  },
  typeSummary: {
    margin: "4px 0 0",
    fontSize: "clamp(12px, 2.5vw, 13px)",
    color: COLORS.inkLight,
    fontFamily: "Georgia, serif",
    direction: "ltr",
    display: "inline-block",
  },
  typeChevron: {
    fontSize: 14,
    flexShrink: 0,
  },

  // Detail / expanded content
  detailCard: {
    background: "#fff",
    border: "2px solid",
    borderRadius: 16,
    marginTop: 16,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    animation: "fadeIn 0.2s ease",
  },
  detailSection: {
    padding: "20px 22px",
  },
  detailLabel: {
    margin: "0 0 10px",
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.inkLight,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  detailText: {
    margin: 0,
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 1.9,
  },

  formulaBox: {
    margin: "0 22px",
    borderRadius: 12,
    padding: "16px 20px",
    textAlign: "center",
  },
  formulaText: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(16px, 4vw, 22px)",
    fontWeight: 700,
    display: "inline-block",
  },

  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  stepRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepText: {
    margin: 0,
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 1.7,
  },

  detailFooter: {
    padding: "18px 22px 22px",
    display: "flex",
    justifyContent: "flex-start",
    borderTop: `1px solid ${COLORS.border}`,
    marginTop: 4,
  },
  examplesBtn: {
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 26px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },

  // Quiz
  quizCard: {
    background: "#fff",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "clamp(16px, 4vw, 28px)",
    marginBottom: 24,
  },
  quizHint: {
    fontSize: 13,
    color: COLORS.inkLight,
    margin: "0 0 16px",
  },
  quizEquationBox: {
    background: COLORS.paperAlt,
    borderRadius: 12,
    padding: "18px",
    textAlign: "center",
    marginBottom: 18,
  },
  quizEquation: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(18px, 4.5vw, 26px)",
    fontWeight: 700,
    color: COLORS.ink,
  },
  quizTypesRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 4,
  },
  quizTypeBtn: {
    border: "2px solid",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    textAlign: "right",
    transition: "all 0.15s",
  },
  quizCoeffSection: {
    marginTop: 18,
    paddingTop: 18,
    borderTop: `1px dashed ${COLORS.border}`,
  },
  quizCoeffHint: {
    fontSize: 13,
    color: COLORS.inkLight,
    margin: "0 0 12px",
  },
  quizCoeffRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  coeffInputBox: {
    flex: 1,
    minWidth: 90,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  coeffLetter: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: 14,
    fontWeight: 700,
  },
  coeffInputField: {
    width: "100%",
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    border: "2px solid",
    borderRadius: 10,
    padding: "8px 4px",
    outline: "none",
    boxSizing: "border-box",
  },
  coeffFeedback: {
    fontSize: 11,
    color: COLORS.sage,
    fontWeight: 600,
    textAlign: "center",
    lineHeight: 1.4,
  },
  quizSuccessBanner: {
    marginTop: 14,
    background: COLORS.sageBg,
    color: COLORS.sage,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 700,
    textAlign: "center",
  },

  quizNextBtn: {
    display: "block",
    width: "100%",
    marginTop: 18,
    background: COLORS.ink,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
};
