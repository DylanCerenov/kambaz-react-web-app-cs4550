import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (!cid) return;

    const fetchQuiz = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid);
      const currentQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(currentQuiz);
    };

    fetchQuiz();
    // Using location here to force the component to reload when navigating
    // back from the details editor.
  }, [cid, qid, location.key]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <button 
        className="btn btn-outline-secondary me-2"
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/preview`)}
        >Preview</button>
        <button
          className="btn btn-outline-secondary"
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

      <h3 className="fw-semibold mb-4">{quiz.title}</h3>

      <div className="mb-4">
        <div>
          <strong>Quiz Type</strong> &nbsp; {quiz.quizType}
        </div>
        <div>
          <strong>Points</strong> &nbsp; {quiz.points}
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
          <strong>Multiple Attempts</strong> &nbsp; {quiz.multipleAttempts}
        </div>
        <div>
          <strong>View Responses - not in data rn </strong> &nbsp; {}
        </div>
        <div>
          <strong>Show Correct Answers</strong> &nbsp; {quiz.showCorrectAnswers}
        </div>
        <div>
          <strong>One Question at a Time</strong> &nbsp;{" "}
          {quiz.oneQuestionAtATime}
        </div>
        <div>
          <strong>Required to View Quiz Results - not in data rn </strong>{" "}
          &nbsp; {quiz["required to view quiz results"]}
        </div>
        <div>
          <strong>Webcam Required</strong> &nbsp; {quiz.webcamRequired}
        </div>
        <div>
          <strong>Lock Questions After Answering - not in data</strong> &nbsp;{" "}
          {quiz["lock questions after answering"]}
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
            <td>{quiz["due date"]}</td>
            <td>Everyone</td>
            <td>{quiz["available date"]}</td>
            <td>{quiz["until date"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
