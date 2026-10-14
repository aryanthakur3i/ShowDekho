import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

// create an aysn thunk to fetch movies from the TMDB API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",

  // execute the api request
  async (_, { rejectWithValue }) => {
    try {
      //send a request to the tmdb movies
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          //read the api read access token from the .env file
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      //Throw an errror when API request fails
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      //Convert the API response into json format
      const result = await response.json();

      // Return the array of movies from the response
      return result.results;
    } catch (errror) {
      // return thr error message as the rejected action payload
      return rejectWithValue(errror.message);
    }
  },
);

// Create a Slice to manage movie-related state
const movieSlice = createSlice({
  name: "movies",

  //define the initial state
  initialState: {
    data: [], // store the fetch movies
    isLoading: false, // track whether the api request is in progess
    error: null, // store any error message
  },

  reducers: {},

  // handle the different states of the aysnc thunk
  extraReducers: (builder) => {
    builder

      //handle the pending states
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      //handle the fullfilled state when api request succed
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      // handle the rejected state when the request fails
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// export the reducers
export default movieSlice.reducer;
