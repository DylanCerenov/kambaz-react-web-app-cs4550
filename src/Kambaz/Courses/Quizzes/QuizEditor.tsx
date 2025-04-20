/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addQuiz, updateQuiz } from "./reducer"; //addQuiz
import { v4 as uuidv4 } from "uuid";
import * as quizClient from "./client";
import * as coursesClient from "../client";
import { FormControl } from "react-bootstrap";
function formatDate(year: number, month: number, day: number) {
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}`;
}
function stringDateToObject(inputDate: string) {
  const [year, month, day] = inputDate.split("-").map(Number);

  return {
    year: year,
    month: month,
    day: day,
    hour: 0,
    minute: 0,
  };
}

export default function QuizEditor() {
  let { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === qid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(quiz?.title || "");
  const [desc, setDesc] = useState(quiz?.desc || "");
  const [points] = useState(quiz?.points || 0);
  const [quizType, setQuizType] = useState(quiz?.quizType || "Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState(
    quiz?.assignmentGroup || "Quizzes"
  );
  const [shuffleAnswers, setShuffleAnswers] = useState(
    quiz?.shuffleAnswers || "Yes"
  );
  const [timeLimit, setTimeLimit] = useState(quiz?.timeLimit || 20);
  const [multipleAttempts, setMultipleAttempts] = useState(
    quiz?.multipleAttempts || "No"
  );
  const [howManyAttempts, setHowManyAttempts] = useState(
    quiz?.howManyAttempts || ""
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(
    quiz?.showCorrectAnswers || "No"
  );
  const [showCorrectAnswersAfter, setShowCorrectAnswersAfter] = useState(
    quiz
      ? formatDate(quiz.dueDate.year, quiz.dueDate.month, quiz.dueDate.day)
      : ""
  );
  const [accessCode, setAccessCode] = useState(quiz?.accessCode || "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(
    quiz?.oneQuestionAtATime || "No"
  );
  const [webcamRequired, setWebcamRequired] = useState(
    quiz?.webcamRequired || "No"
  );
  const [lockQuestions, setLockQuestions] = useState(
    quiz?.lockQuestionsAfterAnswering || "No"
  );

  const [dueDate, setDueDate] = useState(
    quiz
      ? formatDate(quiz.dueDate.year, quiz.dueDate.month, quiz.dueDate.day)
      : "2024-05-13"
  );
  const [availableDate, setAvailableDate] = useState(
    quiz
      ? formatDate(
          quiz.availableDate.year,
          quiz.availableDate.month,
          quiz.availableDate.day
        )
      : "2024-05-06"
  );
  const [untilDate, setUntilDate] = useState(
    quiz
      ? formatDate(quiz.dueDate.year, quiz.dueDate.month, quiz.dueDate.day)
      : "2024-05-13"
  );

  const createUpdateQuiz = async (shouldPublish = false) => {
    if (!cid) return;

    const baseQuiz = {
      _id: qid === "New" ? uuidv4() : qid!,
      title,
      desc,
      course: cid,
      points,
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      howManyAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering: lockQuestions,
      dueDate: stringDateToObject(dueDate),
      availableDate: stringDateToObject(availableDate),
      untilDate: stringDateToObject(untilDate),
      published: shouldPublish,
    };

    if (qid === "New") {
      const quizTemp = await coursesClient.createQuizForCourse(cid, baseQuiz);
      dispatch(addQuiz(quizTemp));
    } else {
      await quizClient.updateQuiz(baseQuiz);
      dispatch(updateQuiz(baseQuiz));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{"Edit Quiz"}</h2>

      <div className="form-group mt-2">
        <label>Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Description</label>
        <FormControl
          as="textarea"
          rows={3}
          placeholder="Description..."
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Points</label>
        <p>{points}</p>
      </div>

      <div className="form-group mt-2">
        <label>Quiz Type</label>
        <select
          className="form-control"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
        >
          <option>Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Graded Survey</option>
          <option>Ungraded Survey</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Assignment Group</label>
        <select
          className="form-control"
          value={assignmentGroup}
          onChange={(e) => setAssignmentGroup(e.target.value)}
        >
          <option>Quizzes</option>
          <option>Exams</option>
          <option>Assignments</option>
          <option>Project</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Shuffle Answers</label>
        <select
          className="form-control"
          value={shuffleAnswers}
          onChange={(e) => setShuffleAnswers(e.target.value)}
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
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Multiple Attempts</label>
        <select
          className="form-control"
          value={multipleAttempts}
          onChange={(e) => setMultipleAttempts(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {multipleAttempts === "Yes" && (
        <div className="form-group mt-2">
          <label>How Many Attempts</label>
          <input
            type="number"
            className="form-control"
            value={howManyAttempts}
            onChange={(e) => setHowManyAttempts(e.target.value)}
          />
        </div>
      )}

      <div className="form-group mt-2">
        <label>Show Correct Answers</label>
        <select
          className="form-control"
          value={showCorrectAnswers}
          onChange={(e) => setShowCorrectAnswers(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {showCorrectAnswers === "Yes" && (
        <div className="form-group mt-2">
          <label>Show Correct Answers After</label>
          <input
            type="date"
            className="form-control"
            value={showCorrectAnswersAfter}
            onChange={(e) =>
              setShowCorrectAnswersAfter(e.target.value.toString())
            }
          />
        </div>
      )}

      <div className="form-group mt-2">
        <label>Access Code</label>
        <input
          className="form-control"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>One Question at a Time</label>
        <select
          className="form-control"
          value={oneQuestionAtATime}
          onChange={(e) => setOneQuestionAtATime(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Webcam Required</label>
        <select
          className="form-control"
          value={webcamRequired}
          onChange={(e) => setWebcamRequired(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Lock Questions After Answering</label>
        <select
          className="form-control"
          value={lockQuestions}
          onChange={(e) => setLockQuestions(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label>Due Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Available Date</label>
        <input
          type="date"
          className="form-control"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
        />
      </div>

      <div className="form-group mt-2">
        <label>Until Date</label>
        <input
          type="date"
          className="form-control"
          value={untilDate}
          onChange={(e) => setUntilDate(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            createUpdateQuiz(false);
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-success ms-2"
          onClick={() => {
            createUpdateQuiz(true);
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
          }}
        >
          Save & Publish
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
