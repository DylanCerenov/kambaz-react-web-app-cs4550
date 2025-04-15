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
        <h2>This top part is the question data for dev purposes</h2>
        <h3>Editing {questionType} Question</h3>
        <pre>{JSON.stringify(questionData, null, 2)}</pre>
        <br />
        <hr />
        <h2>This bottom part is the actual MultipleChoiceQuestionEditor</h2>
        <br />
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
        <h2>This top part is the question data for dev purposes</h2>
        <h3>Editing {questionType} Question</h3>
        <pre>{JSON.stringify(questionData, null, 2)}</pre>
        <br />
        <hr />
        <h2>This bottom part is the actual TrueFalseQuestionEditor</h2>
        <br />
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
        <h2>This top part is the question data for dev purposes</h2>
        <h3>Editing {questionType} Question</h3>
        <pre>{JSON.stringify(questionData, null, 2)}</pre>
        <br />
        <hr />
        <h2>This bottom part is the actual FillInBlankQuestionEditor</h2>
        <br />
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
