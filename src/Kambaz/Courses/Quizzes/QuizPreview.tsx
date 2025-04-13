/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux"; // <-- you forgot this import

const QuizPreviewScreen = () => {
  const navigate = useNavigate();
  const { qid } = useParams();

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz Preview: {quiz.title}</h1>
      {quiz.questions.map((q: any, idx: number) => (
        <div key={q.questionId} className="mb-6 border-b pb-4">
          <p className="font-medium">
            {idx + 1}. {q.question}
          </p>

          {q.type === "multiple_choice" && (
            <div className="space-y-2 mt-2">
              {q.choices.map((c: any) => (
                <label key={c.id} className="block">
                  <input
                    type="radio"
                    name={q.questionId}
                    value={c.id}
                    disabled={submitted}
                    checked={answers[q.questionId] === c.id}
                    onChange={() => handleAnswer(q.questionId, c.id)}
                  />{" "}
                  {c.text}
                </label>
              ))}
            </div>
          )}

          {q.type === "true_false" && (
            <div className="space-x-4 mt-2">
              <label>
                <input
                  type="radio"
                  name={q.questionId}
                  value="true"
                  disabled={submitted}
                  checked={answers[q.questionId] === true}
                  onChange={() => handleAnswer(q.questionId, true)}
                />{" "}
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={q.questionId}
                  value="false"
                  disabled={submitted}
                  checked={answers[q.questionId] === false}
                  onChange={() => handleAnswer(q.questionId, false)}
                />{" "}
                False
              </label>
            </div>
          )}

          {q.type === "fill_in_blank" && (
            <input
              type="text"
              className="mt-2 border rounded px-2 py-1"
              disabled={submitted}
              value={answers[q.questionId] || ""}
              onChange={(e) => handleAnswer(q.questionId, e.target.value)}
            />
          )}

          {submitted && (
            <p className="mt-2 text-sm">
              {checkAnswer(q, answers[q.questionId]) ? (
                <span className="text-green-600">Correct</span>
              ) : (
                <span className="text-red-600">Incorrect</span>
              )}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <Button onClick={handleSubmit} className="mt-4">
          Submit Preview
        </Button>
      ) : (
        <div className="mt-6">
          <p className="text-lg font-bold">
            Your Score: {getScore()} / {quiz.points}
          </p>
          <Button className="mt-2" onClick={() => navigate(`/edit/${quiz._id}`)}>
            Edit Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPreviewScreen;
