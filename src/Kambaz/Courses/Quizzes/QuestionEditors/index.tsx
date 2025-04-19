import { useLocation } from "react-router-dom";
import {
  TYPE_FILL_IN_BLANK,
  TYPE_MULTIPLE_CHOICE,
  TYPE_TRUE_FALSE,
} from "../QuizDetailsQuestionEditor";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInBlankQuestionEditor from "./FillInBlankQuestionEditor";

export default function QuestionEditors() {
  const location = useLocation();
  const { questionType, questionData } = location.state || {};

  function multipleChoiceQuestionEditorHelper() {
    const titleParameter = questionData.title;
    const questionTextParameter = questionData.question;
    const pointsParameter = questionData.points;
    const optionsParameter = questionData.choices;

    return (
      <div>
        <MultipleChoiceQuestionEditor
          titleParameter={titleParameter}
          questionTextParameter={questionTextParameter}
          pointsParameter={pointsParameter}
          optionsParameter={optionsParameter}
        />
      </div>
    );
  }

  function trueFalseQuestionEditorHelper() {
    const titleParameter = questionData.title;
    const questionTextParameter = questionData.question;
    const pointsParameter = questionData.points;
    const correctAnswerIsTrueParameter = questionData.correctAnswerIsTrue;

    return (
      <div>
        <TrueFalseQuestionEditor
          titleParameter={titleParameter}
          pointsParameter={pointsParameter}
          questionTextParameter={questionTextParameter}
          correctAnswerIsTrueParameter={correctAnswerIsTrueParameter}
        />
      </div>
    );
  }

  function fillInBlankQuestionEditorHelper() {
    const titleParameter = questionData.title;
    const pointsParameter = questionData.points;
    const questionTextParameter = questionData.question;
    const possibleAnswersParameter = questionData.possibleAnswers;

    return (
      <div>
        <FillInBlankQuestionEditor
          titleParameter={titleParameter}
          questionTextParameter={questionTextParameter}
          pointsParameter={pointsParameter}
          possibleAnswersParameter={possibleAnswersParameter}
        />
      </div>
    );
  }

  if (questionType === TYPE_MULTIPLE_CHOICE) {
    return multipleChoiceQuestionEditorHelper();
  } else if (questionType === TYPE_TRUE_FALSE) {
    return trueFalseQuestionEditorHelper();
  } else if (questionType === TYPE_FILL_IN_BLANK) {
    return fillInBlankQuestionEditorHelper();
  } else {
    throw new Error("Invalid Type: " + questionType);
  }
}
