import { useParams } from "react-router-dom";

export default function FillInBlankQuestionEditor(
  titleParameter: string,
  pointsParameter: number,
  questionTextParameter: string,
  possibleAnswersParameter: string[] // Check later if this needs to be an Obj
) {
  let { cid, quizId, questionId } = useParams();
  return <p>Here is the fill in the blank question editor.</p>;
}
