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
  const { data } = await axios.post(`${API_BASE}/api/courses/${courseId}/quizzes`, quiz);
  return data;
};
