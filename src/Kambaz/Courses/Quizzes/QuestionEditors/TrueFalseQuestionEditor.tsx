import { useParams } from "react-router-dom";

export default function TrueFalseQuestionEditor(
  titleParameter: string,
  pointsParameter: number,
  questionTextParameter: string,
  correctAnswerIsTrueParameter: boolean
) {
  let { cid, quizId, questionId } = useParams();
  return <p>Here is the true false question editor.</p>;
}
