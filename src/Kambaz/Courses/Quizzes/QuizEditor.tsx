/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateQuiz, addQuiz } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const editing = qid !== "new";
  const quizToEdit = quizzes.find((q: any) => q._id === qid);

  const [quiz, setQuiz] = useState<any>({
    _id: uuidv4(),
    title: "",
    points: 0,
    course: cid,
    desc: "",
    "quiz type": "Graded Quiz",
    "assignment group": "Quizzes",
    "shuffle answers": "No",
    "time limit": "",
    "multiple attempts": "No",
    "how many attempts": "",
    "show correct answers": "No",
    "access code": "",
    "one question at a time": "No",
    "webcam required": "No",
    "lock questions after answering": "No",
    "due date": "",
    "available date": "",
    "until date": "",
  });

  useEffect(() => {
    if (editing && quizToEdit) {
      setQuiz(quizToEdit);
    }
  }, [editing, quizToEdit]);

  const handleChange = (key: string, value: any) => {
    setQuiz({ ...quiz, [key]: value });
  };

  const handleSubmit = () => {
    if (editing) {
      dispatch(updateQuiz(quiz));
    } else {
      dispatch(addQuiz(quiz));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
      <h2>{editing ? "Edit Quiz" : "Create Quiz"}</h2>
      <div className="form-group mt-3">
        <label>Title</label>
        <input
          className="form-control"
          value={quiz.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Points</label>
        <input
          type="number"
          className="form-control"
          value={quiz.points}
          onChange={(e) => handleChange("points", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>Quiz Type</label>
        <select
          className="form-control"
          value={quiz["quiz type"]}
          onChange={(e) => handleChange("quiz type", e.target.value)}
        >
          <option>Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Survey</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Assignment Group</label>
        <input
          className="form-control"
          value={quiz["assignment group"]}
          onChange={(e) => handleChange("assignment group", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>Shuffle Answers</label>
        <select
          className="form-control"
          value={quiz["shuffle answers"]}
          onChange={(e) => handleChange("shuffle answers", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Time Limit (minutes)</label>
        <input
          type="number"
          className="form-control"
          value={quiz["time limit"]}
          onChange={(e) => handleChange("time limit", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>Multiple Attempts</label>
        <select
          className="form-control"
          value={quiz["multiple attempts"]}
          onChange={(e) => handleChange("multiple attempts", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      {quiz["multiple attempts"] === "Yes" && (
        <div className="form-group mt-2">
          <label>How Many Attempts</label>
          <input
            type="number"
            className="form-control"
            value={quiz["how many attempts"]}
            onChange={(e) => handleChange("how many attempts", e.target.value)}
          />
        </div>
      )}
      <div className="form-group mt-2">
        <label>Show Correct Answers</label>
        <select
          className="form-control"
          value={quiz["show correct answers"]}
          onChange={(e) => handleChange("show correct answers", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Access Code</label>
        <input
          className="form-control"
          value={quiz["access code"]}
          onChange={(e) => handleChange("access code", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>One Question at a Time</label>
        <select
          className="form-control"
          value={quiz["one question at a time"]}
          onChange={(e) => handleChange("one question at a time", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Webcam Required</label>
        <select
          className="form-control"
          value={quiz["webcam required"]}
          onChange={(e) => handleChange("webcam required", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Lock Questions After Answering</label>
        <select
          className="form-control"
          value={quiz["lock questions after answering"]}
          onChange={(e) =>
            handleChange("lock questions after answering", e.target.value)
          }
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Available Date</label>
        <input
          type="date"
          className="form-control"
          value={quiz["available date"]}
          onChange={(e) => handleChange("available date", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>Due Date</label>
        <input
          type="date"
          className="form-control"
          value={quiz["due date"]}
          onChange={(e) => handleChange("due date", e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label>Until Date</label>
        <input
          type="date"
          className="form-control"
          value={quiz["until date"]}
          onChange={(e) => handleChange("until date", e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-success mt-3">
        {editing ? "Update Quiz" : "Create Quiz"}
      </button>
    </div>
  );
}
