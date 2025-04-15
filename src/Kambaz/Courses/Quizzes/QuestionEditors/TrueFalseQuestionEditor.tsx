import { useState } from "react";
import {
  Button,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as quizzesClient from "../client";
import { updateQuiz } from "../reducer";

// 1) Define your props interface:
interface TrueFalseQuestionEditorProps {
  titleParameter: string;
  pointsParameter: number;
  questionTextParameter: string;
  correctAnswerIsTrueParameter: boolean;
}

// 2) De-structure props in the function signature:
export default function TrueFalseQuestionEditor({
  titleParameter,
  pointsParameter,
  questionTextParameter,
  correctAnswerIsTrueParameter,
}: TrueFalseQuestionEditorProps) {
  // Now TypeScript knows exactly what props we have.

  let { cid, quizId, questionId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleParameter);
  const [questionText, setQuestionText] = useState(questionTextParameter);
  const [points, setPoints] = useState(pointsParameter);
  const [correctAnswer, setCorrectAnswer] =
    useState(correctAnswerIsTrueParameter);

  const updateQuestion = async () => {
    if (!cid || !quizId) {
      return;
    }

    const newQuestion = {
      questionId: questionId,
      type: "true_false",
      points: points,
      question: questionText,
      correctAnswerIsTrue: correctAnswer,
    };

    const updatedQuiz = await quizzesClient.updateQuizQuestion(quizId, newQuestion);
    dispatch(updateQuiz(updatedQuiz));
  };

  return (
    <div>
      <h1>True/False Editor</h1>
      <FormGroup className="mb-3" controlId="wd-assignment-name">
        <FormLabel>Title</FormLabel>
        <FormControl
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3" controlId="wd-assignment-name">
        <FormLabel>Points</FormLabel>
        <FormControl
          type="number"
          defaultValue={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </FormGroup>

      <FormGroup className="mb-3" controlId="wd-textarea">
        <FormLabel>Question</FormLabel>
        <FormControl
          as="textarea"
          rows={3}
          defaultValue={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </FormGroup>

      <strong>Correct Answer:</strong>
      <FormGroup>
        <FormCheck
          type="radio"
          label="True"
          name="correct-answer"
          checked={correctAnswer === true}
          onChange={() => setCorrectAnswer(true)}
        />
        <FormCheck
          type="radio"
          label="False"
          name="correct-answer"
          checked={correctAnswer === false}
          onChange={() => setCorrectAnswer(false)}
        />
      </FormGroup>
      <br />

      <div className="wd-flex-row-container">
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes/${quizId}`}
          className="wd-dashboard-course-link text-decoration-none text-dark"
        >
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
            onClick={updateQuestion}
          >
            Save
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
          >
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
}
