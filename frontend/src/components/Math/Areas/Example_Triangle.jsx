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

// ── Example 1: مثلث قاعدته 8 سم وارتفاعه 5 سم ──
const EXAMPLE_BASIC = {
  equation: "مثلث قاعدته 8 سم وارتفاعه 5 سم",
  label: "مثال أساسي",
  steps: [
    {
      text: "لدينا مثلث، وقانون مساحته هو ضرب القاعدة في الارتفاع ثم القسمة على 2. القاعدة هنا 8 سم والارتفاع 5 سم.",
      display: "م = (ق × ا) ÷ 2",
      audio: "/audio/triangle-basic-step1.mp3",
    },
    {
      text: "نعوّض القيم المعطاة في القانون: القاعدة 8 والارتفاع 5.",
      display: "م = (8 × 5) ÷ 2",
      audio: "/audio/triangle-basic-step2.mp3",
    },
    {
      text: "نضرب القاعدة في الارتفاع أولاً.",
      display: "م = 40 ÷ 2",
      audio: "/audio/triangle-basic-step3.mp3",
    },
    {
      text: "نقسم الناتج على 2 لنحصل على المساحة النهائية، مع إضافة الوحدة المربعة.",
      display: "الحل النهائي: م = 20 سم²",
      audio: "/audio/triangle-basic-step4.mp3",
      isFinal: true,
    },
  ],
};

// ── Example 2: مثلث قاعدته 12 سم وارتفاعه 7 سم ──
const EXAMPLE_LARGER = {
  equation: "مثلث قاعدته 12 سم وارتفاعه 7 سم",
  label: "مثال بأرقام أكبر",
  steps: [
    {
      text: "نفس القانون يُطبّق دائماً مهما كانت الأرقام: نضرب القاعدة في الارتفاع ثم نقسم الناتج على 2.",
      display: "م = (ق × ا) ÷ 2",
      audio: "/audio/triangle-larger-step1.mp3",
    },
    {
      text: "نعوّض القيم المعطاة: القاعدة 12 سم والارتفاع 7 سم.",
      display: "م = (12 × 7) ÷ 2",
      audio: "/audio/triangle-larger-step2.mp3",
    },
    {
      text: "نضرب القاعدة في الارتفاع أولاً.",
      display: "م = 84 ÷ 2",
      audio: "/audio/triangle-larger-step3.mp3",
    },
    {
      text: "نقسم الناتج على 2 لنحصل على المساحة النهائية، مع إضافة الوحدة المربعة.",
      display: "الحل النهائي: م = 42 سم²",
      audio: "/audio/triangle-larger-step4.mp3",
      isFinal: true,
    },
  ],
};

const EXAMPLES = [EXAMPLE_BASIC, EXAMPLE_LARGER];

export default function Example_Triangle({ onNext }) {
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
      `📌 *المثال:* حساب مساحة ${example.equation} (المثلث)\n\n` +
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
        <div style={styles.eyebrow}>مثال محلول · مساحة المثلث</div>
        <h1 style={styles.h1}>حساب مساحة {example.equation}</h1>

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
      <button onClick={() => { navigate("/questionsTriangle"); }} style={styles.exerciseBtn}>
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
    fontSize: "clamp(24px, 5.5vw, 34px)",
    fontWeight: 700,
    color: COLORS.ink,
    margin: "0 0 20px",
  },
  tabsRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
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
    fontSize: "clamp(16px, 4.5vw, 22px)",
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

  // ── Notebook ──
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
