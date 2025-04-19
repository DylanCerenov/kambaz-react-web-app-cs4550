import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const addEnrollment = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/enroll`, {
    userId: userId,
    courseId: courseId,
  });
  return response.data;
};

export const deleteEnrollment = async (userId: string, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/unenroll/${userId}/${courseId}`
  );
  return response;
};
