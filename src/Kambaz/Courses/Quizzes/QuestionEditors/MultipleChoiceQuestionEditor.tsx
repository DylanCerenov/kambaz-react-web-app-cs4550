import { useState } from "react";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router";
import { updateQuiz } from "../reducer";
import * as quizzesClient from "../client";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import { TYPE_MULTIPLE_CHOICE } from "../QuizDetailsQuestionEditor";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceQuestionEditorProps {
  titleParameter: string;
  questionTextParameter: string;
  pointsParameter: number;
  optionsParameter: Choice[];
}

export default function MultipleChoiceQuestionEditor({
  titleParameter,
  questionTextParameter,
  pointsParameter,
  optionsParameter,
}: MultipleChoiceQuestionEditorProps) {
  const { cid, qid, questionId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleParameter);
  const [questionText, setQuestionText] = useState(questionTextParameter);
  const [points, setPoints] = useState(pointsParameter);
  const [choices, setChoices] = useState(optionsParameter);

  // Update question on the server
  const updateQuestion = async () => {
    if (!cid || !qid) return;

    const newQuestion = {
      questionId,
      type: TYPE_MULTIPLE_CHOICE,
      title,
      points,
      question: questionText,
      choices,
    };

    const updatedQuiz = await quizzesClient.updateQuizQuestion(
      qid,
      newQuestion
    );

    dispatch(updateQuiz(updatedQuiz));
  };

  // Add a new option to the choices array
  const addMCQOption = () => {
    const newOption = {
      id: uuidv4(),
      text: "New Option",
      isCorrect: false,
    };
    setChoices([...choices, newOption]);
  };

  // Delete an option from the choices array
  const deleteMCQOption = (index: number) => {
    setChoices((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Multiple Choice Editor</h1>
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

      <strong>Answers:</strong>
      {choices.map((option, index) => (
        <FormGroup key={option.id} className="mb-3">
          <FormLabel style={{ color: option.isCorrect ? "green" : "inherit" }}>
            {option.isCorrect ? "Correct Answer" : "Possible Answer"}
          </FormLabel>
          <div style={{ display: "flex", alignItems: "center" }}>
            {!option.isCorrect && (
              <FaTrash
                style={{ marginRight: 8, cursor: "pointer" }}
                onClick={() => deleteMCQOption(index)} // <-- call the delete function
              />
            )}
            <FormControl
              value={option.text}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[index].text = e.target.value;
                setChoices(newChoices);
              }}
            />
          </div>
        </FormGroup>
      ))}

      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={addMCQOption}
      >
        + Add Another Answer
      </Button>

      <br />
      <br />
      <br />

      {/* Cancel/Save stuff */}
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
          <br />
        </Link>
      </div>
    </div>
  );
}
