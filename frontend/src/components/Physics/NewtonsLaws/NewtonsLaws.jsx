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

// ── قوانين نيوتن الثلاثة ───────────────────────────────
const LAWS = [
  {
    id: "first",
    icon: "⊙",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "قانون نيوتن الأول",
    summary: "قانون القصور الذاتي (السكون والحركة)",
    explanation:
      "ينص قانون نيوتن الأول على أن الجسم الساكن يبقى ساكناً، والجسم المتحرك بسرعة ثابتة في خط مستقيم يبقى على حركته تلك، ما لم تؤثر عليه قوة خارجية محصلتها لا تساوي صفراً. يُعرف هذا القانون أيضاً بقانون القصور الذاتي (Inertia)، وهو يعني أن الأجسام «تقاوم» تغيّر حالة حركتها.",
    formula: "إذا كانت ق_محصلة = 0 ⇐ السرعة ثابتة (أو الجسم ساكن)",
    unit: "لا وحدة (وصف لحالة الحركة)",
    steps: [
      "حدد جميع القوى المؤثرة على الجسم",
      "اجمع القوى متجهياً للحصول على القوة المحصلة",
      "إذا كانت المحصلة صفراً، فالجسم ساكن أو يتحرك بسرعة ثابتة",
      "إذا لم تكن صفراً، فالجسم لا يخضع لهذا القانون بل للقانون الثاني",
    ],
    link: "exampleFirstLaw",
  },
  {
    id: "second",
    icon: "Σ",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "قانون نيوتن الثاني",
    summary: "العلاقة بين القوة والكتلة والتسارع",
    explanation:
      "ينص قانون نيوتن الثاني على أن تسارع الجسم يتناسب طرداً مع القوة المحصلة المؤثرة عليه، ويتناسب عكساً مع كتلته. بمعنى آخر، زيادة القوة تزيد التسارع، وزيادة الكتلة تقلل التسارع لنفس القوة. هذا القانون هو الأساس الكمي لحساب حركة الأجسام تحت تأثير القوى.",
    formula: "ق = ك × ت",
    unit: "نيوتن (N)",
    steps: [
      "حدد الكتلة الكلية للجسم (ك) بوحدة الكيلوغرام",
      "حدد التسارع المطلوب أو المعطى (ت) بوحدة م/ث²",
      "اضرب الكتلة في التسارع للحصول على القوة المحصلة",
      "أو إذا عُرفت القوة، اقسمها على الكتلة لإيجاد التسارع: ت = ق ÷ ك",
    ],
    link: "exampleSecondLaw",
  },
  {
    id: "third",
    icon: "⇄",
    color: COLORS.teal,
    bg: COLORS.tealBg,
    title: "قانون نيوتن الثالث",
    summary: "الفعل ورد الفعل",
    explanation:
      "ينص قانون نيوتن الثالث على أنه لكل قوة فعل (تأثير) قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه. هاتان القوتان تؤثران على جسمين مختلفين في نفس الوقت؛ فإذا دفع الجسم (أ) الجسم (ب) بقوة معينة، فإن الجسم (ب) يدفع الجسم (أ) بقوة مساوية في المقدار ومعاكسة في الاتجاه.",
    formula: "ق_فعل = − ق_رد الفعل",
    unit: "نيوتن (N)",
    steps: [
        "حدد الجسمين المتفاعلين (أ) و(ب)",
      "حدد قوة الفعل التي يؤثر بها الجسم (أ) على الجسم (ب)",
      "قوة رد الفعل تساوي قوة الفعل في المقدار وتعاكسها في الاتجاه",
      "تذكّر أن القوتين تؤثران على جسمين مختلفين، وليس على الجسم نفسه",
    ],
    link: "exampleThirdLaw",
  },
];

// ── Quiz ──────────────────────────────────────────────
const QUIZ = [
  {
    law: "second",
    question: "جسم كتلته 4 كغم خضع لقوة محصلة قدرها 20 نيوتن. ما تسارعه؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: [
          "الأول: القصور الذاتي",
          "الثاني: ق = ك × ت",
          "الثالث: الفعل ورد الفعل",
        ],
        correct: "الثاني: ق = ك × ت",
      },
      {
        label: "التسارع (م/ث²)",
        options: ["5", "80", "16", "0.2"],
        correct: "5",
      },
    ],
  },
  {
    law: "third",
    question: "عندما يدفع سباح الماء إلى الخلف بقدميه، يتحرك إلى الأمام. أي قانون يفسر ذلك؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: [
          "الأول: القصور الذاتي",
          "الثاني: ق = ك × ت",
          "الثالث: الفعل ورد الفعل",
        ],
        correct: "الثالث: الفعل ورد الفعل",
      },
      {
        label: "قوة رد الفعل (الماء على السباح) مقارنة بقوة الفعل",
        options: [
          "أكبر منها",
          "أصغر منها",
          "تساويها وتعاكسها بالاتجاه",
          "لا علاقة بينهما",
        ],
        correct: "تساويها وتعاكسها بالاتجاه",
      },
    ],
  },
  {
    law: "first",
    question: "راكب حافلة يتحرك للأمام بشكل مفاجئ عندما تتوقف الحافلة بسرعة. ما تفسير ذلك؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: [
          "الأول: القصور الذاتي",
          "الثاني: ق = ك × ت",
          "الثالث: الفعل ورد الفعل",
        ],
        correct: "الأول: القصور الذاتي",
      },
      {
        label: "سبب حركة الراكب للأمام",
        options: [
          "جسمه يقاوم تغيّر حالة حركته ويحاول الاستمرار بالحركة",
          "قوة دفعته من الخلف",
          "زيادة كتلته فجأة",
          "رد فعل من المقعد",
        ],
        correct: "جسمه يقاوم تغيّر حالة حركته ويحاول الاستمرار بالحركة",
      },
    ],
  },
  {
    law: "second",
    question: "أُريد تسريع جسم كتلته 2 كغم بمعدل تسارع 6 م/ث². ما القوة المحصلة اللازمة؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: [
          "الأول: القصور الذاتي",
          "الثاني: ق = ك × ت",
          "الثالث: الفعل ورد الفعل",
        ],
        correct: "الثاني: ق = ك × ت",
      },
      {
        label: "القوة المحصلة (نيوتن)",
        options: ["3", "12", "8", "0.33"],
        correct: "12",
      },
    ],
  },
  {
    law: "first",
    question: "صاروخ يطفو في الفضاء بعيداً عن أي جاذبية أو احتكاك، بسرعة ثابتة وفي خط مستقيم. ما القوة المحصلة عليه؟",
    parts: [
      {
        label: "المحصلة المتوقعة وفق القانون الأول",
        options: ["صفر", "تساوي كتلته", "تزداد مع الزمن", "تعتمد على السرعة"],
        correct: "صفر",
      },
      {
        label: "هل سيستمر بالحركة بنفس السرعة والاتجاه؟",
        options: ["نعم، ما لم تؤثر قوة خارجية", "لا، سيتوقف تلقائياً", "سيتسارع تلقائياً", "سيتغير اتجاهه تلقائياً"],
        correct: "نعم، ما لم تؤثر قوة خارجية",
      },
    ],
  },
  {
    law: "third",
    question: "بندقية تطلق رصاصة للأمام، فترتد البندقية إلى الخلف (الارتداد). أي قانون يفسر ارتداد البندقية؟",
    parts: [
      {
        label: "القانون المستخدم",
        options: [
          "الأول: القصور الذاتي",
          "الثاني: ق = ك × ت",
          "الثالث: الفعل ورد الفعل",
        ],
        correct: "الثالث: الفعل ورد الفعل",
      },
      {
        label: "اتجاه قوة رد الفعل على البندقية مقارنة بقوة دفع الرصاصة",
        options: ["نفس الاتجاه", "معاكس للاتجاه", "عمودي عليه", "لا توجد قوة رد فعل"],
        correct: "معاكس للاتجاه",
      },
    ],
  },
];

const LAW_LABELS = {
  first: "القانون الأول",
  second: "القانون الثاني",
  third: "القانون الثالث",
};

export default function NewtonsLaws() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const activeLaw = LAWS.find((l) => l.id === expanded);

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
        <div style={styles.eyebrow}>الفيزياء · الحركة والقوى</div>
        <h1 style={styles.h1}>قوانين نيوتن الثلاثة للحركة</h1>
        <p style={styles.lede}>
          وضع السير إسحاق نيوتن ثلاثة قوانين تصف العلاقة بين حركة الأجسام
          والقوى المؤثرة عليها، وتُعد حجر الأساس في الميكانيكا الكلاسيكية.
          اختر قانوناً للاطلاع على تعريفه وقانونه الرياضي وطريقة تطبيقه.
        </p>

        {/* ── Three law cards ── */}
        <div style={styles.typesGrid}>
          {LAWS.map((l) => (
            <button
              key={l.id}
              onClick={() => setExpanded(expanded === l.id ? null : l.id)}
              style={{
                ...styles.typeCard,
                background: expanded === l.id ? l.bg : "#fff",
                borderColor: expanded === l.id ? l.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: l.color }}>{l.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{l.title}</h3>
                <p style={styles.typeSummary}>{l.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: l.color }}>
                {expanded === l.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content ── */}
        {activeLaw && (
          <div style={{ ...styles.detailCard, borderColor: activeLaw.color }}>
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>التعريف</p>
              <p style={styles.detailText}>{activeLaw.explanation}</p>
            </div>

            <div style={{ ...styles.formulaBox, background: activeLaw.bg }}>
              <span style={{ ...styles.formulaText, color: activeLaw.color }}>
                {activeLaw.formula}
              </span>
              <div style={{ ...styles.unitTag, color: activeLaw.color, borderColor: activeLaw.color }}>
                الوحدة: {activeLaw.unit}
              </div>
            </div>

            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>خطوات التطبيق</p>
              <div style={styles.stepsList}>
                {activeLaw.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div style={{ ...styles.stepBadge, background: activeLaw.color }}>
                      {i + 1}
                    </div>
                    <p style={styles.stepText}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailFooter}>
              <button
                onClick={() => navigate(`/${activeLaw.link}`)}
                style={{ ...styles.examplesBtn, background: activeLaw.color }}
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
              background: LAWS.find(l => l.id === quiz.law)?.bg,
              color: LAWS.find(l => l.id === quiz.law)?.color,
              borderColor: LAWS.find(l => l.id === quiz.law)?.color,
            }}>
              {LAWS.find(l => l.id === quiz.law)?.icon} {LAW_LABELS[quiz.law]}
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

  // Law cards
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
