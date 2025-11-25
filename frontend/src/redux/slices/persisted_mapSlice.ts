import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CHARACTER_ELEMENTS_NAMES, ELEMENT_TYPE, HERO_MODES, MapElement } from '../../types/map';

export interface MapState {
  elements: Array<MapElement | null>;
  elementsOnScreen: Array<MapElement>;
  elementsCreationBlocked: boolean;
  startIndex: number,
  endIndex: number,
  currentIndex: number,
  heroMode: HERO_MODES
}

export enum GOLEM_IDS {
  "golem1",
  "golem2"
}

const initialState: MapState = {
  elements: [
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.mountain_god},
    
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
        {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},

    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
      {
       question: "combien fait 10X4",
       answer: "40",
       validated: false
     },
     {
      question: "combien fait 20X3",
      answer: "60",
      validated: false
     },
    ]},
    null,
    null,
    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
      {
       question: "combien fait 100+100",
       answer: "200",
       validated: false
     },
     {
      question: "combien fait 23+23",
      answer: "46",
      validated: false
     },
    ]},
    null,
    null,
    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},

    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    null,
    
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null, 
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null, 
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    null,   
    null,
    null,
    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,  
    null,
    null,
    null,
    null,  
    null,
    null,
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    {type: ELEMENT_TYPE.character, id: "06", name: CHARACTER_ELEMENTS_NAMES.elves_and_dragon},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.golem_master},
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.golem_master},
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.golem_master},
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    {type: ELEMENT_TYPE.form, id: GOLEM_IDS.golem2.toString(), questionIndex: 0, formBlocks: [
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
    null,
    null,
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.mountain_god},
    {type: ELEMENT_TYPE.character, id: "02", name: CHARACTER_ELEMENTS_NAMES.golem_master},
    {type: ELEMENT_TYPE.form, id: "1234ER", questionIndex: 0, formBlocks: [
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
    {type: ELEMENT_TYPE.challenge, topScore: "D", id: "677e814577322467895fd17e"},  
    {type: ELEMENT_TYPE.form, id: "04", questionIndex: 0, formBlocks: [
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
  elementsCreationBlocked: false,
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
    setElementsCreationBlocked: (state, action: PayloadAction<boolean>) => {
      state.elementsCreationBlocked = action.payload;
    } ,
    // This function removes an element from the elementsOnScreen array based on its index
    removeElementFromElementsOnScreen: (state, action: PayloadAction<number>) => {
      const removedElementIndex = action.payload;

      if(removedElementIndex > state.elementsOnScreen.length - 1 || removedElementIndex < 0){
        return;
      }
      state.elementsOnScreen.splice(removedElementIndex, 1);
    },
    setHeroMode: (state, action: PayloadAction<HERO_MODES>) => {
      state.heroMode = action.payload;
    },
    increaseQuestionIndex: (state, action: PayloadAction<string>) => {
      const elementId = action.payload;
      const element = state.elements.find(el => el?.id === elementId);
      if (
        element &&
        element.type === ELEMENT_TYPE.form &&
        typeof (element as any).questionIndex === "number" &&
        Array.isArray((element as any).formBlocks) &&
        (element as any).questionIndex < (element as any).formBlocks.length - 1
      ) {
        console.log((element as { questionIndex: number }).questionIndex);
        (element as { questionIndex: number }).questionIndex++;
        console.log("after >");
        console.log((element as { questionIndex: number }).questionIndex);
      } else {
        alert("nope");
      }
    },
  },
});

export const { setElements, increaseEndIndex, increaseQuestionIndex, decreaseEndIndex, increaseStartIndex, decreaseStartIndex, updateCurrentIndex, addElementOnScreen, removeElementFromElementsOnScreen, setEndIndex, setStartIndex, setHeroMode, setElementsCreationBlocked } = persistedMapSlice.actions;
export default persistedMapSlice.reducer;
