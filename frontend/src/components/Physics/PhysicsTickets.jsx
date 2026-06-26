import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const physicsTickets = [
  {
    id: 1,
    title: "مصطلحات فيزيائية",
    done: true,
    description: "دراسة حركة الأجسام والقوى المؤثرة عليها.",
    topics: [
      "قوانين نيوتن",
      "السرعة والتسارع",
      "الحركة على خط مستقيم",
      "القوة والاحتكاك",
    ],
    link:"physicsQuantities"
  },
  {
    id: 2,
    title: "قوانين نيوتن",
    done: true,
    description: "أنواع الطاقة وتحولاتها وقانون حفظ الطاقة.",
    topics: ["الطاقة الحركية", "الطاقة الكامنة", "الشغل", "حفظ الطاقة"],
    link : "newtonsLaws"
  },
  {
    id: 3,
    title: "المتجهات",
    done: true,
    description: "مبادئ عمل المحركات والآلات البسيطة.",
    topics: ["الآلات البسيطة", "القدرة", "الكفاءة", "تطبيقات عملية"],
    link: "Vectors"
  },
  {
    id: 4,
    title: "الموجات",
    done: false,
    description: "خصائص الموجات وأنواعها وانتشارها.",
    topics: [
      "الموجات الميكانيكية",
      "الطول الموجي والتردد",
      "موجات الصوت",
      "التداخل والانعراج",
    ],
  },
  {
    id: 5,
    title: "الكهرباء",
    done: false,
    description: "مبادئ الكهرباء الساكنة والتيار الكهربائي.",
    topics: [
      "الشحنة الكهربائية",
      "قانون أوم",
      "الدوائر الكهربائية",
      "القدرة الكهربائية",
    ],
  },
  {
    id: 6,
    title: "المغناطيسية",
    done: false,
    description: "الظواهر المغناطيسية وعلاقتها بالكهرباء.",
    topics: [
      "المجال المغناطيسي",
      "القوة المغناطيسية",
      "الحث الكهرومغناطيسي",
      "المحول الكهربائي",
    ],
  },
  {
    id: 7,
    title: "الضوء",
    done: false,
    description: "خصائص الضوء وانعكاسه وانكساره.",
    topics: [
      "الانعكاس",
      "الانكسار",
      "العدسات والمرايا",
      "الطبيعة المزدوجة للضوء",
    ],
  },
  {
    id: 8,
    title: "الفيزياء الحديثة",
    done: false,
    description: "مفاهيم الفيزياء الحديثة والنسبية والكم.",
    topics: [
      "النظرية النسبية",
      "الفيزياء الكمية",
      "التركيب الذري",
      "الإشعاع النووي",
    ],
  },
];

const subjects = [
  { id: "math", name: "رياضيات", icon: "∑", color: "#4F46E5", active: false },
  { id: "arabic", name: "عربي", icon: "ض", color: "#059669", active: false },
  { id: "physics", name: "فيزياء", icon: "⚛", color: "#D97706", active: true },
  {
    id: "chemistry",
    name: "كيمياء",
    icon: "⚗",
    color: "#DC2626",
    active: false,
  },
];

const COLOR = "#D97706";
const done = physicsTickets.filter((t) => t.done).length;
const total = physicsTickets.length;
const pct = Math.round((done / total) * 100);

export default function PhysicsTickets({ onStart }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const selectedTicket = physicsTickets.find((t) => t.id === selected);

  return (
    <div
      style={{ ...styles.wrapper, flexDirection: isMobile ? "column" : "row" }}
    >
      {/* ── Sidebar (desktop) ── */}
      {!isMobile && (
        <div style={styles.sidebar}>
          <div style={styles.avatar}>أ</div>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                if (!s.active) navigate("/");
              }}
              style={{
                ...styles.navItem,
                background: s.active ? s.color : "transparent",
              }}
            >
              <span
                style={{ fontSize: 22, color: s.active ? "#fff" : "#94a3b8" }}
              >
                {s.icon}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: s.active ? "#fff" : "#64748b",
                  fontWeight: 600,
                }}
              >
                {s.name}
              </span>
            </button>
          ))}
          <button
            onClick={() => navigate("/")}
            style={styles.backBtn}
            title="رجوع"
          >
            ←
          </button>
        </div>
      )}

      {/* ── Main content ── */}
      <div
        style={{
          ...styles.main,
          paddingBottom: isMobile ? "90px" : "32px",
        }}
      >
        {/* Header */}
        <div style={styles.subjectHeader}>
          <div style={{ ...styles.iconCircle, background: COLOR }}>
            <span style={{ fontSize: 22, color: "#fff" }}>⚛</span>
          </div>
          <div>
            <h2 style={{ ...styles.subjectName, color: COLOR }}>فيزياء</h2>
            <p style={styles.subjectSub}>
              {done} من {total} تيكت
            </p>
          </div>
        </div>

        {/* Progress */}
        <div style={styles.progressCard}>
          <div style={styles.progressRow}>
            <span style={styles.progressLabel}>التقدم</span>
            <span style={{ ...styles.progressPct, color: COLOR }}>{pct}%</span>
          </div>
          <div style={styles.progressBg}>
            <div
              style={{
                ...styles.progressFill,
                width: `${pct}%`,
                background: COLOR,
              }}
            />
          </div>
        </div>

        {/* Tickets */}
        <p style={styles.sectionLabel}>التيكتس</p>
        <div style={styles.ticketList}>
          {physicsTickets.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                ...styles.ticketItem,
                borderRight: `3px solid ${t.done ? COLOR : "#e2e8f0"}`,
                background: selected === t.id ? "#FFFBEB" : "#fff",
                outline: selected === t.id ? `2px solid ${COLOR}` : "none",
              }}
            >
              <div>
                <p style={styles.ticketTitle}>{t.title}</p>
                <p style={styles.ticketStatus}>
                  {t.done ? "✅ مكتمل" : "⏳ لم يبدأ"}
                </p>
              </div>
              <div
                style={{
                  ...styles.ticketBadge,
                  background: t.done ? COLOR : "#e2e8f0",
                  color: t.done ? "#fff" : "#94a3b8",
                }}
              >
                {t.id}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail Panel ── */}
      {!isMobile && (
        <div style={styles.detailPanel}>
          {!selectedTicket ? (
            <div style={styles.emptyState}>
              <span style={{ fontSize: 48 }}>📚</span>
              <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 14 }}>
                اختر تيكت لعرض تفاصيله
              </p>
            </div>
          ) : (
            <div style={{ direction: "rtl" }}>
              <div style={{ ...styles.detailHeader, background: COLOR }}>
                <div style={styles.detailBadge}>{selectedTicket.id}</div>
                <div>
                  <h3 style={styles.detailTitle}>{selectedTicket.title}</h3>
                  <p style={styles.detailStatus}>
                    {selectedTicket.done ? "✅ مكتمل" : "⏳ لم يبدأ"}
                  </p>
                </div>
              </div>

              <div style={styles.detailSection}>
                <p style={styles.detailSectionLabel}>عن هذا الموضوع</p>
                <p style={styles.detailDesc}>{selectedTicket.description}</p>
              </div>

              <div style={styles.detailSection}>
                <p style={styles.detailSectionLabel}>المحاور الرئيسية</p>
                {selectedTicket.topics.map((topic, i) => (
                  <div key={i} style={styles.topicItem}>
                    <div style={{ ...styles.topicDot, background: COLOR }} />
                    <span style={styles.topicText}>{topic}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(`/${selectedTicket.link}`)}
                style={{ ...styles.startBtn, background: COLOR }}
              >
                {selectedTicket.done ? "🔁 مراجعة الدرس" : "▶ ابدأ الدرس"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Bottom Nav (mobile) ── */}
      {isMobile && (
        <div style={styles.bottomNav}>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                if (!s.active) navigate("/");
              }}
              style={{
                ...styles.bottomNavItem,
                background: s.active ? s.color : "transparent",
              }}
            >
              <span
                style={{ fontSize: 20, color: s.active ? "#fff" : "#94a3b8" }}
              >
                {s.icon}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: s.active ? "#fff" : "#64748b",
                  fontWeight: 600,
                }}
              >
                {s.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    background: "#F8FAFC",
  },
  sidebar: {
    width: 72,
    background: "#1E293B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 48,
    gap: 6,
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#4F46E5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 20,
  },
  navItem: {
    width: 58,
    padding: "10px 0",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    transition: "background 0.2s",
  },
  backBtn: {
    marginTop: "auto",
    marginBottom: 24,
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "#334155",
    color: "#94a3b8",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    background: "#1E293B",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 100,
    borderTop: "1px solid #334155",
  },
  bottomNavItem: {
    flex: 1,
    height: "100%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    transition: "background 0.2s",
  },
  main: {
    flex: 1,
    overflowY: "auto",
    padding: "40px 16px 32px",
    direction: "rtl",
    maxWidth: 800,
    boxSizing: "border-box",
  },
  subjectHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subjectName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  subjectSub: {
    margin: 0,
    fontSize: 12,
    color: "#94a3b8",
  },
  progressCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "12px 14px",
    marginBottom: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: "#64748b",
  },
  progressPct: {
    fontSize: 13,
    fontWeight: 700,
  },
  progressBg: {
    height: 7,
    background: "#e2e8f0",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.4s",
  },
  sectionLabel: {
    margin: "0 0 10px",
    fontSize: 14,
    fontWeight: 600,
    color: "#475569",
  },
  ticketList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  ticketItem: {
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    border: "none",
    cursor: "pointer",
    textAlign: "right",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.15s",
  },
  ticketTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: "#1e293b",
  },
  ticketStatus: {
    margin: "3px 0 0",
    fontSize: 12,
    color: "#94a3b8",
  },
  ticketBadge: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },

  // ── Detail Panel ──
  detailPanel: {
    flex: 1,
    maxWidth: 500,
    flexShrink: 0,
    background: "#fff",
    borderLeft: "1px solid #e2e8f0",
    overflowY: "auto",
    height: "100vh",
    position: "sticky",
    top: 0,
  },
  emptyState: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    textAlign: "center",
    minHeight: "100vh",
  },
  detailHeader: {
    padding: "24px 20px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    color: "#fff",
  },
  detailBadge: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  detailTitle: { margin: 0, fontSize: 16, fontWeight: 700 },
  detailStatus: { margin: "4px 0 0", fontSize: 12, opacity: 0.85 },
  detailSection: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9" },
  detailSectionLabel: {
    margin: "0 0 10px",
    fontSize: 12,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailDesc: { margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.7 },
  topicItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  topicDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  topicText: { fontSize: 13, color: "#334155" },
  startBtn: {
    margin: "20px",
    width: "calc(100% - 40px)",
    padding: "12px",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
};
