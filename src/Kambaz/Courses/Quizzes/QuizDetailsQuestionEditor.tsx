import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  let { cid, quizId } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: { _id: string }) => q._id === quizId);

  return (
    <div>
      <h1>apples</h1>
    </div>
  );
}
