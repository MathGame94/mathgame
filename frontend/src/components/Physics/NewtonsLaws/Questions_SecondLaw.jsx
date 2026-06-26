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

// ── 5 Questions: Newton's Second Law (F = m * a) ──
const QUESTIONS = [
  {
    id: 1,
    equation: "حساب القوة: مسبار كتلته 200kg يتسارع بمقدار 3m/s²",
    steps: [
      {
        instruction: "اكتب الصيغة الرياضية لقانون نيوتن الثاني المستخدمة لحساب القوة المحصلة بدلالة الكتلة (m) والتسارع (a)",
        placeholder: "مثال: F = m * a",
        accepted: ["F=m*a", "F = m * a", "F=ma", "القوة=الكتلة*التسارع"],
        hint: "القوة المحصلة تساوي حاصل ضرب الكتلة في التسارع.",
        display: "القانون: F = m × a",
      },
      {
        instruction: "عوض القيم واحسب مقدار القوة المحصلة المؤثرة على المسبار بالنيوتن (200 × 3)",
        placeholder: "اكتب الناتج الرقمي فقط",
        accepted: ["600", "600 N", "600 نيوتن"],
        hint: "اضرب الكتلة (200) في التسارع (3) لتجد القوة.",
        display: "F = 600 نيوتن",
      },
    ],
  },
  {
    id: 2,
    equation: "حساب التسارع: صندوق كتلته 50kg تؤثر عليه قوة محصلة 200N",
    steps: [
      {
        instruction: "أعد ترتيب القانون لحساب التسارع (a)، ما هي المعادلة الصحيحة؟",
        placeholder: "مثال: a = F / m",
        accepted: ["a=F/m", "a = F / m", "a=F division m", "التسارع=القوة/الكتلة"],
        hint: "لحساب التسارع، نقسم القوة المحصلة على الكتلة.",
        display: "قانون التسارع: a = F / m",
      },
      {
        instruction: "احسب مقدار التسارع الناتج بوحدة (m/s²) عند قسمة القوة على الكتلة (200 ÷ 50)",
        placeholder: "اكتب الناتج الرقمي فقط",
        accepted: ["4", "4 m/s2", "4 م/ث2"],
        hint: "200 تقسيم 50 يساوي 4.",
        display: "a = 4 m/s²",
      },
    ],
  },
  {
    id: 3,
    equation: "حساب الكتلة: عربة تتسارع بمقدار 2m/s² تحت تأثير قوة محصلة 150N",
    steps: [
      {
        instruction: "اكتب الصيغة الرياضية لحساب الكتلة (m) بدلالة القوة والتسارع",
        placeholder: "مثال: m = F / a",
        accepted: ["m=F/a", "m = F / a", "الكتلة=القوة/التسارع"],
        hint: "الكتلة تساوي القوة المحصلة مقسومة على التسارع الناتجة عنه.",
        display: "قانون الكتلة: m = F / a",
      },
      {
        instruction: "احسب كتلة العربة بوحدة الكيلوغرام (kg) عند قسمة 150 على 2",
        placeholder: "اكتب الناتج الرقمي فقط",
        accepted: ["75", "75kg", "75 كغم"],
        hint: "نصف القوة 150 المطبقة يعطينا الكتلة مباشرة.",
        display: "m = 75 kg",
      },
    ],
  },
  {
    id: 4,
    equation: "مقارنة التسارع: مضاعفة القوة المؤثرة على نفس الكتلة",
    steps: [
      {
        instruction: "إذا تضاعفت القوة المحصلة المؤثرة على جسم ما إلى مرتين (2F) مع ثبات كتلته، فماذا يحدث لتسارعه طبقاً للعلاقة الطردية؟",
        placeholder: "مثال: يتضاعف",
        accepted: ["يتضاعف", "يزداد مرتين", "يتضاعف لمرتين", "يصبح الضعف"],
        hint: "قانون نيوتن الثاني ينص على أن التسارع يتناسب طردياً مع القوة المحصلة عند ثبات الكتلة.",
        display: "تأثير القوة: يتضاعف التسارع",
      },
    ],
  },
  {
    id: 5,
    equation: "مقارنة الكتلة: تأثير زيادة الكتلة على التسارع تحت نفس القوة",
    steps: [
      {
        instruction: "إذا تضاعفت كتلة الجسم إلى مرتين (2m) مع ثبات القوة المحصلة المؤثرة عليه، فماذا يحدث لمقدار تسارعه؟",
        placeholder: "مثال: يقل إلى النصف",
        accepted: ["يقل الى النصف", "يقل إلى النصف", "ينقص للنصف", "ينصف", "يقل للنصف"],
        hint: "التسارع يتناسب عكسياً مع الكتلة عند ثبات القوة المحصلة؛ زيادة الكتلة تعني ممانعة أكبر للحركة.",
        display: "تأثير الكتلة: يقل التسارع إلى النصف",
      },
    ],
  },
];

function isCorrect(input, accepted) {
  const clean = input.trim().toLowerCase().replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/");
  return accepted.some((a) => {
    const cleanA = a.toLowerCase().replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/");
    return clean === cleanA;
  });
}

export default function Questions_Newton2({ onFinish }) {
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

    const stylesText = question.steps
      .map((s, i) => {
        let ans;
        if (answers[i]) {
          ans = answers[i];
        } else if (index === qIndex && i === stepIndex && input.trim()) {
          ans = `${input.trim()} (لم يتم التحقق منها)`;
        } else {
          ans = "—";
        }
        return `  ${i + 1}. ${s.instruction}\n    ✏️ إجابة الطالب: ${ans}\n    🎯 النتيجة النموذجية: ${s.display}`;
      })
      .join("\n\n");

    const noteText = notebook.trim() || "لا توجد ملاحظات حسابية";

    const progressLine =
      wasFirstTry === true ? "✅ تم حل المسألة بشكل صحيح من المحاولة الأولى" :
      wasFirstTry === false ? "⚠️ استعان الطالب بالتلميحات الرياضية لحل المسألة" :
      `⏳ المسألة قيد الحل والتعويض (الخطوة ${index === qIndex ? stepIndex + 1 : "?"})`;

    const msg =
      `🍎 *تقرير فيزياء: قانون نيوتن الثاني (F = m.a)*\n` +
      `👤 *الطالب:* ${name}\n` +
      `🎯 *المسألة الرياضية:* ${question.equation}\n` +
      `${progressLine}\n\n` +
      `*الخطوات والتعويض الحسابي:*\n${stylesText}\n\n` +
      `📝 *مسودة الطالب الحسابية:* \n${noteText}`;

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
          <div style={styles.eyebrow}>تمرين فيزياء · قانون نيوتن الثاني</div>
          <h1 style={styles.h1}>حساب القوة والتسارع والكتلة</h1>

          <div style={styles.nameCard}>
            <div style={styles.notebookHeader}>
              <span style={styles.notebookIcon}>🧮</span>
              <div>
                <div style={styles.notebookTitle}>أدخل اسمك للانتقال للوحة الحسابات</div>
                <div style={styles.notebookSub}>
                  سيتم تسجيل اسمك لإصدار تقارير الحلول الرياضية لمعلمك عبر الواتساب
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
            <button onClick={() => setNameConfirmed(true)} style={styles.nextBtn} disabled={!studentName.trim()}>
              بدء الحسابات الفيزيائية ←
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);
    const grade =
      pct === 100 ? { label: "مبدع ومتمكن من الحسابات الديناميكية! 🏆", color: COLORS.sage, bg: COLORS.sageBg } :
      pct >= 60  ? { label: "ممتاز، مهاراتك الحسابية جيدة جداً! 👍", color: COLORS.chalk, bg: COLORS.chalkBg } :
                   { label: "راجع مهارات التعويض والضرب التبادلي 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين قانون نيوتن الثاني · النتيجة</div>
          <h1 style={styles.h1}>اكتملت المسائل الحسابية!</h1>

          <div style={{ ...styles.resultBanner, background: grade.bg, borderColor: grade.color }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>
              {pct === 100 ? "🥇" : pct >= 60 ? "📈" : "📉"}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: grade.color }}>{totalCorrect} / {QUESTIONS.length}</div>
            <div style={{ fontSize: 16, color: grade.color, marginTop: 4 }}>{grade.label}</div>
          </div>

          <div style={styles.breakdownCard}>
            <div style={styles.breakdownTitle}>سجل تحليل المسائل</div>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={styles.breakdownRow}>
                <span style={{ fontSize: 18 }}>{scores[i] ? "✅" : "❌"}</span>
                <span style={{ fontSize: 14, color: COLORS.ink, fontWeight: 600 }}>
                  {q.equation}
                </span>
                <span style={{ fontSize: 12, color: scores[i] ? COLORS.sage : COLORS.coral, fontWeight: 700 }}>
                  {scores[i] ? "من أول محاولة" : "احتاج مساعدة"}
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

        <div style={styles.eyebrow}>تمرين فيزياء · قانون نيوتن الثاني ($F = m \cdot a$)</div>
        <h1 style={styles.h1}>تطبيق وحل المسائل خطوة بخطوة</h1>

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
          المسألة {qIndex + 1} من {QUESTIONS.length} · الخطوة {stepIndex + 1} من {q.steps.length}
        </div>

        <div style={styles.equationBox}>
          <span style={styles.equationText}>{q.equation}</span>
        </div>

        <div style={styles.notebookArea}>
          <div style={styles.notebookWriteHeader}>📝 مسودة الحل والعمليات الحسابية للطالب</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="اكتب المعطيات والمحاولات الرقمية هنا لتظهر في تقرير المعلم..."
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
              ✅ تعويض رياضي سليم: <span>{step.display}</span>
            </div>
          )}
          {status === "wrong" && (
            <div style={styles.wrongMsg}>
              ❌ الحساب غير دقيق، تأكد من العملية الرياضية وحاول ثانية
            </div>
          )}

          {status === "wrong" && !showHint && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>
              💡 أظهر المساعدة الحسابية
            </button>
          )}
          {showHint && (
            <div style={styles.hintBox}>
              💡 <strong>تلميح المساعدة:</strong> {step.hint}
            </div>
          )}

          {status === "correct" && (
            <button onClick={handleNext} style={styles.nextBtn}>
              {stepIndex < q.steps.length - 1
                ? "الخطوة التالية في الحساب ←"
                : qIndex < QUESTIONS.length - 1
                ? "المسألة التالية ←"
                : "الانتقال لصفحة التقييم النهائي ←"}
            </button>
          )}
        </div>

        {/* ── Per-question WhatsApp send button ── */}
        <div style={styles.waCard}>
          <div style={styles.notebookHeader}>
            <span style={styles.notebookIcon}>📤</span>
            <div>
              <div style={styles.notebookTitle}>إرسال هذه المسألة للأستاذ</div>
              <div style={styles.notebookSub}>
                يتضمن هذا التقرير القوانين المستخدمة، نواتج التعويض الرقمي، ومسودتك الحسابية
              </div>
            </div>
          </div>
          <button onClick={() => sendQuestionToWhatsApp(qIndex)} style={styles.waBtn}>
            <span style={styles.waIcon}>💬</span>
            إرسال تقرير المسألة {qIndex + 1} عبر واتساب
          </button>
          {sentMap[qIndex] && (
            <div style={styles.sentBanner}>✓ تم إعداد التقرير وفتح تطبيق الواتساب!</div>
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
    fontSize: "clamp(16px, 4vw, 22px)",
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