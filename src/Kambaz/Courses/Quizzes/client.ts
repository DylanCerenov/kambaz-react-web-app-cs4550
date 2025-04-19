import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export const GRADES_API = `${REMOTE_SERVER}/api/grades`;

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axios.post(
    `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuizQuestion = async (quizId: string, newQuestion: any) => {
  const questionId = newQuestion.questionId;
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/${questionId}`,
    newQuestion
  );
  return data; // Passes back the entire Quiz.
};

export const createQuizQuestion = async (quizId: string, question: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}`, question);
  return data; // Passes back the entire Quiz.
};

export const deleteQuizQuestion = async (
  quizId: string,
  questionId: string
) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${quizId}/${questionId}`);
  return data; // Passes back the entire Quiz.
};

// Added for grades
export const findAllGrades = async () => {
  const response = await axios.get(`${GRADES_API}`);
  return response.data;
};

export const createGrade = async (
  quizId: string,
  userId: string,
  attemptsCount: number,
  score: number,
  answers: any
) => {
  const newGrade = {
    quizId,
    userId,
    attemptsCount,
    score,
    answers,
  };

  const { data } = await axios.post(`${GRADES_API}/submit`, newGrade);
  return data;
};

export const findGrade = async (qid: string, uid: string) => {
  const response = await axios.get(`${GRADES_API}/${qid}/${uid}`);
  return response.data;
};

export const updateGrade = async (
  quizId: string,
  userId: string,
  attemptsCount: number,
  score: number,
  answers: any
) => {
  const gradeUpdates = { quizId, userId, attemptsCount, score, answers };
  const response = await axios.put(
    `${GRADES_API}/${quizId}/${userId}`,
    gradeUpdates
  );
  return response;
};
