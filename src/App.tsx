import React from 'react';
import axios from 'axios';
import MovieList from './movie_list/component/movie_list';
import Header from './header/component/Header';
import Search from './search/component/Search';
import { CssBaseline, Container, Typography, Box } from '@material-ui/core';

const { useEffect, useReducer } = React;

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: [];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Website: string;
  Writer: string;
  Production: string;
  Response: string;
}

interface State {
  loading: boolean;
  movies: Movie[];
  errorMessages: string | null;
}

enum ActionName {
  REQUEST = 'SEARCH_MOVIES_REQUEST',
  SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  FAILURE = 'SEARCH_MOVIES_FAILURE',
}

interface REQUEST {
  type: ActionName.REQUEST;
}
interface SUCCESS {
  type: ActionName.SUCCESS;
  payload: Movie[];
}

interface FAILURE {
  type: ActionName.FAILURE;
  error: string;
}

type MovieActions = REQUEST | SUCCESS | FAILURE;

const MOVIE_API_URL = 'http://www.omdbapi.com/?s=man&apikey=a3744c28';

const initialState: State = {
  loading: true,
  movies: [],
  errorMessages: null,
};

const reducer: React.Reducer<State, MovieActions> = (state, action): State => {
  switch (action.type) {
    case ActionName.REQUEST:
      return {
        ...state,
        loading: true,
        errorMessages: null,
      };
    case ActionName.SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case ActionName.FAILURE:
      return {
        ...state,
        loading: false,
        errorMessages: action.error,
      };
    default:
      throw new Error();
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(MOVIE_API_URL)
      .then((res) => {
        dispatch({ type: ActionName.SUCCESS, payload: res.data.Search });
      })
      .catch((err) => {
        dispatch({ type: ActionName.FAILURE, error: err });
      });
  }, []);

  const search = (searchValue: string): void => {
    const MOVIE_SEARCH_URL = `http://www.omdbapi.com/?s=${searchValue}&apikey=a3744c28`;
    dispatch({
      type: ActionName.REQUEST,
    });
    axios
      .get(MOVIE_SEARCH_URL)
      .then((res) => {
        dispatch({ type: ActionName.SUCCESS, payload: res.data.Search });
      })
      .catch((err) => {
        dispatch({ type: ActionName.FAILURE, error: err });
      });
  };

  const { movies, errorMessages, loading } = state;

  console.log('movies', movies, loading);
  return (
    <>
      <Header text="MovieSearch" />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box mt={4} textAlign="center">
          <Search search={search} />
          <Typography component="p">
            Sharing a few of our favorite movies
          </Typography>
        </Box>
        <Box
          mt={4}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around">
          {loading && !errorMessages ? (
            <Typography component="p"> loading...</Typography>
          ) : errorMessages ? (
            <Typography component="p">{errorMessages}</Typography>
          ) : (
            movies.map((movie: Movie, index: number) => (
              <MovieList key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </Box>
      </Container>
    </>
  );
};
export default App;
