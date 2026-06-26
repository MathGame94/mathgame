import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Design tokens ──
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

// ── Example 1: قطع مسافة 180 كم في 3 ساعات ──
const EXAMPLE_1 = {
  equation: "جسم قطع مسافة 180 كم في 3 ساعات، احسب سرعته",
  label: "مسافة وزمن معطيان",
  steps: [
    {
      text: "السرعة تدل على المسافة التي يقطعها الجسم في وحدة الزمن. قانون السرعة هو قسمة المسافة على الزمن. هنا المسافة 180 كم والزمن 3 ساعات.",
      display: "س = م ÷ ز",
      audio: "/audio/speed-example1-step1.mp3",
    },
    {
      text: "نعوّض القيم المعطاة في القانون: المسافة 180 كم والزمن 3 ساعات.",
      display: "س = 180 ÷ 3",
      audio: "/audio/speed-example1-step2.mp3",
    },
    {
      text: "نقسم المسافة على الزمن: 180 ÷ 3 = 60.",
      display: "س = 60",
      audio: "/audio/speed-example1-step3.mp3",
    },
    {
      text: "وبهذا حصلنا على السرعة. وحدة السرعة هي كم/س لأنها مسافة مقسومة على زمن.",
      display: "الحل النهائي: س = 60 كم/س",
      audio: "/audio/speed-example1-step4.mp3",
      isFinal: true,
    },
  ],
};

// ── Example 2: قطع مسافة 240 كم في 4 ساعات ──
const EXAMPLE_2 = {
  equation: "جسم قطع مسافة 240 كم في 4 ساعات، احسب سرعته",
  label: "تطبيق آخر",
  steps: [
    {
      text: "نستخدم نفس قانون السرعة: السرعة تساوي المسافة مقسومةً على الزمن. هنا المسافة 240 كم والزمن 4 ساعات.",
      display: "س = م ÷ ز",
      audio: "/audio/speed-example2-step1.mp3",
    },
    {
      text: "نعوّض القيم المعطاة في القانون: المسافة 240 كم والزمن 4 ساعات.",
      display: "س = 240 ÷ 4",
      audio: "/audio/speed-example2-step2.mp3",
    },
    {
      text: "نقسم المسافة على الزمن: 240 ÷ 4 = 60.",
      display: "س = 60",
      audio: "/audio/speed-example2-step3.mp3",
    },
    {
      text: "وبهذا حصلنا على السرعة مع كتابة وحدة كم/س.",
      display: "الحل النهائي: س = 60 كم/س",
      audio: "/audio/speed-example2-step4.mp3",
      isFinal: true,
    },
  ],
};

const EXAMPLES = [EXAMPLE_1, EXAMPLE_2];

export default function Example_Speed({ onNext }) {
  const navigate = useNavigate();
  const [exampleIndex, setExampleIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  const example = EXAMPLES[exampleIndex];
  const STEPS = example.steps;
  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const isLastExample = exampleIndex === EXAMPLES.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStep(currentStep + 1);
  };

  const handleNextExample = () => {
    if (!isLastExample) {
      setExampleIndex(exampleIndex + 1);
      setCurrentStep(0);
    }
  };

  const playAudio = () => {
    const audio = new Audio(step.audio);
    audio.onerror = () => {
      if ("speechSynthesis" in window) {
        setIsPlaying(true);
        const utt = new SpeechSynthesisUtterance(step.text);
        utt.lang = "ar-SA";
        utt.rate = 0.9;
        utt.onend = () => setIsPlaying(false);
        utt.onerror = () => setIsPlaying(false);
        speechSynthesis.speak(utt);
      }
    };
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.play().catch(() => {
      if ("speechSynthesis" in window) {
        setIsPlaying(true);
        const utt = new SpeechSynthesisUtterance(step.text);
        utt.lang = "ar-SA";
        utt.rate = 0.9;
        utt.onend = () => setIsPlaying(false);
        utt.onerror = () => setIsPlaying(false);
        speechSynthesis.speak(utt);
      }
    });
  };

  const sendToWhatsApp = () => {
    if (!question.trim()) return;
    const name = studentName.trim() || "طالب";
    const msg =
      `📚 *سؤال من الطالب: ${name}*\n` +
      `📌 *المثال:* حساب السرعة - ${example.equation}\n\n` +
      `❓ *السؤال:*\n${question.trim()}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* ── Header ── */}
        <div style={styles.eyebrow}>مثال محلول · السرعة</div>
        <h1 style={styles.h1}>حساب السرعة · {example.equation}</h1>

        {/* ── Example switch tabs ── */}
        <div style={styles.tabsRow}>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                setExampleIndex(i);
                setCurrentStep(0);
              }}
              style={{
                ...styles.tabBtn,
                background: i === exampleIndex ? COLORS.chalk : "#fff",
                color: i === exampleIndex ? "#fff" : COLORS.inkLight,
                borderColor: i === exampleIndex ? COLORS.chalk : COLORS.border,
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* ── Formula reminder box ── */}
        <div style={styles.formulaReminder}>
          <span style={styles.formulaLabel}>القانون:</span>
          <span style={styles.formulaText}>السرعة = المسافة ÷ الزمن &nbsp;|&nbsp; س = م ÷ ز</span>
        </div>

        {/* ── Original equation (always visible) ── */}
        <div style={styles.equationBox}>
          <span style={styles.equationText}>{example.equation}</span>
        </div>

        {/* ── Avatar + narration ── */}
        <div style={styles.lessonCard}>
          <div style={styles.avatarRow}>
            <button
              onClick={playAudio}
              style={{
                ...styles.avatar,
                animation: isPlaying ? "pulse 1s infinite" : "none",
              }}
              title="استمع للشرح"
            >
              🧑‍🏫
            </button>
            <div style={styles.speechBubble}>
              <p style={styles.speechText}>{step.text}</p>
              <button onClick={playAudio} style={styles.playBtn}>
                {isPlaying ? "🔊 يتكلم..." : "▶ استمع"}
              </button>
            </div>
          </div>

          {/* ── Step-by-step display (cumulative reveal) ── */}
          <div style={styles.stepsDisplay}>
            {STEPS.slice(0, currentStep + 1).map((s, i) => (
              <div
                key={i}
                style={{
                  ...styles.stepLine,
                  background: i === currentStep
                    ? (s.isFinal ? COLORS.sageBg : COLORS.chalkBg)
                    : "transparent",
                  borderColor: i === currentStep
                    ? (s.isFinal ? COLORS.sage : COLORS.chalk)
                    : "transparent",
                }}
              >
                <span style={styles.stepNumber}>{i + 1}</span>
                <span style={{
                  ...styles.stepFormula,
                  color: s.isFinal ? COLORS.sage : COLORS.ink,
                  fontWeight: s.isFinal ? 700 : 600,
                }}>
                  {s.display}
                </span>
              </div>
            ))}
          </div>

          {/* ── Progress dots ── */}
          <div style={styles.progressDots}>
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  background: i <= currentStep ? COLORS.chalk : COLORS.border,
                }}
              />
            ))}
          </div>

          {/* ── Next step button ── */}
          {!isLast ? (
            <button onClick={handleNext} style={styles.nextStepBtn}>
              الخطوة التالية ←
            </button>
          ) : (
            <div style={styles.finishedBanner}>
              ✓ انتهى الحل! راجع الخطوات أعلاه{" "}
              {isLastExample ? "ثم انتقل للتمرين" : "ثم جرّب المثال التالي"}
            </div>
          )}
        </div>

        {/* ── Navigation to next example (within this page) ── */}
        {isLast && !isLastExample && (
          <div style={styles.footer}>
            <button onClick={handleNextExample} style={styles.nextBtn}>
              المثال التالي ←
            </button>
          </div>
        )}

        {/* ── Navigation onward (after both examples) ── */}
        {isLast && isLastExample && onNext && (
          <div style={styles.footer}>
            <button onClick={onNext} style={styles.nextBtn}>
              المثال التالي ←
            </button>
          </div>
        )}

        {/* ── Student Notebook ── */}
        <div style={styles.notebookCard}>
          <div style={styles.notebookHeader}>
            <span style={styles.notebookIcon}>📒</span>
            <div>
              <div style={styles.notebookTitle}>دفتر الأسئلة</div>
              <div style={styles.notebookSub}>اكتب سؤالك وأرسله مباشرة للمعلم عبر واتساب</div>
            </div>
          </div>

          <input
            type="text"
            placeholder="اسمك (اختياري)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={styles.nameInput}
          />

          <textarea
            placeholder="اكتب سؤالك هنا عن هذا المثال..."
            value={question}
            onChange={(e) => { setQuestion(e.target.value); setSent(false); }}
            rows={4}
            style={styles.textarea}
          />

          <button
            onClick={sendToWhatsApp}
            disabled={!question.trim()}
            style={{
              ...styles.waBtn,
              opacity: question.trim() ? 1 : 0.5,
              cursor: question.trim() ? "pointer" : "not-allowed",
            }}
          >
            <span style={styles.waIcon}>💬</span>
            إرسال السؤال عبر واتساب
          </button>

          {sent && (
            <div style={styles.sentBanner}>
              ✓ تم فتح واتساب! أرسل الرسالة من هناك.
            </div>
          )}
        </div>

      </div>
      <button onClick={() => { navigate("/questionsSpeed"); }} style={styles.exerciseBtn}>
        ابدأ التمرين ←
      </button>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
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
    fontSize: "clamp(20px, 4.5vw, 28px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 20px",
  },
  tabsRow: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    border: "2px solid",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    transition: "all 0.15s",
  },
  formulaReminder: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: COLORS.goldBg,
    border: `1px solid ${COLORS.gold}`,
    borderRadius: 12,
    padding: "11px 16px",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  formulaLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.gold,
    flexShrink: 0,
  },
  formulaText: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(12px, 2.8vw, 14px)",
    color: "#7a5a1a",
    fontWeight: 600,
  },
  equationBox: {
    background: COLORS.ink,
    borderRadius: 16,
    padding: "20px",
    textAlign: "center",
    marginBottom: 24,
  },
  equationText: {
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    fontSize: "clamp(15px, 4vw, 20px)",
    fontWeight: 700,
    color: COLORS.paper,
  },
  lessonCard: {
    background: "#fff",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "clamp(16px, 4vw, 24px)",
    marginBottom: 24,
  },
  avatarRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: COLORS.chalkBg,
    border: "none",
    fontSize: 28,
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
  },
  speechBubble: {
    flex: 1,
    background: COLORS.paperAlt,
    borderRadius: 14,
    padding: "14px 16px",
    position: "relative",
  },
  speechText: {
    margin: "0 0 10px",
    fontSize: "clamp(13px, 2.8vw, 15px)",
    color: COLORS.ink,
    lineHeight: 1.8,
  },
  playBtn: {
    background: "none",
    border: `1px solid ${COLORS.chalk}`,
    color: COLORS.chalk,
    borderRadius: 8,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  stepsDisplay: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },
  stepLine: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid",
    transition: "all 0.3s ease",
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: COLORS.paperAlt,
    color: COLORS.inkLight,
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepFormula: {
    fontFamily: "Georgia, serif",
    direction: "ltr",
    fontSize: "clamp(15px, 3.5vw, 19px)",
  },
  progressDots: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginBottom: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "background 0.3s",
  },
  nextStepBtn: {
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
  },
  finishedBanner: {
    background: COLORS.sageBg,
    color: COLORS.sage,
    borderRadius: 12,
    padding: "14px",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: 24,
  },
  nextBtn: {
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
  notebookCard: {
    background: "#fff",
    border: `2px dashed ${COLORS.gold}`,
    borderRadius: 16,
    padding: "clamp(14px, 4vw, 22px)",
    marginTop: 8,
  },
  notebookHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  notebookIcon: {
    fontSize: 32,
    flexShrink: 0,
  },
  notebookTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 2,
  },
  notebookSub: {
    fontSize: 12,
    color: COLORS.inkLight,
    lineHeight: 1.5,
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
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    fontSize: 14,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    background: COLORS.paperAlt,
    color: COLORS.ink,
    resize: "vertical",
    marginBottom: 12,
    boxSizing: "border-box",
    outline: "none",
    lineHeight: 1.7,
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
    transition: "opacity 0.2s",
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
  exerciseBtn: {
    display: "block",
    width: "calc(100% - 32px)",
    maxWidth: 688,
    margin: "0 auto 32px",
    background: COLORS.ink,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
};
