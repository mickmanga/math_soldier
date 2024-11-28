import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChallengeAnswerData {
  explanation: string,
  text: string,
  true: boolean,
  _id: string  
}

export interface ChallengeAnswer {
  data: ChallengeAnswerData;
  found: boolean | null;
}

export interface ChallengeState {
   answers: ChallengeAnswer[],
   currentAnswerIndex: number
}

const initialState: ChallengeState = {
    answers: [],
    currentAnswerIndex: 0
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
    incrementAnswerIndex: (state) => {
      state.currentAnswerIndex++;
    },
    resetAnswerIndex: (state) => {
      state.currentAnswerIndex = 0;
    },
    setFoundAtIndex: (state, action: PayloadAction<{ index: number, found: boolean }>) => {
      const { index, found } = action.payload;
      if (index >= 0 && index < state.answers.length) {
        state.answers[index].found = found;
      } else {
        console.error("Index out of bounds");
      }
    }
    
  },
});

export const { addAnswer, clearAnswers, incrementAnswerIndex, resetAnswerIndex, setFoundAtIndex } = challengeSlice.actions;
export default challengeSlice.reducer;
