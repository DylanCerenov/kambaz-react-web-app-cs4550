/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import axios from "axios";

const TakingQuiz = () => {
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

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

  const handleSubmit = async () => {
    let total = 0;
    quiz.questions.forEach((q: any) => {
      if (checkAnswer(q, answers[q.questionId])) {
        total += q.points;
      }
    });
    setScore(total);
    setSubmitted(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_REMOTE_SERVER}/api/quizzes/${qid}/submit`,
        {
          quizId: qid,
          answers,
          score: total,
          submittedAt: new Date().toISOString(),
        }
      );
    } catch (err) {
      console.error("Error saving submission:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Take Quiz: {quiz.title}</h1>
      {quiz.questions.map((q: any, idx: number) => (
        <div key={q.questionId} className="mb-6 border-b pb-4">
          <p className="font-medium">
            {idx + 1}. {q.question}
          </p>

          {q.type === "multiple_choice" && (
            <div className="mt-2 d-flex flex-column gap-2">
              {q.choices.map((c: any) => (
                <label key={c.id} className="block">
                  <input
                    type="radio"
                    name={q.questionId}
                    value={c.id}
                    className="me-2"
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
                />{" "}
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
          Submit Quiz
        </Button>
      ) : (
        <div className="mt-6">
          <p className="text-lg font-bold">
            Your Score: {score} / {quiz.points}
          </p>
        </div>
      )}
    </div>
  );
};

export default TakingQuiz;
