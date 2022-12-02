import { createSlice } from "@reduxjs/toolkit";

const dataFilmSlice = createSlice({
  name: "film-data",
  initialState: {
    filmData: [],
  },
  reducers: {
    addFilmData(state, action) {
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
      } else {
        console.log("here my film to update thanks to redux", dataFilmArray);
        return;
      }
    },
    removeFilmData(state) {
      let dataFilmArray = state.filmData;
      if (dataFilmArray.length > 0) {
        dataFilmArray = state.initialState;
        console.log("here my film to update thanks to redux", dataFilmArray);
        return dataFilmArray;
      } else {
        return;
      }
    },
  },
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
