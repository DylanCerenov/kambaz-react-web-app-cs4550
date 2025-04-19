import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as quizzesClient from "../client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../reducer";
import { v4 as uuidv4 } from "uuid";
// Added the FaTrash import:
import { FaTrash } from "react-icons/fa";
import { TYPE_FILL_IN_BLANK } from "../QuizDetailsQuestionEditor";

interface PossibleAnswers {
  id: string;
  text: string;
  caseInsensitive: boolean;
}

interface FillInBlankQuestionEditorProps {
  titleParameter: string;
  pointsParameter: number;
  questionTextParameter: string;
  possibleAnswersParameter: PossibleAnswers[];
}

// Destructure the single `props` object
export default function FillInBlankQuestionEditor({
  titleParameter,
  pointsParameter,
  questionTextParameter,
  possibleAnswersParameter,
}: FillInBlankQuestionEditorProps): JSX.Element {
  let { cid, qid, questionId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleParameter);
  const [questionText, setQuestionText] = useState(questionTextParameter);
  const [points, setPoints] = useState(pointsParameter);
  const [possibleAnswers, setPossibleAnswers] = useState(
    possibleAnswersParameter
  );

  const updateQuestion = async () => {
    if (!cid || !qid) return;

    const newQuestion = {
      questionId: questionId,
      type: TYPE_FILL_IN_BLANK,
      points,
      question: questionText,
      possibleAnswers,
    };

    const updatedQuiz = await quizzesClient.updateQuizQuestion(
      qid,
      newQuestion
    );
    dispatch(updateQuiz(updatedQuiz));
  };

  const addFIBOption = async () => {
    const newOption = {
      id: uuidv4(),
      text: "New Option",
      caseInsensitive: false,
    };

    setPossibleAnswers([...possibleAnswers, newOption]);
  };

  return (
    <div>
      <h1>Fill In Blank Editor</h1>
      <FormGroup className="mb-3" controlId="wd-assignment-name">
        <FormLabel>Title</FormLabel>
        <FormControl
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3" controlId="wd-assignment-points">
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

      <strong>Answers:</strong>
      {possibleAnswers.map((option, index) => (
        <FormGroup key={option.id} className="mb-3">
          {/* Added the trash icon before the label */}
          <FaTrash
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => {
              setPossibleAnswers((prev) => prev.filter((_, i) => i !== index));
            }}
          />
          <FormLabel>Possible Answer:</FormLabel>
          <FormControl
            defaultValue={option.text}
            onChange={(e) => {
              const answers = [...possibleAnswers];
              answers[index].text = e.target.value;
              setPossibleAnswers(answers);
            }}
          />
        </FormGroup>
      ))}

      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={addFIBOption}
      >
        + Add Another Answer
      </Button>
      <br />
      <br />
      <br />

      <div className="wd-flex-row-container">
        <Link
          to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`}
          className="wd-dashboard-course-link text-decoration-none text-dark"
        >
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            onClick={updateQuestion}
          >
            Save
          </Button>
          <Button variant="secondary" size="lg" className="me-1 float-end">
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
}
