import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the path based on where the slice is
import mapReducer from './slices/mapSlice';
import challengeReducer from './slices/challengeSlice'; // Adjust the path based on where the slice is
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedChallengeReducer = persistReducer(persistConfig, challengeReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    challenge: persistedChallengeReducer,
    map: mapReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
