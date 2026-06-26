import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  plum: "#8A5A8C",
  plumBg: "#F1E7F1",
  border: "#E5DDD0",
};

// ── The 4 shapes ──────────────────────────────────────
const SHAPES = [
  {
    id: "rect",
    icon: "▭",
    color: COLORS.sage,
    bg: COLORS.sageBg,
    title: "المربع والمستطيل",
    summary: "المساحة = الطول × العرض",
    explanation:
      "المستطيل شكل رباعي زواياه قائمة. مساحته تُحسب بضرب طوله في عرضه. المربع هو مستطيل خاص أضلاعه الأربعة متساوية، فمساحته تساوي الضلع مضروباً في نفسه.",
    formula: "المستطيل: م = ط × ع\nالمربع: م = ض × ض = ض²",
    steps: [
      "حدد طول المستطيل (ط) وعرضه (ع)",
      "اضرب الطول في العرض",
      "الناتج هو المساحة بالوحدة المربعة",
      "للمربع: اضرب طول الضلع في نفسه (ض²)",
    ],
    link: "exampleRect",
  },
  {
    id: "triangle",
    icon: "△",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "المثلث",
    summary: "المساحة = (القاعدة × الارتفاع) ÷ 2",
    explanation:
      "مساحة المثلث تساوي نصف حاصل ضرب قاعدته في ارتفاعه. الارتفاع هو الخط العمودي من الرأس إلى القاعدة، وليس بالضرورة ضلعاً في المثلث.",
    formula: "م = (ق × ا) ÷ 2",
    steps: [
      "حدد طول القاعدة (ق)",
      "حدد الارتفاع العمودي (ا) — وليس الضلع المائل",
      "اضرب القاعدة في الارتفاع",
      "اقسم الناتج على 2",
    ],
    link: "exampleTriangle",
  },
  {
    id: "circle",
    icon: "○",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "الدائرة",
    summary: "المساحة = π × نق²",
    explanation:
      "مساحة الدائرة تُحسب بضرب ثابت باي (π ≈ 3.14) في مربع نصف القطر. نصف القطر هو المسافة من مركز الدائرة إلى أي نقطة على محيطها، وهو نصف القطر الكامل.",
    formula: "م = π × نق²",
    steps: [
      "حدد نصف القطر (نق) — نصف القطر الكامل",
      "احسب مربع نصف القطر (نق × نق)",
      "اضرب الناتج في π (≈ 3.14)",
      "الناتج هو المساحة بالوحدة المربعة",
    ],
    link: "exampleCircle",
  },
  {
    id: "trapezoid",
    icon: "⏢",
    color: COLORS.plum,
    bg: COLORS.plumBg,
    title: "شبه المنحرف",
    summary: "المساحة = ((ق١ + ق٢) × ا) ÷ 2",
    explanation:
      "شبه المنحرف شكل رباعي فيه ضلعان متوازيان يُسميان القاعدتين (ق١ وق٢). مساحته تساوي نصف مجموع القاعدتين مضروباً في الارتفاع العمودي بينهما.",
    formula: "م = ((ق١ + ق٢) × ا) ÷ 2",
    steps: [
      "حدد طول القاعدة الكبرى (ق١) والقاعدة الصغرى (ق٢)",
      "اجمع القاعدتين معاً",
      "اضرب المجموع في الارتفاع (ا)",
      "اقسم الناتج على 2",
    ],
    link: "exampleTrapezoid",
  },
];

// ── Quiz ──────────────────────────────────────────────
const QUIZ = [
  {
    shape: "rect",
    question: "مستطيل طوله 6 سم وعرضه 4 سم. ما مساحته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "(ق × ا) ÷ 2", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "ط × ع",
      },
      {
        label: "المساحة بالسم²",
        options: ["10", "20", "24", "36"],
        correct: "24",
      },
    ],
  },
  {
    shape: "triangle",
    question: "مثلث قاعدته 8 سم وارتفاعه 5 سم. ما مساحته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "(ق × ا) ÷ 2", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "(ق × ا) ÷ 2",
      },
      {
        label: "المساحة بالسم²",
        options: ["13", "20", "40", "80"],
        correct: "20",
      },
    ],
  },
  {
    shape: "circle",
    question: "دائرة نصف قطرها 7 سم. ما مساحتها؟ (π ≈ 3.14)",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "(ق × ا) ÷ 2", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "π × نق²",
      },
      {
        label: "المساحة بالسم² (تقريباً)",
        options: ["43.96", "153.86", "44", "21.98"],
        correct: "153.86",
      },
    ],
  },
  {
    shape: "trapezoid",
    question: "شبه منحرف قاعدتاه 10 سم و6 سم وارتفاعه 4 سم. ما مساحته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "(ق × ا) ÷ 2", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "((ق١ + ق٢) × ا) ÷ 2",
      },
      {
        label: "المساحة بالسم²",
        options: ["24", "32", "40", "64"],
        correct: "32",
      },
    ],
  },
  {
    shape: "rect",
    question: "مربع طول ضلعه 9 سم. ما مساحته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "ض²", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "ض²",
      },
      {
        label: "المساحة بالسم²",
        options: ["18", "36", "81", "72"],
        correct: "81",
      },
    ],
  },
  {
    shape: "triangle",
    question: "مثلث قاعدته 12 سم وارتفاعه 7 سم. ما مساحته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["ط × ع", "(ق × ا) ÷ 2", "π × نق²", "((ق١ + ق٢) × ا) ÷ 2"],
        correct: "(ق × ا) ÷ 2",
      },
      {
        label: "المساحة بالسم²",
        options: ["19", "42", "84", "48"],
        correct: "42",
      },
    ],
  },
];

const SHAPE_LABELS = {
  rect: "مربع/مستطيل",
  triangle: "مثلث",
  circle: "دائرة",
  trapezoid: "شبه منحرف",
};

export default function Areas() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const activeShape = SHAPES.find((s) => s.id === expanded);

  // ── Quiz state ──
  const [quizIndex, setQuizIndex] = useState(0);
  const [partAnswers, setPartAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const quiz = QUIZ[quizIndex];

  const setPartAnswer = (partIdx, option) => {
    if (checked) return;
    setPartAnswers((prev) => ({ ...prev, [partIdx]: option }));
  };

  const allAnswered = quiz.parts.every((_, i) => partAnswers[i] !== undefined);

  const handleCheck = () => {
    if (!allAnswered) return;
    setChecked(true);
  };

  const nextQuiz = () => {
    setQuizIndex((quizIndex + 1) % QUIZ.length);
    setPartAnswers({});
    setChecked(false);
  };

  const isPartCorrect = (partIdx) => partAnswers[partIdx] === quiz.parts[partIdx].correct;
  const allCorrect = checked && quiz.parts.every((_, i) => isPartCorrect(i));

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ── Header ── */}
        <div style={styles.eyebrow}>الهندسة · المساحات</div>
        <h1 style={styles.h1}>مساحة الأشكال الهندسية</h1>
        <p style={styles.lede}>
          مساحة الشكل الهندسي هي المقدار الذي يشغله الشكل من السطح، وتُقاس
          بالوحدة المربعة (سم²، م²...). لكل شكل قانون خاص لحساب مساحته — اختر
          الشكل للاطلاع على قانونه وطريقة حساب مساحته.
        </p>

        {/* ── Four shape cards ── */}
        <div style={styles.typesGrid}>
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              style={{
                ...styles.typeCard,
                background: expanded === s.id ? s.bg : "#fff",
                borderColor: expanded === s.id ? s.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: s.color }}>{s.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{s.title}</h3>
                <p style={styles.typeSummary}>{s.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: s.color }}>
                {expanded === s.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content ── */}
        {activeShape && (
          <div style={{ ...styles.detailCard, borderColor: activeShape.color }}>
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>الشرح</p>
              <p style={styles.detailText}>{activeShape.explanation}</p>
            </div>

            <div style={{ ...styles.formulaBox, background: activeShape.bg }}>
              <span style={{ ...styles.formulaText, color: activeShape.color }}>
                {activeShape.formula}
              </span>
            </div>

            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>خطوات الحساب</p>
              <div style={styles.stepsList}>
                {activeShape.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div style={{ ...styles.stepBadge, background: activeShape.color }}>
                      {i + 1}
                    </div>
                    <p style={styles.stepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailFooter}>
              <button
                onClick={() => navigate(`/${activeShape.link}`)}
                style={{ ...styles.examplesBtn, background: activeShape.color }}
              >
                الأمثلة ←
              </button>
            </div>
          </div>
        )}

        {/* ── Quiz ── */}
        <h2 style={{ ...styles.h2, marginTop: 36 }}>اختبر نفسك</h2>
        <div style={styles.quizCard}>
          <div style={styles.quizShapeTag}>
            <span style={{
              ...styles.shapeChip,
              background: SHAPES.find(s => s.id === quiz.shape)?.bg,
              color: SHAPES.find(s => s.id === quiz.shape)?.color,
              borderColor: SHAPES.find(s => s.id === quiz.shape)?.color,
            }}>
              {SHAPES.find(s => s.id === quiz.shape)?.icon} {SHAPE_LABELS[quiz.shape]}
            </span>
          </div>

          <div style={styles.quizEquationBox}>
            <span style={styles.quizEquation}>{quiz.question}</span>
          </div>

          <div style={styles.partsList}>
            {quiz.parts.map((part, i) => {
              const chosen = partAnswers[i];
              const correct = checked && isPartCorrect(i);
              const wrong = checked && !isPartCorrect(i);

              return (
                <div
                  key={i}
                  style={{
                    ...styles.partCard,
                    borderColor: correct ? COLORS.sage : wrong ? COLORS.coral : COLORS.border,
                    background: correct ? COLORS.sageBg : wrong ? COLORS.coralBg : COLORS.paperAlt,
                  }}
                >
                  <div style={styles.partHeader}>
                    <span style={styles.partLabel}>{part.label}</span>
                    {checked && (
                      <span style={{ ...styles.partResultIcon, color: correct ? COLORS.sage : COLORS.coral }}>
                        {correct ? "✓" : "✗"}
                      </span>
                    )}
                  </div>

                  <div style={styles.chipsRow}>
                    {part.options.map((opt) => {
                      const isChosen = chosen === opt;
                      const isCorrectOpt = checked && opt === part.correct;
                      const isWrongChosen = checked && isChosen && opt !== part.correct;
                      return (
                        <button
                          key={opt}
                          onClick={() => setPartAnswer(i, opt)}
                          disabled={checked}
                          style={{
                            ...styles.chip,
                            background: isCorrectOpt
                              ? COLORS.sage
                              : isWrongChosen
                              ? COLORS.coral
                              : isChosen
                              ? COLORS.chalk
                              : "#fff",
                            color: isCorrectOpt || isWrongChosen || isChosen ? "#fff" : COLORS.ink,
                            borderColor: isCorrectOpt
                              ? COLORS.sage
                              : isWrongChosen
                              ? COLORS.coral
                              : isChosen
                              ? COLORS.chalk
                              : COLORS.border,
                            cursor: checked ? "default" : "pointer",
                            fontFamily: "Georgia, serif",
                            direction: "ltr",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {wrong && (
                    <div style={styles.partHint}>
                      💡 الإجابة الصحيحة: <strong>{part.correct}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={!allAnswered}
              style={{
                ...styles.quizCheckBtn,
                opacity: allAnswered ? 1 : 0.5,
                cursor: allAnswered ? "pointer" : "default",
              }}
            >
              تحقق من الإجابات
            </button>
          ) : (
            <>
              {allCorrect && (
                <div style={styles.quizSuccessBanner}>
                  ✓ ممتاز! أجبت بشكل صحيح
                </div>
              )}
              <button onClick={nextQuiz} style={styles.quizNextBtn}>
                السؤال التالي ←
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────
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
  h2: {
    fontFamily: "'Amiri', Georgia, serif",
    fontSize: "clamp(20px, 4.5vw, 26px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 16px",
  },
  lede: {
    fontSize: "clamp(14px, 2.6vw, 17px)",
    color: COLORS.inkLight,
    lineHeight: 1.9,
    margin: "0 0 28px",
  },

  // Shape cards
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
    fontSize: "clamp(20px, 4vw, 28px)",
    fontWeight: 700,
    flexShrink: 0,
    width: 56,
    height: 56,
    borderRadius: 12,
    background: "rgba(0,0,0,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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

  // Expanded detail
  detailCard: {
    background: "#fff",
    border: "2px solid",
    borderRadius: 16,
    marginTop: 16,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
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
    whiteSpace: "pre-line",
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
  quizShapeTag: {
    marginBottom: 14,
  },
  shapeChip: {
    display: "inline-block",
    border: "1.5px solid",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 13,
    fontWeight: 700,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  quizEquationBox: {
    background: COLORS.ink,
    borderRadius: 12,
    padding: "18px",
    textAlign: "center",
    marginBottom: 20,
  },
  quizEquation: {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    fontSize: "clamp(14px, 3.5vw, 18px)",
    fontWeight: 700,
    color: COLORS.paper,
    lineHeight: 1.6,
  },
  partsList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 18,
  },
  partCard: {
    border: "2px solid",
    borderRadius: 14,
    padding: "14px 16px",
    transition: "all 0.15s",
  },
  partHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  partLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.ink,
  },
  partResultIcon: {
    fontSize: 18,
    fontWeight: 700,
    flexShrink: 0,
  },
  chipsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    border: "1.5px solid",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 700,
    transition: "all 0.15s",
  },
  partHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#7a5a1a",
    background: COLORS.goldBg,
    border: `1px solid ${COLORS.gold}`,
    borderRadius: 8,
    padding: "8px 12px",
    lineHeight: 1.6,
  },
  quizCheckBtn: {
    display: "block",
    width: "100%",
    background: COLORS.chalk,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "13px",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  quizSuccessBanner: {
    marginBottom: 14,
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
