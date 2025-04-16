import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";

export const TYPE_MULTIPLE_CHOICE = "multiple_choice";
export const TYPE_TRUE_FALSE = "true_false";
export const TYPE_FILL_IN_BLANK = "fill_in_blank";

export default function QuizDetailsQuestionEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === qid);

  if (!qid) {
    throw new Error("Something went wrong.");
  }
  // Only store the original quiz.
  if (!localStorage.getItem(qid)) {
    localStorage.setItem(qid, JSON.stringify(quiz));
  }

  const cancelHelper = async () => {
    const originalQuizCopyJSON = localStorage.getItem(qid);
    const originalQuizCopy = JSON.parse(originalQuizCopyJSON!);
    await quizzesClient.updateQuiz(originalQuizCopy);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const saveHelper = async () => {
    localStorage.setItem(qid, JSON.stringify(quiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  // helper render functions
  function renderMultipleChoiceQuestion(question: any, index: number) {
    const questionId = question.questionId;

    return (
      <div className="card mb-4" key={questionId}>
        <div className="card-body">
          <h5 className="card-title">
            Question {index + 1}: {question.question}
          </h5>
          <p className="text-muted mb-3">Multiple Choice</p>
          <div className="d-flex flex-column gap-2">
            {question.choices.map((choice: any) => (
              <label key={choice.id}>
                <input
                  type="radio"
                  disabled
                  className="me-2"
                  name={`mcq-${questionId}`}
                />
                {choice.text}
              </label>
            ))}
          </div>
          <button
            className="btn btn-warning mt-3"
            onClick={() =>
              navigate(
                `/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions/${questionId}`,
                {
                  state: {
                    questionType: TYPE_MULTIPLE_CHOICE,
                    questionData: question,
                  },
                }
              )
            }
          >
            Edit MCQ
          </button>
        </div>
      </div>
    );
  }

  function renderTrueFalseQuestion(question: any, index: number) {
    const questionId = question.questionId;

    return (
      <div className="card mb-4" key={questionId}>
        <div className="card-body">
          <h5 className="card-title">
            Question {index + 1}: {question.question}
          </h5>
          <p className="text-muted mb-3">True/False</p>
          <div className="d-flex flex-column gap-2">
            <label>
              <input
                type="radio"
                disabled
                className="me-2"
                name={`tf-${questionId}`}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                disabled
                className="me-2"
                name={`tf-${questionId}`}
              />
              False
            </label>
          </div>
          <button
            className="btn btn-warning mt-3"
            onClick={() =>
              navigate(
                `/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions/${questionId}`,
                {
                  state: {
                    questionType: TYPE_TRUE_FALSE,
                    questionData: question,
                  },
                }
              )
            }
          >
            Edit TFQ
          </button>
        </div>
      </div>
    );
  }

  function renderFillInBlankQuestion(question: any, index: number) {
    const questionId = question.questionId;

    return (
      <div className="card mb-4" key={questionId}>
        <div className="card-body">
          <h5 className="card-title">
            Question {index + 1}: {question.question}
          </h5>
          <p className="text-muted mb-3">Fill in the Blank</p>
          <input
            type="text"
            disabled
            className="form-control w-auto"
            placeholder="________"
          />
          <button
            className="btn btn-warning mt-3"
            onClick={() =>
              navigate(
                `/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions/${questionId}`,
                {
                  state: {
                    questionType: TYPE_FILL_IN_BLANK,
                    questionData: question,
                  },
                }
              )
            }
          >
            Edit FITBQ
          </button>
        </div>
      </div>
    );
  }

  function renderQuestion(question: any, index: number) {
    const { type } = question;

    switch (type) {
      case TYPE_MULTIPLE_CHOICE:
        return renderMultipleChoiceQuestion(question, index);
      case TYPE_TRUE_FALSE:
        return renderTrueFalseQuestion(question, index);
      case TYPE_FILL_IN_BLANK:
        return renderFillInBlankQuestion(question, index);
      default:
        throw new Error("Invalid Type: " + type);
    }
  }

  if (!quiz) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">Question Editor</h1>

      {quiz.questions.map((question: any, index: number) =>
        renderQuestion(question, index)
      )}

      <div className="my-4">
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-new-question">
            + New Question
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                console.log("new mc question");
              }}
            >
              Multiple Choice
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                console.log("new t/f question");
              }}
            >
              True/False
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                console.log("new fill in the blank question");
              }}
            >
              Fill in the Blank
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-secondary" onClick={cancelHelper}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={saveHelper}>
          Save
        </button>
      </div>
    </div>
  );
}
