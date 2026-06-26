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

// ── The 6 physical quantities ──────────────────────────
const QUANTITIES = [
  {
    id: "volume",
    icon: "◫",
    color: COLORS.sage,
    bg: COLORS.sageBg,
    title: "الحجم",
    summary: "الحيز الذي يشغله الجسم في الفراغ",
    explanation:
      "الحجم هو مقدار الحيز أو الفراغ الذي يشغله جسم ما. يُقاس بوحدات مكعبة مثل السنتيمتر المكعب (سم³) أو المتر المكعب (م³)، وأحياناً باللتر للسوائل.",
    formula: "متعدد القوانين حسب الشكل (مثل: متوازي مستطيلات = ط × ع × ا)",
    unit: "م³ أو سم³ أو لتر",
    steps: [
      "حدد شكل الجسم (مكعب، متوازي مستطيلات، أسطوانة...)",
      "استخدم قانون الحجم الخاص بهذا الشكل",
      "عوّض الأبعاد المعطاة بنفس وحدة القياس",
      "احسب الناتج واكتب الوحدة المكعبة المناسبة",
    ],
    link: "exampleVolume",
  },
  {
    id: "mass",
    icon: "●",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "الكتلة",
    summary: "مقدار المادة التي يتكون منها الجسم",
    explanation:
      "الكتلة هي مقدار ثابت من المادة الموجودة في الجسم، ولا تتغير بتغير موقع الجسم (على الأرض أو القمر مثلاً تبقى الكتلة كما هي). تُقاس بالكيلوغرام أو الغرام، وتُقاس عادة باستخدام الميزان ذي الكفتين.",
    formula: "كتلة قياسية أساسية (تُقاس مباشرة، لا قانون اشتقاقي لها)",
    unit: "كغم أو غم",
    steps: [
      "ضع الجسم على ميزان معايَر",
      "اقرأ القيمة المباشرة من الميزان",
      "تأكد من وحدة القياس (كغم أو غم)",
      "الكتلة لا تتغير بتغير الجاذبية أو الموقع",
    ],
    link: "exampleMass",
  },
  {
    id: "weight",
    icon: "↓",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "الوزن",
    summary: "قوة الجاذبية المؤثرة على كتلة الجسم",
    explanation:
      "الوزن هو القوة التي تجذب بها الأرض (أو أي كوكب) الجسم نحوها، وهو يساوي حاصل ضرب الكتلة في تسارع الجاذبية الأرضية (g ≈ 9.8 م/ث²). الوزن يتغير من مكان لآخر لأن g تختلف، بعكس الكتلة الثابتة.",
    formula: "و = ك × ج",
    unit: "نيوتن (N)",
    steps: [
      "حدد كتلة الجسم (ك) بوحدة الكيلوغرام",
      "استخدم تسارع الجاذبية الأرضية (ج ≈ 9.8 م/ث²)",
      "اضرب الكتلة في تسارع الجاذبية",
      "الناتج هو الوزن بوحدة النيوتن",
    ],
    link: "exampleWeight",
  },
  {
    id: "density",
    icon: "▦",
    color: COLORS.plum,
    bg: COLORS.plumBg,
    title: "الكثافة",
    summary: "كتلة وحدة الحجوم من المادة",
    explanation:
      "الكثافة تصف مدى تركّز كتلة المادة داخل حجمها. كلما كانت المادة أكثر كثافة، كانت جزيئاتها أكثر تقارباً. تُحسب بقسمة الكتلة على الحجم، وتختلف من مادة لأخرى (مثلاً الحديد أكثف من الخشب).",
    formula: "كث = ك ÷ ح",
    unit: "كغم/م³ أو غم/سم³",
    steps: [
      "احسب أو اقرأ كتلة الجسم (ك)",
      "احسب أو اقرأ حجم الجسم (ح)",
      "اقسم الكتلة على الحجم",
      "الناتج هو الكثافة بالوحدة المناسبة",
    ],
    link: "exampleDensity",
  },
  {
    id: "speed",
    icon: "→",
    color: COLORS.gold,
    bg: COLORS.goldBg,
    title: "السرعة",
    summary: "المسافة المقطوعة في وحدة الزمن",
    explanation:
      "السرعة تصف معدل تغيّر موقع الجسم مع الزمن، أي مدى سرعة قطعه للمسافة. تُحسب بقسمة المسافة الكلية المقطوعة على الزمن المستغرق لقطعها.",
    formula: "س = م ÷ ز",
    unit: "م/ث أو كم/سا",
    steps: [
      "حدد المسافة الكلية المقطوعة (م)",
      "حدد الزمن المستغرق (ز)",
      "اقسم المسافة على الزمن",
      "الناتج هو السرعة بالوحدة المناسبة",
    ],
    link: "exampleSpeed",
  },
  {
    id: "acceleration",
    icon: "⤴",
    color: COLORS.teal,
    bg: COLORS.tealBg,
    title: "التسارع",
    summary: "معدل تغيّر السرعة مع الزمن",
    explanation:
      "التسارع يصف مدى سرعة تغيّر سرعة الجسم، سواء بالزيادة أو النقصان. يُحسب بقسمة التغيّر في السرعة (السرعة النهائية ناقص السرعة الابتدائية) على الزمن المستغرق لهذا التغيّر.",
    formula: "ت = (س_ن − س_ب) ÷ ز",
    unit: "م/ث²",
    steps: [
      "حدد السرعة الابتدائية (س_ب) والسرعة النهائية (س_ن)",
      "احسب التغيّر في السرعة: س_ن − س_ب",
      "حدد الزمن المستغرق لهذا التغيّر (ز)",
      "اقسم التغيّر في السرعة على الزمن",
    ],
    link: "exampleAcceleration",
  },
];

// ── Quiz ──────────────────────────────────────────────
const QUIZ = [
  {
    quantity: "speed",
    question: "سيارة قطعت مسافة 150 كم خلال 3 ساعات. ما سرعتها؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["س = م ÷ ز", "و = ك × ج", "كث = ك ÷ ح", "ت = (س_ن − س_ب) ÷ ز"],
        correct: "س = م ÷ ز",
      },
      {
        label: "السرعة (كم/سا)",
        options: ["30", "50", "450", "153"],
        correct: "50",
      },
    ],
  },
  {
    quantity: "weight",
    question: "جسم كتلته 5 كغم. ما وزنه؟ (ج ≈ 9.8 م/ث²)",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["س = م ÷ ز", "و = ك × ج", "كث = ك ÷ ح", "ت = (س_ن − س_ب) ÷ ز"],
        correct: "و = ك × ج",
      },
      {
        label: "الوزن (نيوتن، تقريباً)",
        options: ["14.8", "49", "5.9", "9.8"],
        correct: "49",
      },
    ],
  },
  {
    quantity: "density",
    question: "جسم كتلته 20 غم وحجمه 4 سم³. ما كثافته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["س = م ÷ ز", "و = ك × ج", "كث = ك ÷ ح", "ت = (س_ن − س_ب) ÷ ز"],
        correct: "كث = ك ÷ ح",
      },
      {
        label: "الكثافة (غم/سم³)",
        options: ["80", "16", "5", "24"],
        correct: "5",
      },
    ],
  },
  {
    quantity: "acceleration",
    question: "سيارة زادت سرعتها من 10 م/ث إلى 30 م/ث خلال 5 ثوانٍ. ما تسارعها؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["س = م ÷ ز", "و = ك × ج", "كث = ك ÷ ح", "ت = (س_ن − س_ب) ÷ ز"],
        correct: "ت = (س_ن − س_ب) ÷ ز",
      },
      {
        label: "التسارع (م/ث²)",
        options: ["4", "8", "2", "40"],
        correct: "4",
      },
    ],
  },
  {
    quantity: "mass",
    question: "وُضع جسم على ميزان معايَر فأشار إلى 12 كغم. ما الذي قِسته؟",
    parts: [
      {
        label: "المصطلح الصحيح",
        options: ["الحجم", "الكتلة", "الوزن", "الكثافة"],
        correct: "الكتلة",
      },
      {
        label: "هل تتغير هذه القيمة إن انتقل الجسم للقمر؟",
        options: ["نعم تزيد", "نعم تقل", "لا، تبقى ثابتة", "تصبح صفراً"],
        correct: "لا، تبقى ثابتة",
      },
    ],
  },
  {
    quantity: "speed",
    question: "دراج قطع 21 كم خلال 1.5 ساعة. ما سرعته؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: ["س = م ÷ ز", "و = ك × ج", "كث = ك ÷ ح", "ت = (س_ن − س_ب) ÷ ز"],
        correct: "س = م ÷ ز",
      },
      {
        label: "السرعة (كم/سا)",
        options: ["10.5", "14", "31.5", "22.5"],
        correct: "14",
      },
    ],
  },
];

const QUANTITY_LABELS = {
  volume: "الحجم",
  mass: "الكتلة",
  weight: "الوزن",
  density: "الكثافة",
  speed: "السرعة",
  acceleration: "التسارع",
};

export default function PhysicsQuantities() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const activeQuantity = QUANTITIES.find((q) => q.id === expanded);

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
        <div style={styles.eyebrow}>الفيزياء · المصطلحات والمقادير</div>
        <h1 style={styles.h1}>المقادير الفيزيائية الأساسية</h1>
        <p style={styles.lede}>
          تصف المقادير الفيزيائية خصائص الأجسام والحركة من حولنا، ولكل مقدار
          تعريف ووحدة قياس وقانون رياضي خاص به. اختر المصطلح للاطلاع على
          تعريفه وقانونه وطريقة حسابه.
        </p>

        {/* ── Six quantity cards ── */}
        <div style={styles.typesGrid}>
          {QUANTITIES.map((q) => (
            <button
              key={q.id}
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              style={{
                ...styles.typeCard,
                background: expanded === q.id ? q.bg : "#fff",
                borderColor: expanded === q.id ? q.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: q.color }}>{q.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{q.title}</h3>
                <p style={styles.typeSummary}>{q.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: q.color }}>
                {expanded === q.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content ── */}
        {activeQuantity && (
          <div style={{ ...styles.detailCard, borderColor: activeQuantity.color }}>
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>التعريف</p>
              <p style={styles.detailText}>{activeQuantity.explanation}</p>
            </div>

            <div style={{ ...styles.formulaBox, background: activeQuantity.bg }}>
              <span style={{ ...styles.formulaText, color: activeQuantity.color }}>
                {activeQuantity.formula}
              </span>
              <div style={{ ...styles.unitTag, color: activeQuantity.color, borderColor: activeQuantity.color }}>
                الوحدة: {activeQuantity.unit}
              </div>
            </div>

            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>خطوات الحساب</p>
              <div style={styles.stepsList}>
                {activeQuantity.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div style={{ ...styles.stepBadge, background: activeQuantity.color }}>
                      {i + 1}
                    </div>
                    <p style={styles.stepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailFooter}>
              <button
                onClick={() => navigate(`/${activeQuantity.link}`)}
                style={{ ...styles.examplesBtn, background: activeQuantity.color }}
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
              background: QUANTITIES.find(q => q.id === quiz.quantity)?.bg,
              color: QUANTITIES.find(q => q.id === quiz.quantity)?.color,
              borderColor: QUANTITIES.find(q => q.id === quiz.quantity)?.color,
            }}>
              {QUANTITIES.find(q => q.id === quiz.quantity)?.icon} {QUANTITY_LABELS[quiz.quantity]}
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

  // Quantity cards
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
    fontSize: "clamp(15px, 3.6vw, 20px)",
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
