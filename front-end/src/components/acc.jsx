import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Load() {
  const [questions, setQuestions] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "80px" }}>Loading FAQs…</p>;
  }

  return (
    <>
      {/* ✅ CSS LIVES HERE */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #0f172a;
          color: #e5e7eb;
        }

        .faq-wrapper {
          max-width: 720px;
          margin: 80px auto;
          padding: 0 20px;
        }

        .faq-title {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 32px;
        }

        .faq-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .faq-item {
          background: #020617;
          border-radius: 12px;
          margin-bottom: 14px;
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          color: inherit;
          padding: 18px 22px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .faq-question:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .icon {
          font-size: 1.4rem;
        }

        .faq-answer {
          padding: 0 22px 18px;
          color: #cbd5f5;
          line-height: 1.6;
        }
      `}</style>

      <div className="faq-wrapper">
        <h1 className="faq-title">Frequently Asked Questions</h1>

        <ul className="faq-list">
          {questions.map(q => {
            const isOpen = openId === q._id;

            return (
              <li key={q._id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenId(isOpen ? null : q._id)}
                  aria-expanded={isOpen}
                >
                  <span>{q.text}</span>
                  <span className="icon">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{q.answer}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Load;
