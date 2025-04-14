import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JsonStringify from "../../../Labs/Lab3/JsonStringify";

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
export default function QuizDetailsQuestionEditor() {
  let { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === qid);
  const questions = quiz.questions;

  return (
    <div>
      <h1>Question Editor</h1>
      {quiz.questions.map((question: any) => (
        // Get all the quiz questions
        // Display them
        // Make them clickable, and if clicked, route to the proper editor.

        <h1>{JSON.stringify(question)}</h1>
      ))}
    </div>
  );
}
