import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { heroImages } from "../../../data/images";

interface SliderState {
  value: number;
  length: number;
}

const initialState: SliderState = {
  value: 0,
  length: heroImages.length,
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    nextSlide(state: SliderState, action: PayloadAction<number>) {
      state.value = action.payload > state.length - 1 ? 0 : action.payload;
    },
    prevSlide(state: SliderState, action: PayloadAction<number>) {
      state.value = action.payload < 0 ? state.length - 1 : action.payload;
    },
    dotSlide(state, action) {
      const slide = action.payload;
      state.value = slide;
    },
  },
});

const slideReducer = sliderSlice.reducer;

export const { nextSlide, prevSlide, dotSlide } = sliderSlice.actions;
export default slideReducer;
