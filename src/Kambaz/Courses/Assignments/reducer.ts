import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignments }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignments.title,
        course: assignments.course,
        desc: assignments.desc,
        points: assignments.points,
        availableDate: assignments.availableDate,
        dueDate: assignments.dueDate,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentsId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentsId
      );
    },
    updateAssignment: (state, { payload: assignments }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignments._id ? assignments : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
