import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quizzes }) => {
      const newQuiz: any = {
        _id: quizzes._id,
        title: quizzes.title,
        course: quizzes.course,
        desc: quizzes.desc,
        points: quizzes.points,
        availableDate: quizzes.availableDate,
        dueDate: quizzes.dueDate,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizzesId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizzesId);
    },
    updateQuiz: (state, { payload: quizzes }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizzes._id ? quizzes : a
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
