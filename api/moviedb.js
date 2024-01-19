import axios from "axios";
import { apiKey } from "../constants";

//endpoints

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const SearchMoviesEndPoint = `${apiBaseUrl}/search/movies?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const SimilarmoviesEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const PersonDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const PersonMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditEndPoint(id));
};
export const fetchSimilarMovie = (id) => {
  return apiCall(SimilarmoviesEndPoint(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(PersonDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(PersonMoviesEndpoint(id));
};
export const searchMovies = (id) => {
  return apiCall(SearchMoviesEndPoint, params);
};
