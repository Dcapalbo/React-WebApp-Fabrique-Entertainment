import { createSlice } from "@reduxjs/toolkit";

const dataFilmSlice = createSlice({
  name: "dataFilm",
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
          director: newFilmData.director,
          production: newFilmData.production,
          screenwriter: newFilmData.screenwriter,
          directorOfPhotography: newFilmData.directorOfPhotography,
          synopsis: newFilmData.synopsis,
          duration: newFilmData.duration,
          year: newFilmData.year,
          slug: newFilmData.slug,
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
