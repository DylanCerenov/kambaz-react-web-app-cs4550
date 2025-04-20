/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser.role === "STUDENT";
  const uid = currentUser._id; // or currentUser.id depending on your user object
  const formatDate = (dateObj: any) => {
    if (
      !dateObj ||
      typeof dateObj !== "object" ||
      dateObj.year === undefined ||
      dateObj.month === undefined ||
      dateObj.day === undefined
    ) {
      return "Unknown";
    }

    const { year, month, day, hour = 0, minute = 0 } = dateObj;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`;
  };

  const [hasPreviousAttempt, setHasPreviousAttempt] = useState<boolean | null>(
    null
  );
  const [hasMoreAttempts, setHasMoreAttempts] = useState<boolean | null>(null);

  useEffect(() => {
    if (!cid) return;

    const fetchQuiz = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid);
      const currentQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(currentQuiz);
    };

    const checkPreviousAttempt = async () => {
      if (qid && uid) {
        const grade = await quizzesClient.findGrade(qid, uid);

        if (grade) {
          setHasPreviousAttempt(true);
        } else {
          setHasPreviousAttempt(false);
        }
      }
    };

    const checkIfUserHasMoreAttempts = async () => {
      if (qid && uid) {
        const grade = await quizzesClient.findGrade(qid, uid);
        const quizzes = await coursesClient.findQuizzesForCourse(cid);
        const currentQuiz = quizzes.find((q: any) => q._id === qid);
        setQuiz(currentQuiz);

        if (grade) {
          console.log("got here instead");
          console.log("grade.attemptsCount: " + grade.attemptsCount);
          console.log("quiz: " + currentQuiz);
          console.log("quiz.howManyAttempts: " + currentQuiz.howManyAttempts);

          const countAttempts = grade.attemptsCount;
          const quizAllowedAttempts = currentQuiz.howManyAttempts;

          if (countAttempts < quizAllowedAttempts) {
            setHasMoreAttempts(true);
          } else {
            console.log("got here");
            console.log("countAttempts: " + countAttempts);
            console.log("quizAllowedAttempts: " + quizAllowedAttempts);
            setHasMoreAttempts(false);
          }
        } else {
          setHasMoreAttempts(true);
        }
      }
    };

    fetchQuiz();
    checkPreviousAttempt();
    checkIfUserHasMoreAttempts();
  }, [cid, uid, qid, location.key]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      {!isStudent && (
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/preview`)
            }
          >
            Preview
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)
            }
          >
            Quiz Details Editor
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Questions`)
            }
          >
            Quiz Questions Editor
          </button>
        </div>
      )}

      <h3 className="fw-semibold mb-4">{quiz.title}</h3>

      <div className="mb-4">
        <div>
          <strong>Quiz Type</strong> &nbsp; {quiz.quizType}
        </div>
        <div>
          <strong>Assignment Group</strong> &nbsp; {quiz.assignmentGroup}
        </div>
        <div>
          <strong>Shuffle Answers</strong> &nbsp; {quiz.shuffleAnswers}
        </div>
        <div>
          <strong>Time Limit</strong> &nbsp; {quiz.timeLimit}
        </div>
        <div>
          <strong>Lock Questions After Answering</strong> &nbsp;{" "}
          {quiz.lockQuestionsAfterAnswering}
        </div>

        <div>
          <strong>Show Correct Answers</strong> &nbsp; {quiz.showCorrectAnswers}
        </div>
        <div>
          <strong>Access Code</strong> &nbsp; {quiz.accessCode}
        </div>
        <div>
          <strong>One Question at a Time</strong> &nbsp;{" "}
          {quiz.oneQuestionAtATime}
        </div>
        <div>
          <strong>Webcam Required</strong> &nbsp; {quiz.webcamRequired}
        </div>

        <div>
          <strong>Multiple Attempts</strong> &nbsp; {quiz.multipleAttempts}
        </div>
        <div>
          <strong>How Many Attempts</strong> &nbsp; {quiz.howManyAttempts}
        </div>
        <div>
          <strong>Points</strong> &nbsp; {quiz.points}
        </div>
      </div>

      <table className="table w-auto">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>

      {isStudent && (
        <div className="mt-4 text-center">
          {hasMoreAttempts && (
            <button
              className="btn btn-danger me-2"
              onClick={() =>
                navigate(
                  `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/takingquiz`
                )
              }
            >
              Take the Quiz
            </button>
          )}
          {hasPreviousAttempt && (
            <button
              className="btn btn-warning"
              onClick={() =>
                navigate(
                  `/Kambaz/Courses/${cid}/Quizzes/${qid}/${uid}/PreviousAttempts`
                )
              }
            >
              View Previous Attempts
            </button>
          )}
        </div>
      )}
    </div>
  );
}
