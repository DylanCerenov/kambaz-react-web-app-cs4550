import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { findGrade } from "./client.ts";

const QuizAttempts = () => {
  const { qid, uid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [score, setScore] = useState(0);
  const [submissionTime, setSubmissionTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreviousAnswers = async () => {
      try {
        if (!qid || !uid) {
          setError("Missing quiz ID or user ID.");
          return;
        }

        const grade = await findGrade(qid, uid);
        if (grade?.answers) {
          setAnswers(grade.answers);
        } else {
          setError("No answers found for this quiz attempt.");
        }

        setScore(grade.score);
        setSubmissionTime(grade.submissionTime);
      } catch (error) {
        console.error("Error loading previous answers:", error);
        setError("Failed to load previous answers.");
      } finally {
        setLoading(false);
      }
    };

    loadPreviousAnswers();
  }, [qid, uid]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!quiz) return <div>Quiz not found.</div>;

  return (
    <div className="container my-4">
      <h1 className="text-2xl font-bold mb-4">
        Quiz Attempt Review: {quiz.title}
      </h1>

      <p>
        Points: {score} / {quiz.points}
      </p>
      <p>Submission Time: {submissionTime}</p>

      {quiz.questions.map((q: any, idx: number) => {
        const answer = answers[q.questionId];
        const isCorrect = checkAnswer(q, answer);

        return (
          <div key={q.questionId} className="mb-6 border-bottom pb-3">
            <p className="fw-semibold">
              {idx + 1}. {q.question}
            </p>

            {q.type === "multiple_choice" && (
              <div className="mt-2 d-flex flex-column gap-2">
                {q.choices.map((c: any) => (
                  <label key={c.id}>
                    <input
                      type="radio"
                      disabled
                      name={q.questionId}
                      value={c.id}
                      className="me-2"
                      checked={answer === c.id}
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
                    disabled
                    name={q.questionId}
                    value="true"
                    className="me-2"
                    checked={answer === true}
                  />
                  True
                </label>
                <label>
                  <input
                    type="radio"
                    disabled
                    name={q.questionId}
                    value="false"
                    className="me-2"
                    checked={answer === false}
                  />
                  False
                </label>
              </div>
            )}

            {q.type === "fill_in_blank" && (
              <input
                type="text"
                className="form-control mt-2"
                disabled
                value={answer || ""}
              />
            )}

            <p className="mt-2 text-sm fw-medium">
              {isCorrect ? (
                <span className="text-success">✅ Correct</span>
              ) : (
                <span className="text-danger">❌ Incorrect</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default QuizAttempts;
