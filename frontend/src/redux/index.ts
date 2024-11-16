import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the path based on where the slice is

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
