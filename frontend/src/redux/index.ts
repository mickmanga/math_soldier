import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the path based on where the slice is
import challengeReducer from './slices/challengeSlice'; // Adjust the path based on where the slice is

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenge: challengeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
