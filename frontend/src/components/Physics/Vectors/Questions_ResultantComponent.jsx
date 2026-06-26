import { useState } from "react";

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

const WHATSAPP_NUMBER = "962799142612";

const QUESTIONS = [
  {
    id: 1,
    equation:
      "متجه له مركبة أفقية مقدارها 30 N ومركبة عمودية مقدارها 40 N. احسب مقدار المحصلة.",
    steps: [
      {
        instruction:
          "حدد القانون المناسب لحساب مقدار المحصلة من المركبة الأفقية والمركبة العمودية.",
        placeholder: "مثال: R = √(Fx² + Fy²)",
        accepted: [
          "R=√(Fx²+Fy²)",
          "R=sqrt(Fx²+Fy²)",
          "R=sqrt(Fx^2+Fy^2)",
          "R=√(Fx^2+Fy^2)",
          "R = √(Fx² + Fy²)",
        ],
        hint:
          "عندما تكون المركبتان متعامدتين نستخدم نظرية فيثاغورس: R = √(Fx² + Fy²).",
        display: "R = √(Fx² + Fy²)",
      },
      {
        instruction:
          "عوّض قيمة المركبة الأفقية 30 N وقيمة المركبة العمودية 40 N في القانون.",
        placeholder: "مثال: R = √(30² + 40²)",
        accepted: [
          "R=√(30²+40²)",
          "R=sqrt(30²+40²)",
          "R=sqrt(30^2+40^2)",
          "R=√(30^2+40^2)",
          "√(30²+40²)",
          "sqrt(30^2+40^2)",
        ],
        hint: "نعوض: R = √(30² + 40²).",
        display: "R = √(30² + 40²)",
      },
      {
        instruction:
          "احسب مقدار المحصلة النهائي.",
        placeholder: "مثال: 50 N",
        accepted: ["50N", "50 N", "50"],
        hint:
          "30² = 900 و 40² = 1600، المجموع 2500، والجذر التربيعي لـ 2500 يساوي 50.",
        display: "R = 50 N",
      },
    ],
  },
  {
    id: 2,
    equation:
      "متجه سرعة له مركبة أفقية مقدارها 6 m/s ومركبة عمودية مقدارها 8 m/s. احسب مقدار المحصلة.",
    steps: [
      {
        instruction:
          "اكتب قانون مقدار المحصلة للسرعة من المركبة الأفقية والعمودية.",
        placeholder: "مثال: V = √(Vx² + Vy²)",
        accepted: [
          "V=√(Vx²+Vy²)",
          "V=sqrt(Vx²+Vy²)",
          "V=sqrt(Vx^2+Vy^2)",
          "V=√(Vx^2+Vy^2)",
          "V = √(Vx² + Vy²)",
        ],
        hint:
          "مقدار السرعة المحصلة يحسب من: V = √(Vx² + Vy²).",
        display: "V = √(Vx² + Vy²)",
      },
      {
        instruction:
          "عوّض المركبة الأفقية 6 m/s والمركبة العمودية 8 m/s.",
        placeholder: "مثال: V = √(6² + 8²)",
        accepted: [
          "V=√(6²+8²)",
          "V=sqrt(6²+8²)",
          "V=sqrt(6^2+8^2)",
          "V=√(6^2+8^2)",
          "√(6²+8²)",
          "sqrt(6^2+8^2)",
        ],
        hint: "نعوض: V = √(6² + 8²).",
        display: "V = √(6² + 8²)",
      },
      {
        instruction:
          "احسب مقدار السرعة المحصلة.",
        placeholder: "مثال: 10 m/s",
        accepted: ["10m/s", "10 m/s", "10", "10mps", "10 mps"],
        hint:
          "6² = 36 و 8² = 64، المجموع 100، والجذر التربيعي يساوي 10.",
        display: "V = 10 m/s",
      },
    ],
  },
  {
    id: 3,
    equation:
      "قوة لها مركبة أفقية مقدارها 12 N ومركبة عمودية مقدارها 5 N. احسب مقدار المحصلة.",
    steps: [
      {
        instruction:
          "حدد قانون المحصلة باستخدام المركبتين.",
        placeholder: "مثال: R = √(Fx² + Fy²)",
        accepted: [
          "R=√(Fx²+Fy²)",
          "R=sqrt(Fx²+Fy²)",
          "R=sqrt(Fx^2+Fy^2)",
          "R=√(Fx^2+Fy^2)",
          "R = √(Fx² + Fy²)",
        ],
        hint:
          "بما أن المركبة الأفقية والعمودية متعامدتان، نستخدم فيثاغورس.",
        display: "R = √(Fx² + Fy²)",
      },
      {
        instruction:
          "عوّض القيم في القانون.",
        placeholder: "مثال: R = √(12² + 5²)",
        accepted: [
          "R=√(12²+5²)",
          "R=sqrt(12²+5²)",
          "R=sqrt(12^2+5^2)",
          "R=√(12^2+5^2)",
          "√(12²+5²)",
          "sqrt(12^2+5^2)",
        ],
        hint: "المركبة الأفقية 12 N والعمودية 5 N.",
        display: "R = √(12² + 5²)",
      },
      {
        instruction:
          "احسب الناتج النهائي للمحصلة.",
        placeholder: "مثال: 13 N",
        accepted: ["13N", "13 N", "13"],
        hint:
          "12² = 144 و 5² = 25، المجموع 169، والجذر التربيعي يساوي 13.",
        display: "R = 13 N",
      },
    ],
  },
  {
    id: 4,
    equation:
      "متجه له مركبة أفقية مقدارها 0 m ومركبة عمودية مقدارها 9 m. احسب مقدار المحصلة.",
    steps: [
      {
        instruction:
          "اكتب قانون مقدار المحصلة.",
        placeholder: "مثال: R = √(Rx² + Ry²)",
        accepted: [
          "R=√(Rx²+Ry²)",
          "R=sqrt(Rx²+Ry²)",
          "R=sqrt(Rx^2+Ry^2)",
          "R=√(Rx^2+Ry^2)",
          "R = √(Rx² + Ry²)",
        ],
        hint:
          "حتى لو كانت إحدى المركبتين صفرًا، نستخدم نفس قانون المحصلة.",
        display: "R = √(Rx² + Ry²)",
      },
      {
        instruction:
          "عوّض المركبة الأفقية 0 m والمركبة العمودية 9 m.",
        placeholder: "مثال: R = √(0² + 9²)",
        accepted: [
          "R=√(0²+9²)",
          "R=sqrt(0²+9²)",
          "R=sqrt(0^2+9^2)",
          "R=√(0^2+9^2)",
          "√(0²+9²)",
          "sqrt(0^2+9^2)",
        ],
        hint: "نعوض: R = √(0² + 9²).",
        display: "R = √(0² + 9²)",
      },
      {
        instruction:
          "احسب مقدار المحصلة.",
        placeholder: "مثال: 9 m",
        accepted: ["9m", "9 m", "9"],
        hint:
          "0² = 0 و 9² = 81، والجذر التربيعي لـ 81 يساوي 9.",
        display: "R = 9 m",
      },
    ],
  },
  {
    id: 5,
    equation:
      "قوة لها مركبة أفقية مقدارها 15 N ومركبة عمودية مقدارها 20 N. احسب مقدار المحصلة.",
    steps: [
      {
        instruction:
          "حدد العلاقة المستخدمة لحساب مقدار المحصلة.",
        placeholder: "مثال: R = √(Fx² + Fy²)",
        accepted: [
          "R=√(Fx²+Fy²)",
          "R=sqrt(Fx²+Fy²)",
          "R=sqrt(Fx^2+Fy^2)",
          "R=√(Fx^2+Fy^2)",
          "R = √(Fx² + Fy²)",
        ],
        hint:
          "المحصلة هي وتر المثلث القائم الذي ضلعاه المركبة الأفقية والمركبة العمودية.",
        display: "R = √(Fx² + Fy²)",
      },
      {
        instruction:
          "عوّض المركبة الأفقية 15 N والمركبة العمودية 20 N.",
        placeholder: "مثال: R = √(15² + 20²)",
        accepted: [
          "R=√(15²+20²)",
          "R=sqrt(15²+20²)",
          "R=sqrt(15^2+20^2)",
          "R=√(15^2+20^2)",
          "√(15²+20²)",
          "sqrt(15^2+20^2)",
        ],
        hint: "نعوض: R = √(15² + 20²).",
        display: "R = √(15² + 20²)",
      },
      {
        instruction:
          "احسب مقدار المحصلة النهائي.",
        placeholder: "مثال: 25 N",
        accepted: ["25N", "25 N", "25"],
        hint:
          "15² = 225 و 20² = 400، المجموع 625، والجذر التربيعي يساوي 25.",
        display: "R = 25 N",
      },
    ],
  },
];

function isCorrect(input, accepted) {
  const clean = input
    .trim()
    .replace(/\s+/g, "")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/°/g, "")
    .replace(/√/g, "sqrt")
    .replace(/²/g, "^2")
    .toLowerCase();

  return accepted.some((a) => {
    const cleanA = a
      .replace(/\s+/g, "")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/°/g, "")
      .replace(/√/g, "sqrt")
      .replace(/²/g, "^2")
      .toLowerCase();

    return clean === cleanA;
  });
}

export default function Questions_Resultant({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [scores, setScores] = useState(Array(5).fill(null));
  const [done, setDone] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const [notebook, setNotebook] = useState("");

  const [studentName, setStudentName] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);

  const [questionAnswers, setQuestionAnswers] = useState(
    QUESTIONS.map(() => [])
  );
  const [sentMap, setSentMap] = useState({});

  const q = QUESTIONS[qIndex];
  const step = q.steps[stepIndex];
  const totalCorrect = scores.filter(Boolean).length;

  const handleCheck = () => {
    if (!input.trim()) return;

    if (isCorrect(input, step.accepted)) {
      setStatus("correct");
      setShowHint(false);

      setQuestionAnswers((prev) => {
        const copy = prev.map((arr) => [...arr]);
        copy[qIndex][stepIndex] = input.trim();
        return copy;
      });
    } else {
      setStatus("wrong");
      setFirstTry(false);
    }
  };

  const handleNext = () => {
    if (stepIndex < q.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setInput("");
      setStatus(null);
      setShowHint(false);
    } else {
      const newScores = [...scores];
      newScores[qIndex] = firstTry;
      setScores(newScores);

      if (qIndex < QUESTIONS.length - 1) {
        setQIndex(qIndex + 1);
        setStepIndex(0);
        setInput("");
        setStatus(null);
        setShowHint(false);
        setFirstTry(true);
      } else {
        setDone(true);
      }
    }
  };

  const sendQuestionToWhatsApp = (index) => {
    const name = studentName.trim() || "طالب";
    const question = QUESTIONS[index];
    const answers = questionAnswers[index];
    const wasFirstTry = scores[index];

    const stepsText = question.steps
      .map((s, i) => {
        let ans;

        if (answers[i]) {
          ans = answers[i];
        } else if (index === qIndex && i === stepIndex && input.trim()) {
          ans = `${input.trim()} (لم يتم التحقق منها بعد)`;
        } else if (index === qIndex && i > stepIndex) {
          ans = "لم يصل الطالب لهذه الخطوة بعد";
        } else {
          ans = "—";
        }

        return `  ${i + 1}. ${s.display}\n     ✏️ إجابة الطالب: ${ans}`;
      })
      .join("\n");

    const noteText = notebook.trim() || "لا توجد ملاحظات";

    const progressLine =
      wasFirstTry === true
        ? "✅ تم حل السؤال من المحاولة الأولى"
        : wasFirstTry === false
        ? "⚠️ احتاج الطالب لتلميح أو محاولات إضافية"
        : `⏳ السؤال قيد الحل (الخطوة ${
            index === qIndex ? stepIndex + 1 : "?"
          } من ${question.steps.length})`;

    const msg =
      `📐 *تقرير سؤال ${index + 1} - المحصلة*\n` +
      `👤 *الطالب:* ${name}\n` +
      `🧮 *المسألة:* ${question.equation}\n` +
      `${progressLine}\n\n` +
      `*خطوات الحل وإجابات الطالب:*\n${stepsText}\n\n` +
      `📝 *ملاحظات الطالب:*\n${noteText}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setSentMap((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setSentMap((prev) => ({ ...prev, [index]: false }));
    }, 4000);

    if (wasFirstTry !== null) {
      setNotebook("");
    }
  };

  if (!nameConfirmed) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين فيزياء · المحصلة</div>
          <h1 style={styles.h1}>حساب المحصلة من المركبتين</h1>

          <div style={styles.nameCard}>
            <div style={styles.notebookHeader}>
              <span style={styles.notebookIcon}>👤</span>
              <div>
                <div style={styles.notebookTitle}>أدخل اسمك للبدء</div>
                <div style={styles.notebookSub}>
                  سيُستخدم اسمك في تقارير الواتساب المرسلة للمعلم بعد كل سؤال
                </div>
              </div>
            </div>

            <input
              type="text"
              placeholder="اكتب اسمك هنا..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setNameConfirmed(true)}
              style={styles.nameInput}
            />

            <button onClick={() => setNameConfirmed(true)} style={styles.nextBtn}>
              بدء التمرين ←
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);
    const grade =
      pct === 100
        ? { label: "ممتاز! أتقنت حساب المحصلة 🏆", color: COLORS.sage, bg: COLORS.sageBg }
        : pct >= 60
        ? { label: "أداء جيد جدًا، استمر بالتدريب 💪", color: COLORS.chalk, bg: COLORS.chalkBg }
        : { label: "تحتاج لمراجعة قانون المحصلة 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين المحصلة · النتيجة</div>
          <h1 style={styles.h1}>انتهى التمرين!</h1>

          <div style={{ ...styles.resultBanner, background: grade.bg, borderColor: grade.color }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {pct === 100 ? "👑" : pct >= 60 ? "⭐" : "📝"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: grade.color }}>
              {totalCorrect} / {QUESTIONS.length}
            </div>
            <div style={{ fontSize: 16, color: grade.color, marginTop: 4 }}>
              {grade.label}
            </div>
          </div>

          <div style={styles.breakdownCard}>
            <div style={styles.breakdownTitle}>تفصيل الأسئلة</div>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={styles.breakdownRow}>
                <span style={{ fontSize: 18 }}>{scores[i] ? "✅" : "❌"}</span>
                <span style={{ direction: "rtl", fontSize: 14, color: COLORS.ink }}>
                  {q.equation}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: scores[i] ? COLORS.sage : COLORS.coral,
                    fontWeight: 700,
                  }}
                >
                  {scores[i] ? "من المحاولة الأولى" : "بمساعدة أو محاولة إضافية"}
                </span>
              </div>
            ))}
          </div>

          {onFinish && (
            <button onClick={onFinish} style={styles.finishBtn}>
              العودة للوحة التحكم الرئيسية
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.eyebrow}>تمرين فيزياء · المحصلة</div>
        <h1 style={styles.h1}>حساب المحصلة من المركبة الأفقية والعمودية</h1>

        <div style={styles.progressBar}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.progressSegment,
                background:
                  i < qIndex
                    ? COLORS.sage
                    : i === qIndex
                    ? COLORS.chalk
                    : COLORS.border,
              }}
            />
          ))}
        </div>

        <div style={styles.progressLabel}>
          المسألة {qIndex + 1} من {QUESTIONS.length} · الخطوة {stepIndex + 1} من{" "}
          {q.steps.length}
        </div>

        <div style={styles.equationBox}>
          <span style={styles.equationText}>{q.equation}</span>
        </div>

        <div style={styles.notebookArea}>
          <div style={styles.notebookWriteHeader}>📝 مساحة الحل الجانبية</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="استخدم هذه المساحة لكتابة القانون، التعويض، والحسابات..."
            style={styles.notebookTextarea}
          />
        </div>

        {stepIndex > 0 && (
          <div style={styles.completedSteps}>
            {q.steps.slice(0, stepIndex).map((s, i) => (
              <div key={i} style={styles.completedStep}>
                <span style={styles.checkIcon}>✓</span>
                <span style={styles.completedFormula}>{s.display}</span>
              </div>
            ))}
          </div>
        )}

        <div style={styles.activeCard}>
          <div style={styles.stepBadge}>الخطوة {stepIndex + 1}</div>
          <div style={styles.stepInstruction}>{step.instruction}</div>

          <div style={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setStatus(null);
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && status !== "correct" && handleCheck()
              }
              placeholder={step.placeholder}
              style={{
                ...styles.answerInput,
                borderColor:
                  status === "correct"
                    ? COLORS.sage
                    : status === "wrong"
                    ? COLORS.coral
                    : COLORS.border,
                background:
                  status === "correct"
                    ? COLORS.sageBg
                    : status === "wrong"
                    ? COLORS.coralBg
                    : COLORS.paperAlt,
              }}
              disabled={status === "correct"}
            />

            {status !== "correct" && (
              <button onClick={handleCheck} style={styles.checkBtn} disabled={!input.trim()}>
                تحقق
              </button>
            )}
          </div>

          {status === "correct" && (
            <div style={styles.correctMsg}>
              ✅ إجابة صحيحة!{" "}
              <span style={{ direction: "ltr", display: "inline-block" }}>
                {step.display}
              </span>
            </div>
          )}

          {status === "wrong" && (
            <div style={styles.wrongMsg}>
              ❌ الإجابة غير مطابقة، راجع القانون أو استخدم التلميح.
            </div>
          )}

          {status === "wrong" && !showHint && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>
              💡 إظهار تلميح
            </button>
          )}

          {showHint && (
            <div style={styles.hintBox}>
              💡 <strong>تلميح:</strong> {step.hint}
            </div>
          )}

          {status === "correct" && (
            <button onClick={handleNext} style={styles.nextBtn}>
              {stepIndex < q.steps.length - 1
                ? "الخطوة التالية ←"
                : qIndex < QUESTIONS.length - 1
                ? "المسألة التالية ←"
                : "الانتقال لصفحة التقييم النهائي ←"}
            </button>
          )}
        </div>

        <div style={styles.waCard}>
          <div style={styles.notebookHeader}>
            <span style={styles.notebookIcon}>📤</span>
            <div>
              <div style={styles.notebookTitle}>إرسال هذا السؤال للمعلم</div>
              <div style={styles.notebookSub}>
                يتضمن السؤال، تقدمك الحالي، وملاحظات مساحة الحل
              </div>
            </div>
          </div>

          <button onClick={() => sendQuestionToWhatsApp(qIndex)} style={styles.waBtn}>
            <span style={styles.waIcon}>💬</span>
            إرسال تقرير السؤال {qIndex + 1} عبر واتساب
          </button>

          {sentMap[qIndex] && (
            <div style={styles.sentBanner}>
              ✓ تم الانتقال للواتساب بنجاح!
            </div>
          )}
        </div>

        <div style={styles.scoreTracker}>
          {scores.map((s, i) => (
            <div
              key={i}
              style={{
                ...styles.scoreDot,
                background:
                  s === null
                    ? i === qIndex
                      ? COLORS.chalkBg
                      : COLORS.border
                    : s
                    ? COLORS.sage
                    : COLORS.coral,
                border: i === qIndex ? `2px solid ${COLORS.chalk}` : "2px solid transparent",
                color: s === null && i === qIndex ? COLORS.chalk : "#fff",
              }}
            >
              {s === true ? "✓" : s === false ? "✕" : i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    maxWidth: 680,
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
    fontSize: "clamp(22px, 5vw, 30px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 20px",
  },
  progressBar: {
    display: "flex",
    gap: 6,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    transition: "background 0.3s",
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.inkLight,
    marginBottom: 20,
  },
  equationBox: {
    background: COLORS.ink,
    borderRadius: 14,
    padding: "18px",
    textAlign: "center",
    marginBottom: 16,
  },
  equationText: {
    direction: "rtl",
    fontSize: "clamp(18px, 4.5vw, 24px)",
    fontWeight: 700,
    color: COLORS.paper,
    lineHeight: 1.7,
  },
  completedSteps: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
  },
  completedStep: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 14px",
    background: COLORS.sageBg,
    borderRadius: 10,
    border: `1px solid ${COLORS.sage}`,
  },
  checkIcon: {
    color: COLORS.sage,
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  completedFormula: {
    direction: "ltr",
    fontSize: "clamp(13px, 3vw, 16px)",
    color: COLORS.sage,
    fontWeight: 600,
  },
  activeCard: {
    background: "#fff",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "clamp(16px, 4vw, 22px)",
    marginBottom: 20,
  },
  stepBadge: {
    display: "inline-block",
    background: COLORS.chalkBg,
    color: COLORS.chalk,
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 20,
    marginBottom: 10,
  },
  stepInstruction: {
    fontSize: "clamp(14px, 2.8vw, 16px)",
    color: COLORS.ink,
    lineHeight: 1.7,
    marginBottom: 14,
    fontWeight: 600,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
  },
  answerInput: {
    flex: 1,
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid",
    fontSize: 15,
    direction: "ltr",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  },
  checkBtn: {
    background: COLORS.chalk,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "11px 18px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    flexShrink: 0,
  },
  correctMsg: {
    background: COLORS.sageBg,
    color: COLORS.sage,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 12,
    border: `1px solid ${COLORS.sage}`,
  },
  wrongMsg: {
    background: COLORS.coralBg,
    color: COLORS.coral,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    border: `1px solid ${COLORS.coral}`,
  },
  hintBtn: {
    background: COLORS.goldBg,
    color: COLORS.gold,
    border: `1px solid ${COLORS.gold}`,
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    marginBottom: 10,
  },
  hintBox: {
    background: COLORS.goldBg,
    color: "#7a5a1a",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.7,
    marginBottom: 10,
    border: `1px solid ${COLORS.gold}`,
  },
  nextBtn: {
    display: "block",
    width: "100%",
    background: COLORS.chalk,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "13px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    marginTop: 4,
  },
  scoreTracker: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
  },
  scoreDot: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    transition: "all 0.3s",
  },
  resultBanner: {
    borderRadius: 16,
    padding: "28px",
    textAlign: "center",
    marginBottom: 20,
    border: "2px solid",
  },
  breakdownCard: {
    background: "#fff",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "clamp(14px, 4vw, 20px)",
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.inkLight,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  breakdownRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 0",
    borderBottom: `1px solid ${COLORS.border}`,
    justifyContent: "space-between",
  },
  nameCard: {
    background: "#fff",
    border: `2px dashed ${COLORS.gold}`,
    borderRadius: 16,
    padding: "clamp(14px, 4vw, 22px)",
    marginBottom: 20,
  },
  waCard: {
    background: "#fff",
    border: `2px dashed ${COLORS.gold}`,
    borderRadius: 16,
    padding: "clamp(14px, 4vw, 22px)",
    marginBottom: 20,
  },
  notebookHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  notebookIcon: {
    fontSize: 30,
    flexShrink: 0,
  },
  notebookTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 2,
  },
  notebookSub: {
    fontSize: 12,
    color: COLORS.inkLight,
  },
  nameInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    fontSize: 14,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    background: COLORS.paperAlt,
    color: COLORS.ink,
    marginBottom: 10,
    boxSizing: "border-box",
    outline: "none",
  },
  waBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    background: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "13px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  waIcon: {
    fontSize: 18,
  },
  sentBanner: {
    marginTop: 10,
    background: "#E8F9EE",
    color: "#1a7a3f",
    borderRadius: 10,
    padding: "11px 14px",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 700,
    border: "1px solid #a8e6bf",
  },
  finishBtn: {
    background: COLORS.coral,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  notebookArea: {
    background: "#fff",
    border: `2px solid ${COLORS.border}`,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  notebookWriteHeader: {
    background: COLORS.paperAlt,
    padding: "12px 16px",
    fontWeight: 700,
    color: COLORS.ink,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  notebookTextarea: {
    width: "100%",
    minHeight: "220px",
    border: "none",
    outline: "none",
    resize: "vertical",
    padding: "20px",
    fontSize: "18px",
    lineHeight: "40px",
    fontFamily: "'Amiri', serif",
    direction: "rtl",
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(to bottom, transparent 39px, #e0e0e0 40px)",
    backgroundSize: "100% 40px",
    boxSizing: "border-box",
  },
};