import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UnpersistedMapState {
  currentlyFinishingChallenge: boolean
}

const initialState: UnpersistedMapState = {
   currentlyFinishingChallenge: false
};

const unpersistedMapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCurrentlyFinishingChallenge: (state, action: PayloadAction<boolean>) => {
      state.currentlyFinishingChallenge = action.payload;
    }
  },
});

export const {setCurrentlyFinishingChallenge} = unpersistedMapSlice.actions;
export default unpersistedMapSlice.reducer;
