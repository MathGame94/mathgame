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
    equation: "x² + 5x + 6 = 0",
    steps: [
      {
        instruction: "ابحث عن رقمين حاصل ضربهما 6 ومجموعهما 5 واكتبهما بالفراغ (مثال: 2 و 3)",
        placeholder: "مثال: 2 و 3",
        accepted: ["2 و 3", "3 و 2", "2 و3", "3 و2", "2,3", "3,2"],
        hint: "فكر: ما هما الرقمان اللذان إذا ضربناهما نتج 6 وإذا جمعناهما نتج 5؟ (2 × 3 = 6 و 2 + 3 = 5)",
        display: "الرقمان هما: 2 و 3",
      },
      {
        instruction: "حلّل المعادلة إلى قوسين (عوامل)",
        placeholder: "مثال: (x + 2)(x + 3)",
        accepted: ["(x+2)(x+3)", "(x+3)(x+2)", "(x + 2)(x + 3)", "(x + 3)(x + 2)"],
        hint: "نضع الرقمين داخل الأقواس مع إشارة الموجب لأن كل الحدود موجبة → (x + 2)(x + 3) = 0",
        display: "(x + 2)(x + 3) = 0",
      },
      {
        instruction: "اجعل كل عامل يساوي صفر واكتب قيم x النهائية",
        placeholder: "مثال: x = -2 أو x = -3",
        accepted: ["x=-2 أو x=-3", "x=-3 أو x=-2", "x = -2 أو x = -3", "-2 و -3", "-3 و -2"],
        hint: "اعكس إشارة الأرقام داخل الأقواس: x + 2 = 0 تعطي x = -2، و x + 3 = 0 تعطي x = -3",
        display: "x = -2 أو x = -3",
      },
    ],
  },
  {
    id: 2,
    equation: "x² + 7x + 12 = 0",
    steps: [
      {
        instruction: "ابحث عن رقمين حاصل ضربهما 12 ومجموعهما 7",
        placeholder: "مثال: 3 و 4",
        accepted: ["3 و 4", "4 و 3", "3 و4", "4 و3", "3,4", "4,3"],
        hint: "فكر: رقمين ضربهما 12 ومجموعهما 7؟ (3 × 4 = 12 و 3 + 4 = 7)",
        display: "الرقمان هما: 3 و 4",
      },
      {
        instruction: "حلّل المعادلة إلى قوسين",
        placeholder: "مثال: (x + 3)(x + 4)",
        accepted: ["(x+3)(x+4)", "(x+4)(x+3)", "(x + 3)(x + 4)", "(x + 4)(x + 3)"],
        hint: "نضع الأرقام داخل الأقواس → (x + 3)(x + 4) = 0",
        display: "(x + 3)(x + 4) = 0",
      },
      {
        instruction: "اكتب قيم x النهائية",
        placeholder: "مثال: x = -3 أو x = -4",
        accepted: ["x=-3 أو x=-4", "x=-4 أو x=-3", "x = -3 أو x = -4", "-3 و -4", "-4 و -3"],
        hint: "نعكس الإشارات دائماً عند إيجاد قيم x: الحلان هما -3 و -4",
        display: "x = -3 أو x = -4",
      },
    ],
  },
  {
    id: 3,
    equation: "x² − 5x + 4 = 0",
    steps: [
      {
        instruction: "بما أن الأوسط سالب والأخير موجب، ابحث عن رقمين سالبين حاصل ضربهما 4 ومجموعهما -5",
        placeholder: "مثال: -1 و -4",
        accepted: ["-1 و -4", "-4 و -1", "-1 و-4", "-4 و-1", "-1,-4", "-4,-1"],
        hint: "سالب × سالب = موجب. الرقمان هما -1 و -4 لأن (-1 × -4 = 4) و (-1 + -4 = -5)",
        display: "الرقمان هما: -1 و -4",
      },
      {
        instruction: "حلّل المعادلة إلى قوسين مع مراعاة الإشارات السلبية",
        placeholder: "مثال: (x - 1)(x - 4)",
        accepted: ["(x-1)(x-4)", "(x-4)(x-1)", "(x - 1)(x - 4)", "(x - 4)(x - 1)"],
        hint: "الأرقام سالبة إذن نضع ناقص داخل الأقواس → (x - 1)(x - 4) = 0",
        display: "(x - 1)(x - 4) = 0",
      },
      {
        instruction: "اكتب قيم x النهائية",
        placeholder: "مثال: x = 1 أو x = 4",
        accepted: ["x=1 أو x=4", "x=4 أو x=1", "x = 1 أو x = 4", "1 و 4", "4 و 1"],
        hint: "x - 1 = 0 تعطي x = 1، و x - 4 = 0 تعطي x = 4 (الإشارات تصبح موجبة)",
        display: "x = 1 أو x = 4",
      },
    ],
  },
  {
    id: 4,
    equation: "x² + 2x − 8 = 0",
    steps: [
      {
        instruction: "بما أن الأخير سالب، ابحث عن رقمين أحدهما موجب والآخر سالب ضربهما -8 ومجموعهما 2",
        placeholder: "مثال: 4 و -2",
        accepted: ["4 و -2", "-2 و 4", "4 و-2", "-2 و4", "4,-2", "-2,4"],
        hint: "الرقم الأكبر يأخذ إشارة الأوسط (موجب). (4 × -2 = -8) و (4 + -2 = 2)",
        display: "الرقمان هما: 4 و -2",
      },
      {
        instruction: "حلّل المعادلة إلى قوسين بالإشارات الصحيحة",
        placeholder: "مثال: (x + 4)(x - 2)",
        accepted: ["(x+4)(x-2)", "(x-2)(x+4)", "(x + 4)(x - 2)", "(x - 2)(x + 4)"],
        hint: "الأربعة موجبة والاثنين سالبة → (x + 4)(x - 2) = 0",
        display: "(x + 4)(x - 2) = 0",
      },
      {
        instruction: "اكتب قيم x النهائية",
        placeholder: "مثال: x = -4 أو x = 2",
        accepted: ["x=-4 أو x=2", "x=2 أو x=-4", "x = -4 أو x = 2", "-4 و 2", "2 و -4"],
        hint: "نعكس الإشارات: الموجب 4 يصبح -4، والسالب 2 يصبح 2",
        display: "x = -4 أو x = 2",
      },
    ],
  },
  {
    id: 5,
    equation: "x² − 3x − 10 = 0",
    steps: [
      {
        instruction: "ابحث عن رقمين ضربهما -10 ومجموعهما -3 (الأكبر سالب)",
        placeholder: "مثال: -5 و 2",
        accepted: ["-5 و 2", "2 و -5", "-5 و2", "2 و-5", "-5,2", "2,-5"],
        hint: "الرقم الأكبر سالب لأن الأوسط سالب. (-5 × 2 = -10) و (-5 + 2 = -3)",
        display: "الرقمان هما: -5 و 2",
      },
      {
        instruction: "حلّل المعادلة إلى قوسين",
        placeholder: "مثال: (x - 5)(x + 2)",
        accepted: ["(x-5)(x+2)", "(x+2)(x-5)", "(x - 5)(x + 2)", "(x + 2)(x - 5)"],
        hint: "الخمسة سالبة والاثنين موجبة → (x - 5)(x + 2) = 0",
        display: "(x - 5)(x + 2) = 0",
      },
      {
        instruction: "اكتب قيم x النهائية",
        placeholder: "مثال: x = 5 أو x = -2",
        accepted: ["x=5 أو x=-2", "x=-2 أو x=5", "x = 5 أو x = -2", "5 و -2", "-2 و 5"],
        hint: "نعكس الإشارات للحلول النهائية: الحلان هما 5 و -2",
        display: "x = 5 أو x = -2",
      },
    ],
  },
];

function isCorrect(input, accepted) {
  const clean = input.trim().replace(/\s+/g, "").replace(/−/g, "-").replace(/×/g, "*");
  return accepted.some((a) => {
    const cleanA = a.replace(/\s+/g, "").replace(/−/g, "-").replace(/×/g, "*");
    return clean === cleanA;
  });
}

export default function Questions_AEquals1({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [scores, setScores] = useState(Array(5).fill(null));
  const [done, setDone] = useState(false);
  const [firstTry, setFirstTry] = useState(true);
  const [notebook, setNotebook] = useState("");

  // ── Student name: collected once at the start ──
  const [studentName, setStudentName] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);

  // ── Per-question answers log (for the WhatsApp report) ──
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
        } else if (index !== qIndex && i >= answers.length) {
          ans = "لم يصل الطالب لهذه الخطوة بعد";
        } else {
          ans = "—";
        }
        return `  ${i + 1}. ${s.display}\n     ✏️ إجابة الطالب: ${ans}`;
      })
      .join("\n");

    const noteText = notebook.trim() || "لا توجد ملاحظات";

    const progressLine =
      wasFirstTry === true ? "✅ تم حل السؤال من المحاولة الأولى" :
      wasFirstTry === false ? "⚠️ احتاج الطالب لتلميح/محاولات إضافية" :
      `⏳ السؤال قيد الحل (الخطوة ${index === qIndex ? stepIndex + 1 : "?"} من ${question.steps.length})`;

    const msg =
      `📐 *تقرير سؤال ${index + 1} - العبارة التربيعية (a=1)*\n` +
      `👤 *الطالب:* ${name}\n` +
      `🧮 *المعادلة:* ${question.equation}\n` +
      `${progressLine}\n\n` +
      `*خطوات الحل وإجابات الطالب:*\n${stepsText}\n\n` +
      `📝 *ملاحظات الطالب (المفكرة):*\n${noteText}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setSentMap((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setSentMap((prev) => ({ ...prev, [index]: false }));
    }, 4000);
  };

  // ── Name entry screen ──
  if (!nameConfirmed) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين · العبارة التربيعية ثلاثية الحدود</div>
          <h1 style={styles.h1}>حل خطوة بخطوة</h1>

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
      pct === 100 ? { label: "ممتاز! 🌟", color: COLORS.sage, bg: COLORS.sageBg } :
      pct >= 60  ? { label: "جيد، واصل! 💪", color: COLORS.chalk, bg: COLORS.chalkBg } :
                   { label: "راجع الدرس وحاول مجدداً 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين العبارة التربيعية · النتيجة</div>
          <h1 style={styles.h1}>انتهى التمرين!</h1>

          <div style={{ ...styles.resultBanner, background: grade.bg, borderColor: grade.color }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📚"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: grade.color }}>{totalCorrect} / {QUESTIONS.length}</div>
            <div style={{ fontSize: 16, color: grade.color, marginTop: 4 }}>{grade.label}</div>
          </div>

          <div style={styles.breakdownCard}>
            <div style={styles.breakdownTitle}>تفصيل الأسئلة</div>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={styles.breakdownRow}>
                <span style={{ fontSize: 18 }}>{scores[i] ? "✅" : "❌"}</span>
                <span style={{ fontFamily: "Georgia, serif", direction: "ltr", fontSize: 15, color: COLORS.ink }}>
                  {q.equation}
                </span>
                <span style={{ fontSize: 12, color: scores[i] ? COLORS.sage : COLORS.coral, fontWeight: 700 }}>
                  {scores[i] ? "من أول مرة" : "احتاج مساعدة"}
                </span>
              </div>
            ))}
          </div>

          {onFinish && (
            <button onClick={onFinish} style={styles.finishBtn}>
              العودة للقائمة الرئيسية ←
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.eyebrow}>تمرين · العبارة التربيعية ثلاثية الحدود</div>
        <h1 style={styles.h1}>حل خطوة بخطوة</h1>

        <div style={styles.progressBar}>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.progressSegment,
                background:
                  i < qIndex ? COLORS.sage :
                  i === qIndex ? COLORS.chalk :
                  COLORS.border,
              }}
            />
          ))}
        </div>
        <div style={styles.progressLabel}>
          السؤال {qIndex + 1} من {QUESTIONS.length} · الخطوة {stepIndex + 1} من {q.steps.length}
        </div>

        <div style={styles.equationBox}>
          <span style={styles.equationText}>{q.equation}</span>
        </div>

        <div style={styles.notebookArea}>
          <div style={styles.notebookWriteHeader}>📝 دفتر الحل والمسوّدة</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="اكتب تجاربك للأرقام هنا قبل إدخال الإجابة الرسمية..."
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
              onChange={(e) => { setInput(e.target.value); setStatus(null); }}
              onKeyDown={(e) => e.key === "Enter" && status !== "correct" && handleCheck()}
              placeholder={step.placeholder}
              style={{
                ...styles.answerInput,
                borderColor:
                  status === "correct" ? COLORS.sage :
                  status === "wrong" ? COLORS.coral :
                  COLORS.border,
                background:
                  status === "correct" ? COLORS.sageBg :
                  status === "wrong" ? COLORS.coralBg :
                  COLORS.paperAlt,
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
              ✅ إجابة صحيحة! <span style={{ fontFamily: "Georgia, serif", direction: "ltr" }}>{step.display}</span>
            </div>
          )}
          {status === "wrong" && (
            <div style={styles.wrongMsg}>
              ❌ إجابة خاطئة، تأكد من الإشارات أو الأرقام وحاول مجدداً
            </div>
          )}

          {status === "wrong" && !showHint && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>
              💡 أظهر تلميح
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
                ? "السؤال التالي ←"
                : "عرض النتيجة ←"}
            </button>
          )}
        </div>

        {/* ── Per-question WhatsApp send button ── */}
        <div style={styles.waCard}>
          <div style={styles.notebookHeader}>
            <span style={styles.notebookIcon}>📤</span>
            <div>
              <div style={styles.notebookTitle}>إرسال هذا السؤال للمعلم</div>
              <div style={styles.notebookSub}>
                يتضمن السؤال، تقدمك الحالي، وملاحظات المفكرة
              </div>
            </div>
          </div>
          <button onClick={() => sendQuestionToWhatsApp(qIndex)} style={styles.waBtn}>
            <span style={styles.waIcon}>💬</span>
            إرسال تقرير السؤال {qIndex + 1} عبر واتساب
          </button>
          {sentMap[qIndex] && (
            <div style={styles.sentBanner}>✓ تم الانتقال للواتساب بنجاح!</div>
          )}
        </div>

        <div style={styles.scoreTracker}>
          {scores.map((s, i) => (
            <div key={i} style={{
              ...styles.scoreDot,
              background: s === null
                ? (i === qIndex ? COLORS.chalkBg : COLORS.border)
                : s ? COLORS.sage : COLORS.coral,
              border: i === qIndex ? `2px solid ${COLORS.chalk}` : "2px solid transparent",
            }}>
              {s === true ? "✓" : s === false ? "✗" : i + 1}
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
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(22px, 5.5vw, 30px)",
    fontWeight: 700,
    color: COLORS.paper,
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
    fontFamily: "Georgia, serif",
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
    fontFamily: "Georgia, serif",
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
    transition: "opacity 0.2s",
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
    color: "#fff",
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
  notebookIcon: { fontSize: 30, flexShrink: 0 },
  notebookTitle: { fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 2 },
  notebookSub: { fontSize: 12, color: COLORS.inkLight },
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
  waIcon: { fontSize: 18 },
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
