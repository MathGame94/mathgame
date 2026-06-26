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

// ── 5 Questions: حجم متوازي المستطيلات والمكعب ──
const QUESTIONS = [
  {
    id: 1,
    equation: "متوازي مستطيلات طوله 5 سم وعرضه 4 سم وارتفاعه 3 سم",
    steps: [
      {
        instruction: "اكتب قانون حجم متوازي المستطيلات",
        placeholder: "مثال: ح = ط × ع × ا",
        accepted: ["ح=ط×ع×ا", "ح = ط × ع × ا", "ح=طxعxا", "ح = ط x ع x ا"],
        hint: "حجم متوازي المستطيلات يساوي الطول مضروباً في العرض مضروباً في الارتفاع",
        display: "ح = ط × ع × ا",
      },
      {
        instruction: "عوّض قيم الطول والعرض والارتفاع في القانون",
        placeholder: "مثال: ح = 5 × 4 × 3",
        accepted: ["ح=5×4×3", "ح = 5 × 4 × 3", "ح=5x4x3", "ح = 5 x 4 x 3"],
        hint: "الطول 5 سم والعرض 4 سم والارتفاع 3 سم، نعوضها في القانون",
        display: "ح = 5 × 4 × 3",
      },
      {
        instruction: "احسب الحجم النهائي مع كتابة الوحدة المكعبة",
        placeholder: "مثال: ح = 60 سم³",
        accepted: ["ح=60سم³", "ح = 60 سم³", "ح=60سم3", "60سم³", "60"],
        hint: "5 × 4 = 20، ثم 20 × 3 = 60، فيكون الحجم 60 سم³",
        display: "ح = 60 سم³",
      },
    ],
  },
  {
    id: 2,
    equation: "مكعب طول ضلعه 4 سم",
    steps: [
      {
        instruction: "اكتب قانون حجم المكعب",
        placeholder: "مثال: ح = ض × ض × ض",
        accepted: ["ح=ض×ض×ض", "ح = ض × ض × ض", "ح=ضxضxض", "ح = ض x ض x ض", "ح=ض³", "ح = ض³"],
        hint: "حجم المكعب يساوي الضلع مضروباً في نفسه ثلاث مرات: ض × ض × ض",
        display: "ح = ض × ض × ض",
      },
      {
        instruction: "عوّض طول الضلع في القانون",
        placeholder: "مثال: ح = 4 × 4 × 4",
        accepted: ["ح=4×4×4", "ح = 4 × 4 × 4", "ح=4x4x4", "ح = 4 x 4 x 4"],
        hint: "طول الضلع 4 سم، نعوضه ثلاث مرات في القانون",
        display: "ح = 4 × 4 × 4",
      },
      {
        instruction: "احسب الحجم النهائي مع كتابة الوحدة المكعبة",
        placeholder: "مثال: ح = 64 سم³",
        accepted: ["ح=64سم³", "ح = 64 سم³", "ح=64سم3", "64سم³", "64"],
        hint: "4 × 4 = 16، ثم 16 × 4 = 64، فيكون الحجم 64 سم³",
        display: "ح = 64 سم³",
      },
    ],
  },
  {
    id: 3,
    equation: "متوازي مستطيلات طوله 6 سم وعرضه 5 سم وارتفاعه 2 سم",
    steps: [
      {
        instruction: "اكتب قانون حجم متوازي المستطيلات",
        placeholder: "مثال: ح = ط × ع × ا",
        accepted: ["ح=ط×ع×ا", "ح = ط × ع × ا", "ح=طxعxا", "ح = ط x ع x ا"],
        hint: "حجم متوازي المستطيلات يساوي الطول مضروباً في العرض مضروباً في الارتفاع",
        display: "ح = ط × ع × ا",
      },
      {
        instruction: "عوّض قيم الطول والعرض والارتفاع في القانون",
        placeholder: "مثال: ح = 6 × 5 × 2",
        accepted: ["ح=6×5×2", "ح = 6 × 5 × 2", "ح=6x5x2", "ح = 6 x 5 x 2"],
        hint: "الطول 6 سم والعرض 5 سم والارتفاع 2 سم، نعوضها في القانون",
        display: "ح = 6 × 5 × 2",
      },
      {
        instruction: "احسب الحجم النهائي مع كتابة الوحدة المكعبة",
        placeholder: "مثال: ح = 60 سم³",
        accepted: ["ح=60سم³", "ح = 60 سم³", "ح=60سم3", "60سم³", "60"],
        hint: "6 × 5 = 30، ثم 30 × 2 = 60، فيكون الحجم 60 سم³",
        display: "ح = 60 سم³",
      },
    ],
  },
  {
    id: 4,
    equation: "مكعب طول ضلعه 5 سم",
    steps: [
      {
        instruction: "اكتب قانون حجم المكعب",
        placeholder: "مثال: ح = ض × ض × ض",
        accepted: ["ح=ض×ض×ض", "ح = ض × ض × ض", "ح=ضxضxض", "ح = ض x ض x ض", "ح=ض³", "ح = ض³"],
        hint: "حجم المكعب يساوي الضلع مضروباً في نفسه ثلاث مرات: ض × ض × ض",
        display: "ح = ض × ض × ض",
      },
      {
        instruction: "عوّض طول الضلع في القانون",
        placeholder: "مثال: ح = 5 × 5 × 5",
        accepted: ["ح=5×5×5", "ح = 5 × 5 × 5", "ح=5x5x5", "ح = 5 x 5 x 5"],
        hint: "طول الضلع 5 سم، نعوضه ثلاث مرات في القانون",
        display: "ح = 5 × 5 × 5",
      },
      {
        instruction: "احسب الحجم النهائي مع كتابة الوحدة المكعبة",
        placeholder: "مثال: ح = 125 سم³",
        accepted: ["ح=125سم³", "ح = 125 سم³", "ح=125سم3", "125سم³", "125"],
        hint: "5 × 5 = 25، ثم 25 × 5 = 125، فيكون الحجم 125 سم³",
        display: "ح = 125 سم³",
      },
    ],
  },
  {
    id: 5,
    equation: "متوازي مستطيلات طوله 8 سم وعرضه 3 سم وارتفاعه 4 سم",
    steps: [
      {
        instruction: "اكتب قانون حجم متوازي المستطيلات",
        placeholder: "مثال: ح = ط × ع × ا",
        accepted: ["ح=ط×ع×ا", "ح = ط × ع × ا", "ح=طxعxا", "ح = ط x ع x ا"],
        hint: "حجم متوازي المستطيلات يساوي الطول مضروباً في العرض مضروباً في الارتفاع",
        display: "ح = ط × ع × ا",
      },
      {
        instruction: "عوّض قيم الطول والعرض والارتفاع في القانون",
        placeholder: "مثال: ح = 8 × 3 × 4",
        accepted: ["ح=8×3×4", "ح = 8 × 3 × 4", "ح=8x3x4", "ح = 8 x 3 x 4"],
        hint: "الطول 8 سم والعرض 3 سم والارتفاع 4 سم، نعوضها في القانون",
        display: "ح = 8 × 3 × 4",
      },
      {
        instruction: "احسب الحجم النهائي مع كتابة الوحدة المكعبة",
        placeholder: "مثال: ح = 96 سم³",
        accepted: ["ح=96سم³", "ح = 96 سم³", "ح=96سم3", "96سم³", "96"],
        hint: "8 × 3 = 24، ثم 24 × 4 = 96، فيكون الحجم 96 سم³",
        display: "ح = 96 سم³",
      },
    ],
  },
];

function isCorrect(input, accepted) {
  const clean = input.trim().replace(/\s+/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/x/gi, "*");
  return accepted.some((a) => {
    const cleanA = a.replace(/\s+/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/x/gi, "*");
    return clean === cleanA;
  });
}

export default function Questions_Volume({ onFinish }) {
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
      `📦 *تقرير سؤال ${index + 1} - الحجم*\n` +
      `👤 *الطالب:* ${name}\n` +
      `🧮 *المسألة:* ${question.equation}\n` +
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
          <div style={styles.eyebrow}>تمرين · الحجم</div>
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

  // ── Results screen ──
  if (done) {
    const pct = Math.round((totalCorrect / QUESTIONS.length) * 100);
    const grade =
      pct === 100 ? { label: "ممتاز! 🌟", color: COLORS.sage, bg: COLORS.sageBg } :
      pct >= 60  ? { label: "جيد، واصل! 💪", color: COLORS.chalk, bg: COLORS.chalkBg } :
                   { label: "راجع الدرس وحاول مجدداً 📖", color: COLORS.coral, bg: COLORS.coralBg };

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.eyebrow}>تمرين الحجم · النتيجة</div>
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
                <span style={{ fontFamily: "'Segoe UI', Tahoma, sans-serif", direction: "rtl", fontSize: 14, color: COLORS.ink }}>
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

  // ── Question screen ──
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.eyebrow}>تمرين · الحجم</div>
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
          <div style={styles.notebookWriteHeader}>📝 دفتر الحل</div>
          <textarea
            value={notebook}
            onChange={(e) => setNotebook(e.target.value)}
            placeholder="اكتب خطوات الحل هنا..."
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
              ❌ إجابة خاطئة، حاول مرة أخرى
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
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    fontSize: "clamp(15px, 4vw, 20px)",
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
