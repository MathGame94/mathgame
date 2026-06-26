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

// ── 5 Questions: ax² + bx + c = 0 where a > 1 (Factoring by Grouping) ──
const QUESTIONS = [
  {
    id: 1,
    equation: "2x² + 7x + 3 = 0",
    steps: [
      {
        instruction: "اضرب معامل x² (وهو 2) في الحد الثابت (وهو 3) ليصبح الناتج 6. الآن، ابحث عن رقمين ضربهما 6 ومجموعهما 7 (معامل الحد الأوسط).",
        placeholder: "مثال: 6 و 1",
        accepted: ["6 و 1", "1 و 6", "6 و1", "1 و6", "6,1", "1,6"],
        hint: "نبحث عن رقمين حاصل ضربهما 6 ومجموعهما 7 → 6 × 1 = 6 و 6 + 1 = 7.",
        display: "الرقمان هما: 6 و 1",
      },
      {
        instruction: "أعد كتابة العبارة بتفكيك الحد الأوسط (7x) إلى (6x + 1x). اكتب الشكل الجديد للمعادلة المكونة من 4 حدود.",
        placeholder: "مثال: 2x² + 6x + x + 3",
        accepted: ["2x²+6x+x+3", "2x² + 6x + x + 3", "2x²+x+6x+3", "2x² + x + 6x + 3"],
        hint: "استبدل 7x بـ 6x + x لتصبح العبارة: 2x² + 6x + x + 3 = 0",
        display: "2x² + 6x + x + 3 = 0",
      },
      {
        instruction: "خذ عاملاً مشتركاً من أول حدين ومن آخر حدين لتجميع الأقواس.",
        placeholder: "مثال: 2x(x + 3) + 1(x + 3)",
        accepted: ["2x(x+3)+1(x+3)", "2x(x + 3) + 1(x + 3)", "2x(x+3)+(x+3)"],
        hint: "من (2x² + 6x) العامل المشترك هو 2x فيبقى (x + 3)، ومن (x + 3) العامل هو 1 فيبقى (x + 3).",
        display: "2x(x + 3) + 1(x + 3) = 0",
      },
      {
        instruction: "الآن خذ القوس المشترك (x + 3) كعامل واكتب القوسين النهائيين الحاصلين.",
        placeholder: "مثال: (x + 3)(2x + 1)",
        accepted: ["(x+3)(2x+1)", "(2x+1)(x+3)", "(x + 3)(2x + 1)", "(2x + 1)(x + 3)"],
        hint: "نجمع العوامل الخارجية في قوس واحد لتصبح: (x + 3)(2x + 1) = 0",
        display: "(x + 3)(2x + 1) = 0",
      },
    ],
  },
  {
    id: 2,
    equation: "3x² + 5x + 2 = 0",
    steps: [
      {
        instruction: "اضرب 3 في 2 الناتج 6. ابحث عن رقمين ضربهما 6 ومجموعهما 5.",
        placeholder: "مثال: 3 و 2",
        accepted: ["3 و 2", "2 و 3", "3 و2", "2 و3", "3,2", "2,3"],
        hint: "3 × 2 = 6 و 3 + 2 = 5. الرقمين هما 3 و 2.",
        display: "الرقمان هما: 3 و 2",
      },
      {
        instruction: "فكك الحد الأوسط واكتب العبارة بأربعة حدود.",
        placeholder: "مثال: 3x² + 3x + 2x + 2",
        accepted: ["3x²+3x+2x+2", "3x² + 3x + 2x + 2", "3x²+2x+3x+2"],
        hint: "استبدل 5x بـ 3x + 2x لتصبح: 3x² + 3x + 2x + 2 = 0",
        display: "3x² + 3x + 2x + 2 = 0",
      },
      {
        instruction: "خذ العامل المشترك من المجموعتين.",
        placeholder: "مثال: 3x(x + 1) + 2(x + 1)",
        accepted: ["3x(x+1)+2(x+1)", "3x(x + 1) + 2(x + 1)"],
        hint: "من أول حدين المشترك 3x فيبقى (x+1)، ومن آخر حدين المشترك 2 فيبقى (x+1).",
        display: "3x(x + 1) + 2(x + 1) = 0",
      },
      {
        instruction: "اكتب الأقواس النهائية للتحليل التام.",
        placeholder: "مثال: (x + 1)(3x + 2)",
        accepted: ["(x+1)(3x+2)", "(3x+2)(x+1)", "(x + 1)(3x + 2)"],
        hint: "نأخذ القوس المتكرر كعامل مشترك فينتج: (x + 1)(3x + 2) = 0",
        display: "(x + 1)(3x + 2) = 0",
      },
    ],
  },
  {
    id: 3,
    equation: "2x² + 5x − 3 = 0",
    steps: [
      {
        instruction: "اضرب 2 في -3 الناتج -6. ابحث عن رقمين ضربهما -6 ومجموعهما 5.",
        placeholder: "مثال: 6 و -1",
        accepted: ["6 و -1", "-1 و 6", "6 و-1", "-1 و6", "6,-1", "-1,6"],
        hint: "بما أن الضرب سالب، فالرقمين مختلفين بالإشارة: (6 × -1 = -6) و (6 + -1 = 5).",
        display: "الرقمان هما: 6 و -1",
      },
      {
        instruction: "فكك الحد الأوسط (5x) إلى (6x - 1x) واكتب العبارة الجديدة.",
        placeholder: "مثال: 2x² + 6x - x - 3",
        accepted: ["2x²+6x-x-3", "2x² + 6x - x - 3", "2x²-x+6x-3"],
        hint: "نكتب العبارة على صورة: 2x² + 6x - x - 3 = 0",
        display: "2x² + 6x - x - 3 = 0",
      },
      {
        instruction: "قم بالتجميع وأخذ العامل المشترك الأكبر (انتبه للإشارة السالبة في المجموعة الثانية).",
        placeholder: "مثال: 2x(x + 3) - 1(x + 3)",
        accepted: ["2x(x+3)-1(x+3)", "2x(x + 3) - 1(x + 3)", "2x(x+3)-(x+3)"],
        hint: "المجموعة الأولى تعطي 2x(x+3)، والمجموعة الثانية بسحب السالب 1 تعطي -1(x+3).",
        display: "2x(x + 3) - 1(x + 3) = 0",
      },
      {
        instruction: "اكتب العوامل النهائية في الأقواس.",
        placeholder: "مثال: (x + 3)(2x - 1)",
        accepted: ["(x+3)(2x-1)", "(2x-1)(x+3)", "(x + 3)(2x - 1)"],
        hint: "القوس المشترك هو (x+3) والقوس الثاني يحتوي البواقي: (x + 3)(2x - 1) = 0",
        display: "(x + 3)(2x - 1) = 0",
      },
    ],
  },
  {
    id: 4,
    equation: "4x² − 8x + 3 = 0",
    steps: [
      {
        instruction: "اضرب 4 في 3 الناتج 12. ابحث عن رقمين ضربهما 12 ومجموعهما -8.",
        placeholder: "مثال: -6 و -2",
        accepted: ["-6 و -2", "-2 و -6", "-6 و-2", "-2 و-6", "-6,-2", "-2,-6"],
        hint: "الضرب موجب والمجموع سالب يعني الرقمين سالبين: (-6 × -2 = 12) و (-6 + -2 = -8).",
        display: "الرقمان هما: -6 و -2",
      },
      {
        instruction: "فكك الحد الأوسط واكتب العبارة الرباعية الحدود.",
        placeholder: "مثال: 4x² - 6x - 2x + 3",
        accepted: ["4x²-6x-2x+3", "4x² - 6x - 2x + 3", "4x²-2x-6x+3"],
        hint: "نعيد كتابتها: 4x² - 6x - 2x + 3 = 0",
        display: "4x² - 6x - 2x + 3 = 0",
      },
      {
        instruction: "خذ العوامل المشتركة بالتجميع (سحب إشارة سالبة من المجموعة الثانية يعكس ما بداخلها).",
        placeholder: "مثال: 2x(2x - 3) - 1(2x - 3)",
        accepted: ["2x(2x-3)-1(2x-3)", "2x(2x - 3) - 1(2x - 3)"],
        hint: "من أول حدين نأخذ 2x فيبقى (2x-3)، ومن آخر حدين نسحب -1 فيبقى (2x-3).",
        display: "2x(2x - 3) - 1(2x - 3) = 0",
      },
      {
        instruction: "اكتب الأقواس النهائية للتحليل.",
        placeholder: "مثال: (2x - 3)(2x - 1)",
        accepted: ["(2x-3)(2x-1)", "(2x-1)(2x-3)", "(2x - 3)(2x - 1)"],
        hint: "العوامل مجمعة تعطي: (2x - 3)(2x - 1) = 0",
        display: "(2x - 3)(2x - 1) = 0",
      },
    ],
  },
  {
    id: 5,
    equation: "3x² − 2x − 5 = 0",
    steps: [
      {
        instruction: "اضرب 3 في -5 الناتج -15. ابحث عن رقمين ضربهما -15 ومجموعهما -2.",
        placeholder: "مثال: -5 و 3",
        accepted: ["-5 و 3", "3 و -5", "-5 و3", "3 و-5", "-5,3", "3,-5"],
        hint: "العدد الأكبر سالب لأن المجموع سالب: (-5 × 3 = -15) و (-5 + 3 = -2).",
        display: "الرقمان هما: -5 و 3",
      },
      {
        instruction: "فكك الحد الأوسط واكتب العبارة بأربعة حدود.",
        placeholder: "مثال: 3x² + 3x - 5x - 5",
        accepted: ["3x²+3x-5x-5", "3x² + 3x - 5x - 5", "3x²-5x+3x-5"],
        hint: "يفضل ترتيبها لتسهيل المشترك: 3x² + 3x - 5x - 5 = 0",
        display: "3x² + 3x - 5x - 5 = 0",
      },
      {
        instruction: "خذ العامل المشترك من كل مجموعتين بالتجميع.",
        placeholder: "مثال: 3x(x + 1) - 5(x + 1)",
        accepted: ["3x(x+1)-5(x+1)", "3x(x + 1) - 5(x + 1)"],
        hint: "أول حدين يعطيان 3x(x+1) وآخر حدين بسحب -5 ينتج -5(x+1).",
        display: "3x(x + 1) - 5(x + 1) = 0",
      },
      {
        instruction: "اكتب أقواس التحليل التام النهائية للمطابقة الكلية.",
        placeholder: "مثال: (x + 1)(3x - 5)",
        accepted: ["(x+1)(3x-5)", "(3x-5)(x+1)", "(x + 1)(3x - 5)"],
        hint: "نأخذ القوس المشترك لتصبح النتيجة: (x + 1)(3x - 5) = 0",
        display: "(x + 1)(3x - 5) = 0",
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
  const [sentMap, setSentMap] = useState({}); // { [qIndex]: true }

  const q = QUESTIONS[qIndex];
  const step = q.steps[stepIndex];
  const totalCorrect = scores.filter(Boolean).length;

  const handleCheck = () => {
    if (!input.trim()) return;
    if (isCorrect(input, step.accepted)) {
      setStatus("correct");
      setShowHint(false);

      // Log this step's answer for the report
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

  // ── Send a single question's report to WhatsApp (works even mid-progress) ──
  const sendQuestionToWhatsApp = (index) => {
    const name = studentName.trim() || "طالب";
    const question = QUESTIONS[index];
    const answers = questionAnswers[index];
    const wasFirstTry = scores[index]; // null if question not finished yet

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
      `📐 *تقرير سؤال ${index + 1} - تحليل العبارة التربيعية*\n` +
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

    // Clear the notebook only if the question is fully solved (avoid wiping notes mid-work)
    if (wasFirstTry !== null) {
      setNotebook("");
    }
  };

  // ── Name entry screen (shown once before starting) ──
  if (!nameConfirmed) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تحليل متقدم · معامل x² أكبر من 1</div>
          <h1 style={styles.h1}>طريقة التجميع والتحليل</h1>

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
      pct === 100 ? { label: "عبقري رياضيات! 🏆🌟", color: COLORS.sage, bg: COLORS.sageBg } :
      pct >= 60  ? { label: "أداء رائع في التحليل المتقدم! 💪", color: COLORS.chalk, bg: COLORS.chalkBg } :
                   { label: "تحتاج لمزيد من التدريب على طريقة التجميع 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين التحليل المتقدم · النتيجة</div>
          <h1 style={styles.h1}>انتهى التمرين المعقد!</h1>

          <div style={{ ...styles.resultBanner, background: grade.bg, borderColor: grade.color }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {pct === 100 ? "👑" : pct >= 60 ? "⭐" : "📝"}
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
                  {scores[i] ? "بدون أخطاء" : "تم بمساعدة التلميح"}
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
        <div style={styles.eyebrow}>تحليل متقدم · معامل x² أكبر من 1</div>
        <h1 style={styles.h1}>طريقة التجميع والتحليل</h1>

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
          المسألة {qIndex + 1} من {QUESTIONS.length} · الخطوة التفصيلية {stepIndex + 1} من {q.steps.length}
        </div>

        <div style={styles.equationBox}>
          <span style={styles.equationText}>{q.equation}</span>
        </div>

        <div style={styles.notebookArea}>
          <div style={styles.notebookWriteHeader}>📝 مسودة تفكيك الحدود والتجميع الجانبي</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="استخدم السطور هنا لتجربة حاصل الضرب والمجموع، واستخراج العامل المشترك الأكبر براحتك..."
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
              ✅ خطوة صحيحة ومثالية! <span style={{ fontFamily: "Georgia, serif", direction: "ltr" }}>{step.display}</span>
            </div>
          )}
          {status === "wrong" && (
            <div style={styles.wrongMsg}>
              ❌ الإدخال غير مطابق، راجع الحسابات بدقة أو استعن بالتلميح بالأسفل
            </div>
          )}

          {status === "wrong" && !showHint && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>
              💡 إظهار مفتاح الحل للخطوة
            </button>
          )}
          {showHint && (
            <div style={styles.hintBox}>
              💡 <strong>توضيح مساعد:</strong> {step.hint}
            </div>
          )}

          {status === "correct" && (
            <button onClick={handleNext} style={styles.nextBtn}>
              {stepIndex < q.steps.length - 1
                ? "الخطوة الموالية ←"
                : qIndex < QUESTIONS.length - 1
                ? "المسألة التالية ←"
                : "الانتقال لصفحة التقييم النهائي ←"}
            </button>
          )}
        </div>

        {/* ── Send this question's report to WhatsApp (available from the first step) ── */}
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

// ── Styles (Preserved + extended) ────────────────────────────────────
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

  // ── Name entry card ──
  nameCard: {
    background: "#fff",
    border: `2px dashed ${COLORS.gold}`,
    borderRadius: 16,
    padding: "clamp(14px, 4vw, 22px)",
    marginBottom: 20,
  },

  // ── Per-question WhatsApp card ──
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
  }
};
