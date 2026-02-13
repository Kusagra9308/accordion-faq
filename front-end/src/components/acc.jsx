import { useEffect, useState } from "react";

const API_URL =  import.meta.env.VITE_API_URL;


function Load() {
  const [questions, setQuestions] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/questions`)
      .then(res => res.json())
      .then(setQuestions)
      .catch(console.error);
  }, []);

  return (
    <ul className="ques-list">
      {questions.map(q => (
        <li key={q._id}>
          {q.text}
          <button
            onClick={() =>
              setOpenId(openId === q._id ? null : q._id)
            }
          >
            ▼
          </button>

          {openId === q._id && <p>{q.answer}</p>}
        </li>
      ))}
    </ul>
  );
}

export default Load;
