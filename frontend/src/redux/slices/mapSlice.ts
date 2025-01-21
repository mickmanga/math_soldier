import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapElement } from '../../types/map';

export interface MapState {
  elements: Array<MapElement>;
  elementsOnScreen: [];
  startIndex: number,
  endIndex: number,
  currentIndex: number
}

const initialState: MapState = {
  elements: [{type: "challenge", id: "01"},{type: "form", id: "02"}, {type: "challenge", id: "03"}, {type: "challenge", id: "04"}],  
  elementsOnScreen: [],
  startIndex: 0,
  endIndex: 0,
  currentIndex: 0
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<MapState>) => {
      state.elements = action.payload.elements;
    },
    increaseEndIndex: (state) => {
      state.endIndex++;
    }
  },
});

export const { setElements, increaseEndIndex } = mapSlice.actions;
export default mapSlice.reducer;
