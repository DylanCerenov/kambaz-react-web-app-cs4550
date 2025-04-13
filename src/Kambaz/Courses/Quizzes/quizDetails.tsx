import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    if (!cid) return; // Don't call if undefined

    const fetchQuiz = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid);
      const currentQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(currentQuiz);
    };

    fetchQuiz();
  }, [cid, qid]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item">Quiz Type: {quiz["quiz type"]}</li>
        <li className="list-group-item">Points: {quiz.points}</li>
        <li className="list-group-item">
          Assignment Group: {quiz["assignment group"]}
        </li>
        <li className="list-group-item">
          Shuffle Answers: {quiz["shuffle answers"]}
        </li>
        <li className="list-group-item">Time Limit: {quiz["time limit"]}</li>
        <li className="list-group-item">
          Multiple Attempts: {quiz["multiple attempts"]}
        </li>
        {quiz["multiple attempts"] === "Yes" && (
          <li className="list-group-item">
            How Many Attempts: {quiz["how many attempts"]}
          </li>
        )}
        <li className="list-group-item">
          Show Correct Answers: {quiz["show correct answers"]}
        </li>
        <li className="list-group-item">
          Access Code: {quiz["access code"] || "None"}
        </li>
        <li className="list-group-item">
          One Question at a Time: {quiz["one question at a time"]}
        </li>
        <li className="list-group-item">
          Webcam Required: {quiz["webcam required"]}
        </li>
        <li className="list-group-item">
          Lock Questions After Answering:{" "}
          {quiz["lock questions after answering"]}
        </li>
        <li className="list-group-item">Due Date: {quiz["due date"]}</li>
        <li className="list-group-item">
          Available Date: {quiz["available date"]}
        </li>
        <li className="list-group-item">Until Date: {quiz["until date"]}</li>
      </ul>
    </div>
  );
}
