import { configureStore } from '@reduxjs/toolkit';
import subjectReducer from './SubjectSlice';

const store = configureStore({
  reducer: {
    subject: subjectReducer
  },
});

export default store;
