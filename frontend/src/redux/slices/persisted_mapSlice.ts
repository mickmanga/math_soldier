import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CHARACTER_ELEMENTS_NAMES, ELEMENT_TYPE, HERO_MODES, MapElement } from '../../types/map';

export interface MapState {
  elements: Array<MapElement | null>;
  elementsOnScreen: Array<MapElement>;
  startIndex: number,
  endIndex: number,
  currentIndex: number,
  heroMode: HERO_MODES
}

const initialState: MapState = {
  elements: [
    null,
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.mountain_god},
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.golem_master},
    {type: ELEMENT_TYPE.form, id: "2334", formBlocks: [
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
 {type: ELEMENT_TYPE.form, id: "1234ER", formBlocks: [
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
  {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd15c"},
  {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd17e"},  {type: ELEMENT_TYPE.form, id: "04", formBlocks: [
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
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd1a2"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd1c6"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd1ea"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd1fa"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd20a"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd21a"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd22a"},
 {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd23a"},
],  
  elementsOnScreen: [],
  startIndex: 0,
  endIndex: 0,
  currentIndex: 0,
  heroMode: HERO_MODES.normal
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
      const elementToAdd = state.elements[elementIndex];
      if(!elementToAdd){
        return;
      }
      state.elementsOnScreen.push();
    },
    removeElementFromElementsOnScreen: (state, action: PayloadAction<number>) => {
      const removedElementIndex = action.payload;

      if(removedElementIndex > state.elementsOnScreen.length - 1 || removedElementIndex < 0){
        return;
      }
      state.elementsOnScreen.splice(removedElementIndex, 1);
    },
    setHeroMode: (state, action: PayloadAction<HERO_MODES>) => {
      state.heroMode = action.payload;
    } 
  },
});

export const { setElements, increaseEndIndex, decreaseEndIndex, increaseStartIndex, decreaseStartIndex, updateCurrentIndex, addElementOnScreen, removeElementFromElementsOnScreen, setEndIndex, setStartIndex, setHeroMode } = persistedMapSlice.actions;
export default persistedMapSlice.reducer;
