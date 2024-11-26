import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChallengeAnswer {
  data: string;
  grade: string;
}

interface ChallengeState {
   answers: ChallengeAnswer[]
}

const initialState: ChallengeState = {
    answers: []
} 

const challengeSlice = createSlice({
  name: 'challengeAnswers',
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<ChallengeAnswer>) => {
      state.answers.push(action.payload);
    },
    clearAnswers: (state) => {
      state.answers = []
    },
  },
});

export const { addAnswer, clearAnswers } = challengeSlice.actions;
export default challengeSlice.reducer;
