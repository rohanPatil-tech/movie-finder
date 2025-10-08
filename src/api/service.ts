import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "3f7cfd010eefed924835da4d85bb3f3f";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


export const getMovies = async (query: string) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};


export const getMovieDetails = async (movieId: string) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};


export const getGenres = async () => {
  const response = await tmdbApi.get("/genre/movie/list");
  return response.data.genres;
};

export const getMoviesByGenre = async (genreId: number) => {
  const response = await tmdbApi.get("/discover/movie", {
    params: { with_genres: genreId },
  });
  return response.data.results;
};

export default tmdbApi;
