import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  elements: [];
  elementsOnScreen: [];
  startIndex: number,
  endIndex: number,
  currentIndex: number
}

const initialState: MapState = {
  elements: [],  
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
  },
});

export const { setElements } = mapSlice.actions;
export default mapSlice.reducer;
