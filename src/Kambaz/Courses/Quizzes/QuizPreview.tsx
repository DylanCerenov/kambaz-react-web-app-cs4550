/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const QuizPreviewScreen = () => {
  const navigate = useNavigate();
  const { qid } = useParams();
  const { cid } = useParams();


  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === qid);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div>Loading quiz...</div>;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const checkAnswer = (question: any, answer: any) => {
    if (question.type === "multiple_choice") {
      return question.choices.find((c: any) => c.id === answer)?.isCorrect;
    } else if (question.type === "true_false") {
      return question.correctAnswerIsTrue === answer;
    } else if (question.type === "fill_in_blank") {
      return question.possibleAnswers?.some((ans: any) =>
        ans.caseInsensitive
          ? ans.text.toLowerCase() === answer.toLowerCase()
          : ans.text === answer
      );
    }
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.questions.forEach((q: any) => {
      if (checkAnswer(q, answers[q.questionId])) {
        score += q.points;
      }
    });
    return score;
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Quiz Preview: {quiz.title}</h1>

      {quiz.questions.map((q: any, idx: number) => (
        <div key={q.questionId} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              {idx + 1}. {q.question}
            </h5>

            {/* multiple choice */}
            {q.type === "multiple_choice" && (
              <div className="mt-2 d-flex flex-column gap-2">
                {q.choices.map((c: any) => (
                  <label key={c.id}>
                    <input
                      type="radio"
                      name={q.questionId}
                      value={c.id}
                      className="me-2"
                      disabled={submitted}
                      checked={answers[q.questionId] === c.id}
                      onChange={() => handleAnswer(q.questionId, c.id)}
                    />
                    {c.text}
                  </label>
                ))}
              </div>
            )}

            {/* true and false */}
            {q.type === "true_false" && (
              <div className="mt-2 d-flex flex-column gap-2">
                <label>
                  <input
                    type="radio"
                    name={q.questionId}
                    value="true"
                    className="me-2"
                    disabled={submitted}
                    checked={answers[q.questionId] === true}
                    onChange={() => handleAnswer(q.questionId, true)}
                  />
                  True
                </label>
                <label>
                  <input
                    type="radio"
                    name={q.questionId}
                    value="false"
                    className="me-2"
                    disabled={submitted}
                    checked={answers[q.questionId] === false}
                    onChange={() => handleAnswer(q.questionId, false)}
                  />
                  False
                </label>
              </div>
            )}

            {/* fill in the blank */}
            {q.type === "fill_in_blank" && (
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  disabled={submitted}
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleAnswer(q.questionId, e.target.value)}
                />
              </div>
            )}

            {/* correct or incorrect display after submit */}
            {submitted && (
              <p className="mt-2">
                {checkAnswer(q, answers[q.questionId]) ? (
                  <span className="text-success fw-semibold">Correct</span>
                ) : (
                  <span className="text-danger fw-semibold">Incorrect</span>
                )}
              </p>
            )}
          </div>
        </div>
      ))}

      {!submitted ? (
        <Button variant="primary" onClick={handleSubmit}>
          Submit Preview
        </Button>
      ) : (
        <div className="mt-4">
          <p className="fw-bold">
            Score: {getScore()} / {quiz.points}
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)}
          >
            Edit Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPreviewScreen;


