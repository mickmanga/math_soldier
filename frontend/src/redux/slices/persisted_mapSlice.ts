import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapElement } from '../../types/map';

export interface MapState {
  elements: Array<MapElement>;
  elementsOnScreen: Array<MapElement>;
  startIndex: number,
  endIndex: number,
  currentIndex: number,
}

const initialState: MapState = {
  elements: [
    {type: "form", id: "01", formBlocks: [
     {
      question: "combien fait 1+1",
      answer: "2",
      validated: false
     },
     {
      question: "combien fait 2+2",
      answer: "4",
      validated: false
     },
  ]},
  {type: "challenge", topScore: "D", id: "677e814577322467895fd15c"},
  {type: "challenge", topScore: "D", id: "677e814577322467895fd17e"},  {type: "form", id: "04", formBlocks: [
    {
     question: "combien fait 1+1",
     answer: "2",
     validated: false
    },
    {
     question: "combien fait 2+2",
     answer: "4",
     validated: false
    },
 ]},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd1a2"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd1c6"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd1ea"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd1fa"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd20a"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd21a"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd22a"},
 {type: "challenge", topScore: "D", id: "677e814577322467895fd23a"},
],  
  elementsOnScreen: [],
  startIndex: 0,
  endIndex: 0,
  currentIndex: 2,
};

const persistedMapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<MapState>) => {
      state.elements = action.payload.elements;
    },
    setEndIndex: (state, action: PayloadAction<number>) => {
      state.endIndex = action.payload;
    },
    increaseEndIndex: (state) => {
      state.endIndex++;
    },
    decreaseEndIndex: (state) => {
       state.endIndex--;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
    increaseStartIndex: (state) => {
      state.startIndex++;
    },
    decreaseStartIndex: (state) => {
      state.startIndex--;
    },
    updateCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    addElementOnScreen: (state, action: PayloadAction<number>) => {
      const elementIndex = action.payload;
      if(elementIndex > state.elements.length - 1 || elementIndex < 0){
        return;
      }
      state.elementsOnScreen.push(state.elements[elementIndex]);
    },
    removeElementFromElementsOnScreen: (state, action: PayloadAction<number>) => {
      const removedElementIndex = action.payload;

      if(removedElementIndex > state.elementsOnScreen.length - 1 || removedElementIndex < 0){
        return;
      }
      state.elementsOnScreen.splice(removedElementIndex, 1);
    },
  },
});

export const { setElements, increaseEndIndex, decreaseEndIndex, increaseStartIndex, decreaseStartIndex, updateCurrentIndex, addElementOnScreen, removeElementFromElementsOnScreen, setEndIndex, setStartIndex } = persistedMapSlice.actions;
export default persistedMapSlice.reducer;
