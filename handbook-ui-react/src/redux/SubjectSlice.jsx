import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    selectedPosition: null,
    addedSubjects: {},
  },
  reducers: {
    setPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
    addSubject: (state, action) => {
      const { position, subject } = action.payload;
      state.addedSubjects[position] = subject; // Store subject at specific position
    },
    clearPosition: (state) => {
      state.selectedPosition = null;
    },
  },
});

export const { setPosition, addSubject, clearPosition } = subjectSlice.actions;
export default subjectSlice.reducer;
