import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

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
    `${API_BASE}/api/courses/${courseId}/quizzes`,
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
