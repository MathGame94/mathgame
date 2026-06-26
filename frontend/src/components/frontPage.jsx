import { useNavigate } from "react-router-dom";
import "./frontPage.css";

export default function FrontPage() {
  const navigate = useNavigate();

  const programs = [
    {
      title: "برنامج الرياضيات",
      image: "/mathmatics.png",
      path: "/mathtickets",
      className: "math",
    },
    {
      title: "برنامج العربي",
      image: "/arabic.png",
      path: "/arabicTickets",
      className: "arabic",
    },
    {
      title: "برنامج الفيزياء",
      image: "/physics.png",
      path: "/physicsTickets",
      className: "physics",
    },
    {
      title: "برنامج الكيمياء",
      image: "/chemistry.png",
      path: "/chemistryTickets",
      className: "chemistry",
    },
  ];

  return (
    <main className="frontPage">
      <section className="hero">
        <div className="heroBadge">منصة تعليمية</div>
        <h1>أهلا وسهلا في برنامج الدعم التعليمي</h1>
        <p>اختر المادة التي تريد البدء بها من البطاقات التالية</p>
      </section>

      <section className="cardsPage">
        {programs.map((program) => (
          <button
            key={program.title}
            className={`programCard ${program.className}`}
            onClick={() => navigate(program.path)}
          >
            <div className="imageWrap">
              <img src={program.image} alt={program.title} />
            </div>

            <div className="cardBody">
              <h2>{program.title}</h2>
              <span>ابدأ الآن</span>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}