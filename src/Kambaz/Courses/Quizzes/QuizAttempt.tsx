import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { findGrade, updateGrade } from "./client.ts"; // Adjust path if needed
import * as coursesClient from "../client";

const QuizAttempts = () => {
  const navigate = useNavigate();
  const { cid, qid, uid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cid) return;

    const fetchQuiz = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid);
      const currentQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(currentQuiz);
    };

    const loadGrade = async () => {
      if (!uid || !qid) return;
      try {
        const grade = await findGrade(qid, uid);
        if (grade?.quiz) {
          setAnswers(grade.answers || {});
          setSubmitted(true);
        }
      } catch (err) {
        console.log("No previous attempt found.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
    loadGrade();
  }, [cid, qid, uid]);

  if (!quiz) return <div>Loading quiz...</div>;
  if (loading) return <div>Loading previous attempt...</div>;

  const checkAnswer = (question: any, answer: any) => {
    if (question.type === "multiple_choice") {
      return question.choices.find((c: any) => c.id === answer)?.isCorrect;
    } else if (question.type === "true_false") {
      return question.correctAnswerIsTrue === answer;
    } else if (question.type === "fill_in_blank") {
      return question.possibleAnswers?.some((ans: any) =>
        ans.caseInsensitive
          ? ans.text.toLowerCase() === answer?.toLowerCase()
          : ans.text === answer
      );
    }
    return false;
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
      <h1 className="mb-4">Previous Attempt: {quiz.title}</h1>

      {quiz.questions?.map((q: any, idx: number) => (
        <div key={q.questionId} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">
              {idx + 1}. {q.question}
            </h5>

            {/* Show selected answer, disabled */}
            {q.type === "multiple_choice" && (
              <div className="mt-2 d-flex flex-column gap-2">
                {q.choices.map((c: any) => (
                  <label key={c.id}>
                    <input
                      type="radio"
                      name={q.questionId}
                      value={c.id}
                      className="me-2"
                      disabled
                      checked={answers[q.questionId] === c.id}
                    />
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
                    disabled
                    checked={answers[q.questionId] === true}
                  />
                  True
                </label>
                <label>
                  <input
                    type="radio"
                    name={q.questionId}
                    value="false"
                    className="me-2"
                    disabled
                    checked={answers[q.questionId] === false}
                  />
                  False
                </label>
              </div>
            )}

            {q.type === "fill_in_blank" && (
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={answers[q.questionId] || ""}
                />
              </div>
            )}

            <p className="mt-2">
              {checkAnswer(q, answers[q.questionId]) ? (
                <span className="text-success fw-semibold">Correct</span>
              ) : (
                <span className="text-danger fw-semibold">Incorrect</span>
              )}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <p className="fw-bold">
          Score: {getScore()} / {quiz.points}
        </p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default QuizAttempts;
