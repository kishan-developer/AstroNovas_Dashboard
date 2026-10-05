import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import studentsReducer from './slices/studentsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    students: studentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
