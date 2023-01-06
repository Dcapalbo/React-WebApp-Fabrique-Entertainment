import { createSlice } from "@reduxjs/toolkit";

const dataFilmSlice = createSlice({
  name: "films-slice",
  initialState: {
    filmData: [],
  },
  reducers: {
    filmData(state, action) {
      const newFilmData = action.payload;
      const dataFilmArray = state.filmData;
      if (!dataFilmArray.length) {
        dataFilmArray.push({
          title: newFilmData.title,
          duration: newFilmData.duration,
          director: newFilmData.director,
          description: newFilmData.description,
          year: newFilmData.year,
          type: newFilmData.type,
          imageUrl: newFilmData.imageUrl,
          _id: newFilmData._id,
        });
      }
    },
  },
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
