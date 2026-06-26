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

// ── The 3 number "kinds" that can appear next to x ──
const KINDS = [
  {
    id: "add-sub",
    icon: "x±",
    color: COLORS.sage,
    bg: COLORS.sageBg,
    title: "رقم مُضاف أو مطروح مع x",
    summary: "مثل: x + 5 أو x − 3",
    explanation:
      "هذا الرقم منفصل عن x بعملية جمع أو طرح. للتخلص منه ننقله إلى الطرف الآخر من المعادلة، وعند النقل تنعكس إشارته (الجمع يصبح طرح، والطرح يصبح جمع).",
    formula: "x + b = c  ⟹  x = c − b",
    steps: [
      "حدد الرقم المضاف أو المطروح مع x",
      "اعكس إشارته (+ تصبح −، و − تصبح +)",
      "انقله إلى الطرف الآخر من المعادلة",
      "احسب القيمة الناتجة لـ x",
    ],
    link: "exampleAddSub",
  },
  {
    id: "mult",
    icon: "ax",
    color: COLORS.chalk,
    bg: COLORS.chalkBg,
    title: "رقم مضروب مع x",
    summary: "مثل: 3x أو −2x",
    explanation:
      "هذا الرقم مضروب مباشرة في x (لا يوجد علامة + أو − بينهما). للتخلص منه نقسم طرفي المعادلة على هذا الرقم، لأن القسمة هي العملية المعكوسة للضرب.",
    formula: "ax = c  ⟹  x = c ÷ a",
    steps: [
      "حدد الرقم المضروب في x (معامل x)",
      "العملية المعكوسة للضرب هي القسمة",
      "اقسم طرفي المعادلة على هذا الرقم",
      "احسب القيمة الناتجة لـ x",
    ],
    link: "exampleMulti",
  },
  {
    id: "div",
    icon: "x/a",
    color: COLORS.coral,
    bg: COLORS.coralBg,
    title: "x مقسوم على رقم",
    summary: "مثل: x ÷ 4 أو x/2",
    explanation:
      "هنا x مقسومة على رقم معيّن. للتخلص من القسمة نضرب طرفي المعادلة في هذا الرقم، لأن الضرب هو العملية المعكوسة للقسمة.",
    formula: "x ÷ a = c  ⟹  x = c × a",
    steps: [
      "حدد الرقم الذي تُقسم عليه x",
      "العملية المعكوسة للقسمة هي الضرب",
      "اضرب طرفي المعادلة في هذا الرقم",
      "احسب القيمة الناتجة لـ x",
    ],
    link: "exampleDiv",
  },
  {
    id: "frac-mult",
    icon: "a/b·x",
    color: COLORS.gold,
    bg: COLORS.goldBg,
    title: "كسر مضروب مع x",
    summary: "مثل: (2/3)x = 8",
    explanation:
      "هنا x مضروبة في كسر (له بسط ومقام). للتخلص من الكسر نضرب طرفي المعادلة في مقلوب هذا الكسر (نعكس البسط والمقام)، لأن ضرب كسر في مقلوبه يساوي 1 فيبقى x وحدها.",
    formula: "(a/b)x = c  ⟹  x = c × (b/a)",
    steps: [
      "حدد الكسر المضروب في x (البسط والمقام)",
      "اقلب الكسر (اجعل المقام بسطاً والبسط مقاماً)",
      "اضرب طرفي المعادلة في الكسر المقلوب",
      "بسّط واحسب القيمة الناتجة لـ x",
    ],
    link: "exampleFracMult",
  },
  {
    id: "multi",
    icon: "ax+b",
    color: COLORS.plum,
    bg: COLORS.plumBg,
    title: "أكثر من رقم مع x معاً",
    summary: "مثل: 2x + 5 = 11",
    explanation:
      "في هذه الحالة يظهر أكثر من رقم مرتبط بـ x في المعادلة نفسها (رقم مضروب ورقم مُضاف أو مطروح مثلاً). نحل المعادلة بخطوتين متتاليتين: نتعامل أولاً مع الرقم المُضاف/المطروح (الأبعد عن x)، ثم مع الرقم المضروب (الأقرب إلى x).",
    formula: "ax + b = c  ⟹  x = (c − b) ÷ a",
    steps: [
      "ابدأ بالرقم المُضاف أو المطروح مع ax وانقله للطرف الآخر",
      "اعكس إشارته كما في النوع الأول",
      "بعد التخلص منه، تبقى ax = رقم — تعامل معه كرقم مضروب",
      "اقسم على معامل x لتحصل على القيمة النهائية",
    ],
    link:"exampleCombined"
  },
];

// ── Quiz: full equations combining the 3 kinds, student tags each number ──
// Each "part" in an equation is a number associated with x in some way.
// kind: "add-sub" | "mult" | "div"
// inverseOp: the inverse operation needed to undo it
const QUIZ = [
  {
    equation: "3x + 5 = 14",
    parts: [
      {
        value: "3",
        kind: "mult",
        inverseOp: "قسمة",
        label: "العدد 3 (مضروب في x)",
      },
      {
        value: "5",
        kind: "add-sub",
        inverseOp: "طرح",
        label: "العدد 5 (مُضاف مع x)",
      },
    ],
  },
  {
    equation: "x/2 − 4 = 6",
    parts: [
      {
        value: "2",
        kind: "div",
        inverseOp: "ضرب",
        label: "العدد 2 (x مقسومة عليه)",
      },
      {
        value: "4",
        kind: "add-sub",
        inverseOp: "جمع",
        label: "العدد 4 (مطروح من x)",
      },
    ],
  },
  {
    equation: "5x − 7 = 8",
    parts: [
      {
        value: "5",
        kind: "mult",
        inverseOp: "قسمة",
        label: "العدد 5 (مضروب في x)",
      },
      {
        value: "7",
        kind: "add-sub",
        inverseOp: "جمع",
        label: "العدد 7 (مطروح من x)",
      },
    ],
  },
  {
    equation: "x/3 + 6 = 10",
    parts: [
      {
        value: "3",
        kind: "div",
        inverseOp: "ضرب",
        label: "العدد 3 (x مقسومة عليه)",
      },
      {
        value: "6",
        kind: "add-sub",
        inverseOp: "طرح",
        label: "العدد 6 (مُضاف مع x)",
      },
    ],
  },
  {
    equation: "4x + 9 = 21",
    parts: [
      {
        value: "4",
        kind: "mult",
        inverseOp: "قسمة",
        label: "العدد 4 (مضروب في x)",
      },
      {
        value: "9",
        kind: "add-sub",
        inverseOp: "طرح",
        label: "العدد 9 (مُضاف مع x)",
      },
    ],
  },
  {
    equation: "x/5 − 2 = 3",
    parts: [
      {
        value: "5",
        kind: "div",
        inverseOp: "ضرب",
        label: "العدد 5 (x مقسومة عليه)",
      },
      {
        value: "2",
        kind: "add-sub",
        inverseOp: "جمع",
        label: "العدد 2 (مطروح من x)",
      },
    ],
  },
];

const KIND_LABELS = {
  "add-sub": "مُضاف/مطروح",
  mult: "مضروب",
  div: "مقسوم عليه",
};

const OP_OPTIONS = ["جمع", "طرح", "ضرب", "قسمة"];

export default function LinearEquation() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const activeKind = KINDS.find((k) => k.id === expanded);

  // ── Quiz state ──
  const [quizIndex, setQuizIndex] = useState(0);
  const [partAnswers, setPartAnswers] = useState({}); // { [partIndex]: { kind, op } }
  const [checked, setChecked] = useState(false);

  const quiz = QUIZ[quizIndex];

  const setPartKind = (partIdx, kind) => {
    if (checked) return;
    setPartAnswers((prev) => ({
      ...prev,
      [partIdx]: { ...prev[partIdx], kind },
    }));
  };

  const setPartOp = (partIdx, op) => {
    if (checked) return;
    setPartAnswers((prev) => ({
      ...prev,
      [partIdx]: { ...prev[partIdx], op },
    }));
  };

  const allAnswered = quiz.parts.every((_, i) => {
    const a = partAnswers[i];
    return a && a.kind && a.op;
  });

  const handleCheck = () => {
    if (!allAnswered) return;
    setChecked(true);
  };

  const nextQuiz = () => {
    setQuizIndex((quizIndex + 1) % QUIZ.length);
    setPartAnswers({});
    setChecked(false);
  };

  const isPartCorrect = (partIdx) => {
    const part = quiz.parts[partIdx];
    const a = partAnswers[partIdx];
    if (!a) return false;
    return a.kind === part.kind && a.op === part.inverseOp;
  };

  const allCorrect = checked && quiz.parts.every((_, i) => isPartCorrect(i));

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ── Header ── */}
        <div style={styles.eyebrow}>الدرس الأول · الجبر</div>
        <h1 style={styles.h1}>المعادلة الخطية</h1>
        <p style={styles.lede}>
          المعادلة الخطية هي معادلة من الدرجة الأولى في مجهول واحد، تُكتب على
          الصورة
          <span style={styles.inlineFormula}> ax + b = c </span>
          حيث a ≠ 0. لحل المعادلة نحتاج أن نتعرف على الأرقام المرتبطة بـ x وكيف
          تتعامل معها — فكل رقم له طريقة مختلفة في "الانتقال" إلى الطرف الآخر من
          المعادلة.
        </p>

        {/* ── Three kind cards ── */}
        <div style={styles.typesGrid}>
          {KINDS.map((k) => (
            <button
              key={k.id}
              onClick={() => setExpanded(expanded === k.id ? null : k.id)}
              style={{
                ...styles.typeCard,
                background: expanded === k.id ? k.bg : "#fff",
                borderColor: expanded === k.id ? k.color : COLORS.border,
              }}
            >
              <div style={{ ...styles.typeIcon, color: k.color }}>{k.icon}</div>
              <div style={styles.typeTextBox}>
                <h3 style={styles.typeTitle}>{k.title}</h3>
                <p style={styles.typeSummary}>{k.summary}</p>
              </div>
              <span style={{ ...styles.typeChevron, color: k.color }}>
                {expanded === k.id ? "▲" : "▼"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Expanded content for the selected kind ── */}
        {activeKind && (
          <div style={{ ...styles.detailCard, borderColor: activeKind.color }}>
            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>الشرح</p>
              <p style={styles.detailText}>{activeKind.explanation}</p>
            </div>

            <div style={{ ...styles.formulaBox, background: activeKind.bg }}>
              <span style={{ ...styles.formulaText, color: activeKind.color }}>
                {activeKind.formula}
              </span>
            </div>

            <div style={styles.detailSection}>
              <p style={styles.detailLabel}>كيف نتعامل معه</p>
              <div style={styles.stepsList}>
                {activeKind.steps.map((step, i) => (
                  <div key={i} style={styles.stepRow}>
                    <div
                      style={{
                        ...styles.stepBadge,
                        background: activeKind.color,
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
                onClick={() => navigate(`/${activeKind.link}`)}
                style={{ ...styles.examplesBtn, background: activeKind.color }}
              >
                الأمثلة ←
              </button>
            </div>
          </div>
        )}

        {/* ── Quiz: tag every number's kind + inverse operation ── */}
        <h2 style={{ ...styles.h2, marginTop: 36 }}>اختبر نفسك</h2>
        <div style={styles.quizCard}>
          <p style={styles.quizHint}>
            حدد نوع كل رقم في المعادلة، والعملية المعكوسة المناسبة للتخلص منه
          </p>

          <div style={styles.quizEquationBox}>
            <span style={styles.quizEquation}>{quiz.equation}</span>
          </div>

          <div style={styles.partsList}>
            {quiz.parts.map((part, i) => {
              const a = partAnswers[i] || {};
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
                    <span style={styles.partValue}>{part.value}</span>
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

                  <div style={styles.partRow}>
                    <span style={styles.partRowLabel}>نوع الرقم:</span>
                    <div style={styles.chipsRow}>
                      {Object.entries(KIND_LABELS).map(
                        ([kindId, kindLabel]) => {
                          const isChosen = a.kind === kindId;
                          return (
                            <button
                              key={kindId}
                              onClick={() => setPartKind(i, kindId)}
                              disabled={checked}
                              style={{
                                ...styles.chip,
                                background: isChosen ? COLORS.chalk : "#fff",
                                color: isChosen ? "#fff" : COLORS.ink,
                                borderColor: isChosen
                                  ? COLORS.chalk
                                  : COLORS.border,
                                cursor: checked ? "default" : "pointer",
                              }}
                            >
                              {kindLabel}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div style={styles.partRow}>
                    <span style={styles.partRowLabel}>العملية المعكوسة:</span>
                    <div style={styles.chipsRow}>
                      {OP_OPTIONS.map((op) => {
                        const isChosen = a.op === op;
                        return (
                          <button
                            key={op}
                            onClick={() => setPartOp(i, op)}
                            disabled={checked}
                            style={{
                              ...styles.chip,
                              background: isChosen ? COLORS.gold : "#fff",
                              color: isChosen ? "#fff" : COLORS.ink,
                              borderColor: isChosen
                                ? COLORS.gold
                                : COLORS.border,
                              cursor: checked ? "default" : "pointer",
                            }}
                          >
                            {op}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {wrong && (
                    <div style={styles.partHint}>
                      💡 النوع الصحيح: <strong>{KIND_LABELS[part.kind]}</strong>{" "}
                      · العملية المعكوسة الصحيحة:{" "}
                      <strong>{part.inverseOp}</strong>
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
                  ✓ ممتاز! حددت كل الأرقام بشكل صحيح
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
  inlineFormula: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    display: "inline-block",
    fontWeight: 700,
    color: COLORS.ink,
    padding: "0 4px",
  },

  // Kind cards
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
    fontSize: "clamp(13px, 3.2vw, 18px)",
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
    padding: "0 2px",
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
    background: COLORS.ink,
    borderRadius: 12,
    padding: "18px",
    textAlign: "center",
    marginBottom: 20,
  },
  quizEquation: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(18px, 4.5vw, 26px)",
    fontWeight: 700,
    color: COLORS.paper,
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
    gap: 10,
    marginBottom: 12,
  },
  partValue: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: 20,
    fontWeight: 700,
    color: COLORS.ink,
    background: "#fff",
    borderRadius: 8,
    padding: "2px 12px",
    border: `1px solid ${COLORS.border}`,
  },
  partLabel: {
    fontSize: 13,
    color: COLORS.inkLight,
    flex: 1,
  },
  partResultIcon: {
    fontSize: 18,
    fontWeight: 700,
    flexShrink: 0,
  },
  partRow: {
    marginBottom: 10,
  },
  partRowLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.inkLight,
    marginBottom: 6,
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
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    transition: "all 0.15s",
  },
  partHint: {
    marginTop: 8,
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
