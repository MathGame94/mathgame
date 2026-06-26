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
  teal: "#3D8A82",
  tealBg: "#E5F1EF",
  border: "#E5DDD0",
};

// ── المتجهات والمحصلة ───────────────────────────────
const VECTORS_DATA = [
  {
    id: "horizontal",
    icon: "⇄",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "المتجهة الأفقية (Vx)",
    summary: "مركبة الحركة أو القوة على محور السينات (X-axis)",
    explanation:
      "المركبة الأفقية هي مسقط المتجهة الأصلية على المحور الأفقي (سينات). تمثل مدى تأثير المتجهة يميناً أو يساراً. إذا كانت المتجهة الأصلية (ح) تميل بزاوية (هـ) مع الأفق، يتم حساب المركبة الأفقية باستخدام جيب التمام (Cos).",
    formula: "ح_س = ح × جتا(هـ)  |  Vx = V × cos(θ)",
    unit: "تعتمد على الكمية (نيوتن، م/ث، إلخ)",
    steps: [
      "حدد مقدار المتجهة الأصلية والزاوية التي تصنعها مع الأفق",
      "تأكد أن الزاوية مقاسة مع محور السينات الموجب لتحديد الإشارة تلقائياً",
      "اضرب مقدار المتجهة في جيب تمام الزاوية (cos)",
      "إذا كانت القوة أفقية بالكامل، فإن المركبة العمودية لها تساوي صفراً",
    ],
    link: "exampleHorizantalComponent",
  },
  {
    id: "vertical",
    icon: "⇅",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "المتجهة العمودية (Vy)",
    summary: "مركبة الحركة أو القوة على محور الصادات (Y-axis)",
    explanation:
      "المركبة العمودية هي مسقط المتجهة الأصلية على المحور الرأسي (صادات). تمثل مدى تأثير المتجهة لأعلى أو لأسفل. إذا كانت المتجهة الأصلية (ح) تميل بزاوية (هـ) مع الأفق، يتم حساب المركبة العمودية باستخدام الجيب (Sin).",
    formula: "ح_ص = ح × جا(هـ)  |  Vy = V × sin(θ)",
    unit: "تعتمد على الكمية (نيوتن، م/ث، إلخ)",
    steps: [
      "حدد مقدار المتجهة الأصلية وزاوية ميلها",
      "استخدم زاوية الميل مع الأفق لحساب المسقط الرأسي",
      "اضرب مقدار المتجهة في جيب الزاوية (sin)",
      "تذكر أن الإشارة تكون موجبة للأعلى وسالبة للأسفل في المحاور القياسية",
    ],
    link: "exampleVerticalComponent",
  },
  {
    id: "resultant",
    icon: "⤳",
    color: COLORS.teal,
    bg: COLORS.tealBg,
    title: "المتجهة المحصلة (R)",
    summary: "جمع المتجهتين الأفقية والعمودية كقيمة واتجاه",
    explanation:
      "عند تراكب مركبة أفقية ومركبة عمودية متعامدتين، نجد المتجهة المحصلة (المقدار) باستخدام نظرية فيثاغورس. أما اتجاه المحصلة (الزاوية θ) فيتم تحديده باستخدام ظل الزاوية (Tan) المقابل على المجاور (المركبة العمودية مقسومة على الأفقية).",
    formula: "المقدار: ح = √(ح_س² + ح_ص²)  |  الاتجاه: ظل(هـ) = ح_ص ÷ ح_س",
    unit: "نفس وحدة المركبات الأساسية",
    steps: [
      "احسب مجموع المركبات الأفقية (ح_س) ومجموع المركبات العمودية (ح_ص)",
      "ربع المركبتين واجمعهما، ثم خذ الجذر التربيعي لإيجاد (المقدار المحصل)",
      "اقسم المركبة العمودية على الأفقية واستخدم مقلوب الظل (tan⁻¹) لإيجاد (الزاوية)",
      "حدد الربع الذي تقع فيه المحصلة بناءً على إشارات المركبات (س، ص)",
    ],
    link: "exampleResultantComponent",
  },
];

// ── Quiz ──────────────────────────────────────────────
const QUIZ = [
  {
    vectorType: "resultant",
    question:
      "تؤثر قوة أفقية مقدارها 3 نيوتن شرقاً، وقوة عمودية مقدارها 4 نيوتن شمالاً على جسم. ما مقدار واتجاه القوة المحصلة؟",
    parts: [
      {
        label: "مقدار القوة المحصلة (نيوتن)",
        options: ["7", "5", "1", "25"],
        correct: "5",
      },
      {
        label: "اتجاه المحصلة (ظا الزاوية هـ مع الأفق)",
        options: ["4 ÷ 3", "3 ÷ 4", "1", "0.5"],
        correct: "4 ÷ 3",
      },
    ],
  },
  {
    vectorType: "horizontal",
    question:
      "قوة سحب مقدارها 10 نيوتن تميل بزاوية 60° عن الأفق. ما مقدار المركبة الأفقية (Vx)؟ علما بأن جتا(60) = 0.5، جا(60) = 0.86",
    parts: [
      {
        label: "القانون الرياضي للمركبة الأفقية",
        options: ["ق_س = ق × جا(هـ)", "ق_س = ق × جتا(هـ)", "ق_س = ق ÷ جتا(هـ)"],
        correct: "ق_س = ق × جتا(هـ)",
      },
      {
        label: "المركبة الأفقية النهائية (نيوتن)",
        options: ["5", "8.6", "20", "0"],
        correct: "5",
      },
    ],
  },
  {
    vectorType: "vertical",
    question:
      "ركل لاعب كرة قدم بسرعة 20 م/ث وبزاوية 30° عن سطح الأرض. ما هي السرعة العمودية الابتدائية (Vy) للكرة؟ علماً بأن جا(30) = 0.5",
    parts: [
      {
        label: "المركبة العمودية تعتمد على:",
        options: [
          "جيب الزاوية (Sin)",
          "جيب تمام الزاوية (Cos)",
          "ظل الزاوية (Tan)",
        ],
        correct: "جيب الزاوية (Sin)",
      },
      {
        label: "مقدار السرعة العمودية (م/ث)",
        options: ["10", "17.3", "40", "5"],
        correct: "10",
      },
    ],
  },
];

const VECTOR_LABELS = {
  horizontal: "المركبة الأفقية",
  vertical: "المركبة العمودية",
  resultant: "المتجهة المحصلة",
};

export default function VectorsAndResultant() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const activeVector = VECTORS_DATA.find((v) => v.id === expanded);

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

  const isPartCorrect = (partIdx) =>
    partAnswers[partIdx] === quiz.parts[partIdx].correct;
  const allCorrect = checked && quiz.parts.every((_, i) => isPartCorrect(i));

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ── Header ── */}
        <div style={styles.eyebrow}>الفيزياء · تحليل المتجهات</div>
        <h1 style={styles.h1}>تحليل المتجهات وحساب المحصلة</h1>
        <p style={styles.lede}>
          تحليل المتجهات هو تفكيك المتجهة المائلة إلى مركبتين أساسيتين: أفقية
          وعمودية، بينما حساب المحصلة يجمع هذه المركبات المتعامدة لإيجاد القيمة
          الإجمالية والاتجاه بدقة هندسية.
        </p>

        {/* ── Three Vector cards ── */}
        <div style={styles.typesGrid}>
          {VECTORS_DATA.map((v) => (
            <button
              key={v.id}
              onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              style={{
                ...styles.typeCard,
                background: expanded === v.id ? v.bg : "#fff",
                borderColor: expanded === v.id ? v.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: v.color }}>{v.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{v.title}</h3>
                <p style={styles.typeSummary}>{v.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: v.color }}>
                {expanded === v.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content ── */}
        {activeVector && (
          <div
            style={{ ...styles.detailCard, borderColor: activeVector.color }}
          >
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>المفهوم العلمي</p>
              <p style={styles.detailText}>{activeVector.explanation}</p>
            </div>

            <div style={{ ...styles.formulaBox, background: activeVector.bg }}>
              <span
                style={{ ...styles.formulaText, color: activeVector.color }}
              >
                {activeVector.formula}
              </span>
              <div
                style={{
                  ...styles.unitTag,
                  color: activeVector.color,
                  borderColor: activeVector.color,
                }}
              >
                الوحدة: {activeVector.unit}
              </div>
            </div>

            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>خطوات التحليل والحساب</p>
              <div style={styles.stepsList}>
                {activeVector.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div
                      style={{
                        ...styles.stepBadge,
                        background: activeVector.color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p style={styles.stepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailFooter}>
              <button
                onClick={() => navigate(`/${activeVector.link}`)}
                style={{
                  ...styles.examplesBtn,
                  background: activeVector.color,
                }}
              >
                تطبيقات ومسائل ←
              </button>
            </div>
          </div>
        )}

        {/* ── Quiz ── */}
        <h2 style={{ ...styles.h2, marginTop: 36 }}>اختبر نفسك في المتجهات</h2>
        <div style={styles.quizCard}>
          <div style={styles.quizShapeTag}>
            <span
              style={{
                ...styles.shapeChip,
                background: VECTORS_DATA.find((v) => v.id === quiz.vectorType)
                  ?.bg,
                color: VECTORS_DATA.find((v) => v.id === quiz.vectorType)
                  ?.color,
                borderColor: VECTORS_DATA.find((v) => v.id === quiz.vectorType)
                  ?.color,
              }}
            >
              {VECTORS_DATA.find((v) => v.id === quiz.vectorType)?.icon}{" "}
              {VECTOR_LABELS[quiz.vectorType]}
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
                    borderColor: correct
                      ? COLORS.sage
                      : wrong
                        ? COLORS.coral
                        : COLORS.border,
                    background: correct
                      ? COLORS.sageBg
                      : wrong
                        ? COLORS.coralBg
                        : COLORS.paperAlt,
                  }}
                >
                  <div style={styles.partHeader}>
                    <span style={styles.partLabel}>{part.label}</span>
                    {checked && (
                      <span
                        style={{
                          ...styles.partResultIcon,
                          color: correct ? COLORS.sage : COLORS.coral,
                        }}
                      >
                        {correct ? "✓" : "✗"}
                      </span>
                    )}
                  </div>

                  <div style={styles.chipsRow}>
                    {part.options.map((opt) => {
                      const isChosen = chosen === opt;
                      const isCorrectOpt = checked && opt === part.correct;
                      const isWrongChosen =
                        checked && isChosen && opt !== part.correct;
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
                            color:
                              isCorrectOpt || isWrongChosen || isChosen
                                ? "#fff"
                                : COLORS.ink,
                            borderColor: isCorrectOpt
                              ? COLORS.sage
                              : isWrongChosen
                                ? COLORS.coral
                                : isChosen
                                  ? COLORS.chalk
                                  : COLORS.border,
                            cursor: checked ? "default" : "pointer",
                            fontFamily: "'Segoe UI', Tahoma, sans-serif",
                            direction: "rtl",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {wrong && (
                    <div style={styles.partHint}>
                      💡 الحل الصحيح: <strong>{part.correct}</strong>
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
                  ✓ إجابة صحيحة وحسابات دقيقة للمتجهات!
                </div>
              )}
              <button onClick={nextQuiz} style={styles.quizNextBtn}>
                المسألة التالية ←
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
    fontSize: "clamp(26px, 5.5vw, 36px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 14px",
  },
  h2: {
    fontFamily: "'Amiri', Georgia, serif",
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 16px",
  },
  lede: {
    fontSize: "clamp(13px, 2.5vw, 16px)",
    color: COLORS.inkLight,
    lineHeight: 1.9,
    margin: "0 0 28px",
  },

  // Vector cards
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
    fontSize: "clamp(22px, 4.5vw, 30px)",
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
    fontSize: "clamp(14px, 3.4vw, 18px)",
    fontWeight: 700,
    display: "inline-block",
    whiteSpace: "pre-line",
  },
  unitTag: {
    marginTop: 10,
    display: "inline-block",
    border: "1.5px solid",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 12,
    fontWeight: 700,
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
    fontSize: "clamp(14px, 3.5vw, 17px)",
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
