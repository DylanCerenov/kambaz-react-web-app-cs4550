import { useState } from "react";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Col,
  FormSelect,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Form, Link } from "react-router";
import { updateQuiz, addQuiz } from "../Quizzes/reducer";
import * as quizzesClient from "./client";
import { v4 as uuidv4 } from "uuid";

/*

Multiple Choice Question Editor

Implement a Multiple choice type question where students need select one correct choice out a list of multiple choices. 

Faculty can configure the following question properties
- Title (input:text) - the title of the question
- Points (input:number) - how many points is the question
- Question (WYSIWYG)
- Choices (textarea) 
  - multiple paragraphs of which only one is the correct choice. 
  - Faculty can add/remove any number of choices. Each choice has a radio button that selects it as the single correct answer.
- Cancel button discards changes
- Save/Update Question button saves question
*/

// By this point, from the QuizDetailsQuestionEditor, pass in the needed question information.
export default function MultipleChoiceQuestionEditor(
  titleParameter: string,
  questionTextParameter: string,
  pointsParameter: number,
  optionsParameter: string[],
  answerParameter: string
) {
  let { cid, quizId, questionId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleParameter);
  const [questionText, setQuestionText] = useState(questionTextParameter);
  const [points, setPoints] = useState(pointsParameter);
  const [choices, setChoices] = useState(optionsParameter);
  const [answer, setAnswer] = useState(answerParameter);

  const updateQuestion = async () => {
    if (!cid || !quizId) {
      return;
    }

    const newQuestion = {
      questionId: questionId,
      type: "multiple_choice",
      points: points,
      question: questionText,
      choices: choices,
      answer: answer,
    };

    // Design choice:
    // Sending a PUT to update the quiz question will return the entire quiz back.
    // Then the quiz is placed back into the reducer to update the local state.
    const literallyTheEntireQuizObject = await quizzesClient.updateQuizQuestion(
      quizId,
      newQuestion
    );
    dispatch(updateQuiz(literallyTheEntireQuizObject));
  };

  return (
    <div>
      <h1>Multiple Choice Editor</h1>;
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
        <FormGroup
          key={index}
          className="mb-3"
          controlId={`wd-textarea-${index}`}
        >
          <FormLabel
            style={{
              color: option === answerParameter ? "green" : "inherit",
            }}
          >
            {option === answerParameter ? "Correct Answer" : "Possible Answer"}
          </FormLabel>

          <FormControl
            as="textarea"
            rows={3}
            defaultValue={option}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[index] = e.target.value;
              setChoices(newChoices);
            }}
          />
        </FormGroup>
      ))}
      {/* This is the cancel / save stuff. */}
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
