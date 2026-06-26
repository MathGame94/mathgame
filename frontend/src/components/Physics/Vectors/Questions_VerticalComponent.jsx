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
    equation: "قوة مقدارها 50 N تؤثر بزاوية 30° مع الاتجاه الأفقي. احسب المركبة العمودية.",
    steps: [
      {
        instruction: "حدد القانون المناسب لحساب المركبة العمودية عندما تكون الزاوية مقاسة من الاتجاه الأفقي.",
        placeholder: "مثال: Fy = F sin θ",
        accepted: ["Fy=Fsinθ", "Fy=F sin θ", "Fy=F*sinθ", "Fy=F*sin(theta)", "Fy=Fsin(theta)"],
        hint: "عندما تكون الزاوية مع الاتجاه الأفقي نستخدم الجيب: Fy = F sin θ.",
        display: "Fy = F sin θ",
      },
      {
        instruction: "عوّض مقدار القوة والزاوية في القانون.",
        placeholder: "مثال: Fy = 50 sin 30",
        accepted: ["Fy=50sin30", "Fy=50 sin 30", "Fy=50*sin30", "50sin30", "50 sin 30", "50*sin30"],
        hint: "القوة مقدارها 50 N والزاوية 30°، إذن: Fy = 50 sin 30°.",
        display: "Fy = 50 sin 30°",
      },
      {
        instruction: "احسب الناتج النهائي للمركبة العمودية. تذكر أن sin 30° = 0.5.",
        placeholder: "مثال: 25 N",
        accepted: ["25N", "25 N", "25"],
        hint: "Fy = 50 × 0.5 = 25 N.",
        display: "Fy = 25 N",
      },
    ],
  },
  {
    id: 2,
    equation: "متجه سرعة مقداره 20 m/s يصنع زاوية 60° مع الاتجاه الأفقي. احسب المركبة العمودية للسرعة.",
    steps: [
      {
        instruction: "اكتب قانون المركبة العمودية للسرعة.",
        placeholder: "مثال: Vy = V sin θ",
        accepted: ["Vy=Vsinθ", "Vy=V sin θ", "Vy=V*sinθ", "Vy=V*sin(theta)", "Vy=Vsin(theta)"],
        hint: "المركبة العمودية للسرعة هي: Vy = V sin θ.",
        display: "Vy = V sin θ",
      },
      {
        instruction: "عوّض مقدار السرعة والزاوية.",
        placeholder: "مثال: Vy = 20 sin 60",
        accepted: ["Vy=20sin60", "Vy=20 sin 60", "Vy=20*sin60", "20sin60", "20 sin 60", "20*sin60"],
        hint: "مقدار السرعة 20 m/s والزاوية 60°، إذن: Vy = 20 sin 60°.",
        display: "Vy = 20 sin 60°",
      },
      {
        instruction: "احسب الناتج النهائي. اعتبر sin 60° ≈ 0.866.",
        placeholder: "مثال: 17.3 m/s",
        accepted: ["17.3m/s", "17.3 m/s", "17.30m/s", "17.30 m/s", "17.3", "17.30"],
        hint: "Vy = 20 × 0.866 = 17.3 m/s تقريبًا.",
        display: "Vy ≈ 17.3 m/s",
      },
    ],
  },
  {
    id: 3,
    equation: "قوة مقدارها 100 N تؤثر بزاوية 45° مع الاتجاه الأفقي. احسب المركبة العمودية.",
    steps: [
      {
        instruction: "حدد العلاقة التي نستخدمها لإيجاد المركبة العمودية.",
        placeholder: "مثال: Fy = F sin θ",
        accepted: ["Fy=Fsinθ", "Fy=F sin θ", "Fy=F*sinθ", "Fy=F*sin(theta)", "Fy=Fsin(theta)"],
        hint: "لأن الزاوية مع الأفقي، نستخدم sin للمركبة العمودية.",
        display: "Fy = F sin θ",
      },
      {
        instruction: "عوّض القيم في القانون.",
        placeholder: "مثال: Fy = 100 sin 45",
        accepted: ["Fy=100sin45", "Fy=100 sin 45", "Fy=100*sin45", "100sin45", "100 sin 45", "100*sin45"],
        hint: "القوة 100 N والزاوية 45°، إذن: Fy = 100 sin 45°.",
        display: "Fy = 100 sin 45°",
      },
      {
        instruction: "احسب المركبة العمودية. اعتبر sin 45° ≈ 0.707.",
        placeholder: "مثال: 70.7 N",
        accepted: ["70.7N", "70.7 N", "70.70N", "70.70 N", "70.7", "70.70"],
        hint: "Fy = 100 × 0.707 = 70.7 N تقريبًا.",
        display: "Fy ≈ 70.7 N",
      },
    ],
  },
  {
    id: 4,
    equation: "إزاحة مقدارها 80 m بزاوية 0° مع الاتجاه الأفقي. احسب المركبة العمودية للإزاحة.",
    steps: [
      {
        instruction: "اكتب قانون المركبة العمودية للإزاحة.",
        placeholder: "مثال: Dy = D sin θ",
        accepted: ["Dy=Dsinθ", "Dy=D sin θ", "Dy=D*sinθ", "Dy=D*sin(theta)", "Dy=Dsin(theta)"],
        hint: "المركبة العمودية لأي متجه تساوي مقدار المتجه مضروبًا في sin الزاوية.",
        display: "Dy = D sin θ",
      },
      {
        instruction: "عوّض مقدار الإزاحة والزاوية.",
        placeholder: "مثال: Dy = 80 sin 0",
        accepted: ["Dy=80sin0", "Dy=80 sin 0", "Dy=80*sin0", "80sin0", "80 sin 0", "80*sin0"],
        hint: "الإزاحة 80 m والزاوية 0°، إذن: Dy = 80 sin 0°.",
        display: "Dy = 80 sin 0°",
      },
      {
        instruction: "احسب الناتج النهائي. تذكر أن sin 0° = 0.",
        placeholder: "مثال: 0 m",
        accepted: ["0m", "0 m", "0", "صفر", "صفر m"],
        hint: "Dy = 80 × 0 = 0 m، أي لا توجد مركبة عمودية.",
        display: "Dy = 0 m",
      },
    ],
  },
  {
    id: 5,
    equation: "قوة مقدارها 75 N تؤثر بزاوية 90° مع الاتجاه الأفقي. احسب المركبة العمودية.",
    steps: [
      {
        instruction: "حدد قانون المركبة العمودية.",
        placeholder: "مثال: Fy = F sin θ",
        accepted: ["Fy=Fsinθ", "Fy=F sin θ", "Fy=F*sinθ", "Fy=F*sin(theta)", "Fy=Fsin(theta)"],
        hint: "نستخدم Fy = F sin θ عندما تكون الزاوية مع الاتجاه الأفقي.",
        display: "Fy = F sin θ",
      },
      {
        instruction: "عوّض مقدار القوة والزاوية في القانون.",
        placeholder: "مثال: Fy = 75 sin 90",
        accepted: ["Fy=75sin90", "Fy=75 sin 90", "Fy=75*sin90", "75sin90", "75 sin 90", "75*sin90"],
        hint: "القوة 75 N والزاوية 90°، إذن: Fy = 75 sin 90°.",
        display: "Fy = 75 sin 90°",
      },
      {
        instruction: "احسب الناتج النهائي. تذكر أن sin 90° = 1.",
        placeholder: "مثال: 75 N",
        accepted: ["75N", "75 N", "75"],
        hint: "Fy = 75 × 1 = 75 N.",
        display: "Fy = 75 N",
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
    .toLowerCase();

  return accepted.some((a) => {
    const cleanA = a
      .replace(/\s+/g, "")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/°/g, "")
      .toLowerCase();

    return clean === cleanA;
  });
}

export default function Questions_VerticalComponent({ onFinish }) {
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
      `📐 *تقرير سؤال ${index + 1} - المركبة العمودية*\n` +
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
          <div style={styles.eyebrow}>تمرين فيزياء · المركبة العمودية</div>
          <h1 style={styles.h1}>حساب المركبة العمودية للمتجه</h1>

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
        ? { label: "ممتاز! أتقنت حساب المركبة العمودية 🏆", color: COLORS.sage, bg: COLORS.sageBg }
        : pct >= 60
        ? { label: "أداء جيد جدًا، استمر بالتدريب 💪", color: COLORS.chalk, bg: COLORS.chalkBg }
        : { label: "تحتاج لمراجعة قانون المركبة العمودية 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين المركبة العمودية · النتيجة</div>
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
        <div style={styles.eyebrow}>تمرين فيزياء · المركبة العمودية</div>
        <h1 style={styles.h1}>حساب المركبة العمودية للمتجه</h1>

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