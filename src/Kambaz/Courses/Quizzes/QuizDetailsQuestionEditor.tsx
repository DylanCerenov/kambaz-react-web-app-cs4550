import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

/*

Quiz Questions Editor screen
Clicking Questions tab navigates to Quiz questions screen with the following behavior
Displays list of questions for this quiz. List is initially empty
Clicking New Question adds question at bottom of list. Multiple choice question is default
New questions are displayed in edit preview mode by default
Clicking Edit displays question in edit mode
Dropdown to choose question type
Points shows sum of all the points of each question.
Minimum question types:
True/false question
Multiple choice question
Fill in a blank question
Clicking Cancel button dismisses the edits
Clicking Save saves the edits but does not publish the quiz
Here's an example of how Canvas renders the Questions editor, but feel free to give it your own twist.
*/

export const TYPE_MULTIPLE_CHOICE = "multiple_choice";
export const TYPE_TRUE_FALSE = "true_false";
export const TYPE_FILL_IN_BLANK = "fill_in_blank";

export default function QuizDetailsQuestionEditor() {
  let { cid, qid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === qid);

  function renderMultipleChoiceQuestion(question: any) {
    const questionId = question.questionId;

    return (
      <div>
        <h4>Multiple Choice Question</h4>
        <p>{JSON.stringify(question)}</p>
        <button
          className="btn btn-secondary"
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
        <hr />
      </div>
    );
  }

  function renderTrueFalseQuestion(question: any) {
    const questionId = question.questionId;

    return (
      <div>
        <p>{JSON.stringify(question)}</p>
        <button
          className="btn btn-secondary"
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
        <hr />
      </div>
    );
  }

  function renderFillInBlankQuestion(question: any) {
    const questionId = question.questionId;

    return (
      <div>
        <p>{JSON.stringify(question)}</p>
        <button
          className="btn btn-secondary"
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
        <hr />
      </div>
    );
  }

  function renderQuestion(question: any) {
    // Valid question types: multiple_choice, true_false, fill_in_blank
    const type = question.type;

    if (!type) {
      throw new Error("No type provided.");
    } else if (type === TYPE_MULTIPLE_CHOICE) {
      return renderMultipleChoiceQuestion(question);
    } else if (type === TYPE_TRUE_FALSE) {
      return renderTrueFalseQuestion(question);
    } else if (type === TYPE_FILL_IN_BLANK) {
      return renderFillInBlankQuestion(question);
    } else {
      throw new Error("Invalid Type: " + type);
    }
  }

  if (!quiz) {
    return <p>Something went wrong.</p>;
  }
  return (
    <div>
      <h1>Question Editor</h1>
      <br />
      {quiz.questions.map((question: any) => {
        return renderQuestion(question);
      })}

      <br />
      <button className="btn btn-secondary">+ New Question</button>

      <div className="mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </button>
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}
