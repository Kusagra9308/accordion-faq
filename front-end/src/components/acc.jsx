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
    return <p className="loading">Loading FAQs…</p>;
  }

  return (
    <div className="faq-wrapper">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      <ul className="faq-list">
        {questions.map(q => {
          const isOpen = openId === q._id;

          return (
            <li
              key={q._id}
              className={`faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() =>
                  setOpenId(isOpen ? null : q._id)
                }
                aria-expanded={isOpen}
              >
                <span>{q.text}</span>
                <span className="icon">{isOpen ? "−" : "+"}</span>
              </button>

              <div className="faq-answer">
                <p>{q.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Load;
 Load;
