import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: "gptSearch",
    initialState: {
        showGptSearch: false,
        suggestedMovieNames: null,
        suggestedMovies: null,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addSuggestedMovieData: (state, actions) => {
            const {movieName, geminiMovieData} = actions.payload;
            state.suggestedMovies = geminiMovieData;
            state.suggestedMovieNames = movieName;
        }
    }
})


export const {toggleGptSearchView, addSuggestedMovieData} = gptSlice.actions;
export default gptSlice.reducer;