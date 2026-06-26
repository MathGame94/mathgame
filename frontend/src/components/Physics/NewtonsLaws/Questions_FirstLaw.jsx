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

// ── 5 Questions: Newton's First Law (القصور الذاتي والقوة المحصلة) ──
const QUESTIONS = [
  {
    id: 1,
    equation: "صندوق ساكن على أرضية أفقية",
    steps: [
      {
        instruction: "إذا كان الجسم ساكناً ولا توجد قوى خارجية تؤثر عليه، فما مقدار القوة المحصلة (ΣF) المؤثرة عليه طبقاً لقانون نيوتن الأول؟",
        placeholder: "اكتب القيمة بالرقم (مثال: 0)",
        accepted: ["0", "صفر"],
        hint: "ينص القانون على أن الجسم الساكن يبقى ساكناً ما لم تؤثر عليه قوة محصلة، أي أن مجموع القوى يساوي صفر.",
        display: "القوة المحصلة = 0 نيوتن",
      },
      {
        instruction: "ما هي الحالة الحركية التي سيؤول إليها هذا الصندوق بعد مرور ساعة إذا لم تتدخل أي قوة؟",
        placeholder: "مثال: ساكن",
        accepted: ["ساكن", "يبقى ساكن", "الاستقرار", "يبقى ساكناً"],
        hint: "القصور الذاتي للمادة يجعل الجسم يحافظ على حالته من السكون.",
        display: "الحالة الحركية: يبقى ساكناً",
      },
    ],
  },
  {
    id: 2,
    equation: "سيارة تتحرك بسرعة ثابتة = 80km/h في خط مستقيم",
    steps: [
      {
        instruction: "بما أن السيارة تتحرك بسرعة ثابتة وفي خط مستقيم، كم تبلغ القوة المحصلة المؤثرة عليها؟",
        placeholder: "اكتب القيمة بالرقم",
        accepted: ["0", "صفر"],
        hint: "السرعة الثابتة في خط مستقيم تعني أن الجسم في حالة اتزان ديناميكي، وبالتالي فإن القوة المحصلة تساوي صفراً.",
        display: "القوة المحصلة (ΣF) = 0",
      },
      {
        instruction: "إذا كانت قوة دفع المحرك للأمام تساوي 500 نيوتن، فكم يجب أن تكون قوة الاحتكاك والمقاومة للخلف؟",
        placeholder: "اكتب القيمة بالرقم (مثال: 500)",
        accepted: ["500", "500 نيوتن"],
        hint: "لكي تكون المحصلة صفراً، يجب أن تتساوى قوة الدفع للأمام مع قوة المقاومة للخلف في المقدار وتعاكسها في الاتجاه.",
        display: "قوة الاحتكاك = 500 نيوتن",
      },
    ],
  },
  {
    id: 3,
    equation: "مفهوم القصور الذاتي (Inertia)",
    steps: [
      {
        instruction: "ما هو الخاصية الفيزيائية التي تصف ممانعة الجسم لأي تغيير في حالته الحركية؟",
        placeholder: "اكتب المفهوم المكون من كلمتين",
        accepted: ["القصور الذاتي", "قصور ذاتي"],
        hint: "هذه الخاصية تعتمد بشكل أساسي على كتلة الجسم وتسمى أيضاً بقانون نيوتن الأول.",
        display: "المفهوم: القصور الذاتي",
      },
      {
        instruction: "أي الأجسام يمتلك قصوراً ذاتياً أكبر: شاحنة ضخمة أم دراجة هوائية؟",
        placeholder: "شاحنة أم دراجة؟",
        accepted: ["شاحنة", "الشاحنة", "الشاحنة الضخمة"],
        hint: "كلما زادت كتلة الجسم، زادت ممانعته لتغيير حالته الحركية (أي يزداد قصوره الذاتي).",
        display: "الجسم الأكبر قصوراً: الشاحنة",
      },
    ],
  },
  {
    id: 4,
    equation: "اندفاع الركاب عند التوقف المفاجئ",
    steps: [
      {
        instruction: "عندما تتوقف الحافلة فجأة، إلى أي اتجاه يندفع الركاب؟ (الأمام أم الخلف)",
        placeholder: "اكتب الاتجاه",
        accepted: ["الامام", "الأمام", "إلى الأمام", "الى الامام"],
        hint: "أجساد الركاب كانت تتحرك بسرعة الحافلة، وعند توقف الحافلة تحاول الأجساد الحفاظ على سرعتها للأمام.",
        display: "اتجاه الاندفاع: إلى الأمام",
      },
      {
        instruction: "ما هي وسيلة الأمان في السيارات التي تُصمم خصيصاً للتغلب على هذا الاندفاع الناتج عن القصور الذاتي؟",
        placeholder: "مثال: حزام الأمان",
        accepted: ["حزام الامان", "حزام الأمان", "الحزام"],
        hint: "تقوم هذه الوسيلة بتوفير القوة الخارجية اللازمة لتغيير حالة الركاب الحركية ومنعهم من الاصطدام بالزجاج.",
        display: "وسيلة الأمان: حزام الأمان",
      },
    ],
  },
  {
    id: 5,
    equation: "صاروخ في الفضاء الخارجي بعيداً عن الجاذبية",
    steps: [
      {
        instruction: "إذا تم إطفاء محركات الصاروخ تماماً في الفضاء العميق (انعدام المقاومة والجاذبية)، كيف ستكون حركته؟ (يتوقف أم يستمر بنفس السرعة)",
        placeholder: "اكتب طبيعة الحركة",
        accepted: ["يستمر بنفس السرعة", "يستمر بالحركة", "يستمر", "الحركة بسرعة ثابتة", "يبقى متحركا", "يبقى متحركاً"],
        hint: "طبقاً لقانون نيوتن الأول، الجسم المتحرك يستمر في حركته بسرعة ثابتة وفي خط مستقيم ما لم تؤثر عليه قوة خارجية تؤدي لإيقافه.",
        display: "حالة الصاروخ: يستمر بالحركة بسرعة ثابتة وفي خط مستقيم",
      },
    ],
  },
];

function isCorrect(input, accepted) {
  const clean = input.trim().toLowerCase().replace(/\s+/g, " ");
  return accepted.some((a) => {
    const cleanA = a.toLowerCase().replace(/\s+/g, " ");
    return clean === cleanA;
  });
}

export default function Questions_Newton1({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [scores, setScores] = useState(Array(QUESTIONS.length).fill(null));
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
        } else if (index !== qIndex && i >= answers.length) {
          ans = "لم يصل الطالب لهذه الخطوة بعد";
        } else {
          ans = "—";
        }
        return `  ${i + 1}. ${s.instruction}\n    ✏️ إجابة الطالب: ${ans}\n    🎯 النتيجة الصحيحة: ${s.display}`;
      })
      .join("\n\n");

    const noteText = notebook.trim() || "لا توجد ملاحظات في الدفتر";

    const progressLine =
      wasFirstTry === true ? "✅ تم حل وتفهم الحالة من المحاولة الأولى" :
      wasFirstTry === false ? "⚠️ احتاج الطالب لتلميح أو محاولات إضافية" :
      `⏳ السؤال قيد الحل (الخطوة ${index === qIndex ? stepIndex + 1 : "?"} من ${question.steps.length})`;

    const msg =
      `🍏 *تقرير فيزياء: قانون نيوتن الأول (القصور الذاتي)*\n` +
      `👤 *الطالب:* ${name}\n` +
      `🔍 *الحالة الفيزيائية:* ${question.equation}\n` +
      `${progressLine}\n\n` +
      `*تحليل الخطوات والمفاهيم:*\n${stepsText}\n\n` +
      `📝 *دفتر ملاحظات الطالب:* \n${noteText}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    setSentMap((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setSentMap((prev) => ({ ...prev, [index]: false }));
    }, 4000);
  };

  if (!nameConfirmed) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين فيزياء · قانون نيوتن الأول</div>
          <h1 style={styles.h1}>التحليل المفهومي والفيزيائي</h1>

          <div style={styles.nameCard}>
            <div style={styles.notebookHeader}>
              <span style={styles.notebookIcon}>👤</span>
              <div>
                <div style={styles.notebookTitle}>أدخل اسمك للبدء في الاختبار للتفاعل</div>
                <div style={styles.notebookSub}>
                  سيتم تضمين اسمك في تقارير الأداء المرسلة للمعلم عبر الواتساب
                </div>
              </div>
            </div>
            <input
              type="text"
              placeholder="اكتب اسمك الثلاثي هنا..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setNameConfirmed(true)}
              style={styles.nameInput}
            />
            <button onClick={() => setNameConfirmed(true)} style={styles.nextBtn} disabled={!studentName.trim()}>
              بدء تمرين القصور الذاتي ←
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);
    const grade =
      pct === 100 ? { label: "عبقري فيزياء! 🌟 فهم تام للقصور الذاتي", color: COLORS.sage, bg: COLORS.sageBg } :
      pct >= 60  ? { label: "مستوى رائع، واصل استكشاف الفيزياء! 💪", color: COLORS.chalk, bg: COLORS.chalkBg } :
                   { label: "راجع مفهوم القوة المحصلة وحاول مجدداً 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين قانون نيوتن الأول · النتيجة النهائية</div>
          <h1 style={styles.h1}>اكتمل التحليل الفيزيائي!</h1>

          <div style={{ ...styles.resultBanner, background: grade.bg, borderColor: grade.color }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {pct === 100 ? "🏆" : pct >= 60 ? "👍" : "📚"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: grade.color }}>{totalCorrect} / {QUESTIONS.length}</div>
            <div style={{ fontSize: 16, color: grade.color, marginTop: 4 }}>{grade.label}</div>
          </div>

          <div style={styles.breakdownCard}>
            <div style={styles.breakdownTitle}>سجل الحالات الفيزيائية المنجزة</div>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={styles.breakdownRow}>
                <span style={{ fontSize: 18 }}>{scores[i] ? "✅" : "❌"}</span>
                <span style={{ fontSize: 15, color: COLORS.ink, fontWeight: 600 }}>
                  {q.equation}
                </span>
                <span style={{ fontSize: 12, color: scores[i] ? COLORS.sage : COLORS.coral, fontWeight: 700 }}>
                  {scores[i] ? "إجابة فورية" : "مساعدة/تلميح"}
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

        <div style={styles.eyebrow}>تمرين فيزياء · قانون نيوتن الأول (الاتزان والقصور)</div>
        <h1 style={styles.h1}>حل وتحليل خطوة بخطوة</h1>

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
          الحالة {qIndex + 1} من {QUESTIONS.length} · الخطوة {stepIndex + 1} من {q.steps.length}
        </div>

        <div style={styles.equationBox}>
          <span style={styles.equationText}>{q.equation}</span>
        </div>

        <div style={styles.notebookArea}>
          <div style={styles.notebookWriteHeader}>📝 دفتر مسودة الطالب وتحليل القوى</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="اكتب مخطط القوى أو ملاحظاتك هنا لمشاركتها مع المعلم..."
            style={styles.notebookTextarea}
          />
        </div>

        {stepIndex > 0 && (
          <div style={styles.completedSteps}>
            {q.steps.slice(0, stepIndex).map((s, i) => (
              <div key={i} style={styles.completedStep}>
                <span style={styles.checkIcon}>✓</span>
                <span style={{ fontSize: "14px", color: COLORS.sage, fontWeight: 600 }}>{s.display}</span>
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
                direction: "rtl" // التحويل للعربية لأن أغلب الأجوبة نصية ومفهومية هنا
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
              ✅ استنتاج صحيح! ممتع جداً: <span>{step.display}</span>
            </div>
          )}
          {status === "wrong" && (
            <div style={styles.wrongMsg}>
              ❌ بالتأكيد هناك تفصيل فيزيائي فاتك، حاول مجدداً
            </div>
          )}

          {status === "wrong" && !showHint && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>
              💡 أظهر التلميح الفيزيائي
            </button>
          )}
          {showHint && (
            <div style={styles.hintBox}>
              💡 <strong>تلميح المعلم:</strong> {step.hint}
            </div>
          )}

          {status === "correct" && (
            <button onClick={handleNext} style={styles.nextBtn}>
              {stepIndex < q.steps.length - 1
                ? "الخطوة الفيزيائية التالية ←"
                : qIndex < QUESTIONS.length - 1
                ? "الحالة التالية ←"
                : "عرض النتيجة الرياضية والفيزيائية ←"}
            </button>
          )}
        </div>

        {/* ── Per-question WhatsApp send button ── */}
        <div style={styles.waCard}>
          <div style={styles.notebookHeader}>
            <span style={styles.notebookIcon}>📤</span>
            <div>
              <div style={styles.notebookTitle}>إرسال تحليل هذه الحالة للأستاذ</div>
              <div style={styles.notebookSub}>
                سيتم إرسال الإجابة، الملاحظات، والتقييم الفوري للحالة الحالية مباشرة
              </div>
            </div>
          </div>
          <button onClick={() => sendQuestionToWhatsApp(qIndex)} style={styles.waBtn}>
            <span style={styles.waIcon}>💬</span>
            إرسال تقرير الحالة {qIndex + 1} عبر الواتساب
          </button>
          {sentMap[qIndex] && (
            <div style={styles.sentBanner}>✓ تم فتح تطبيق الواتساب بنجاح وتجهيز التقرير!</div>
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
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    fontSize: "clamp(18px, 4.5vw, 24px)",
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