import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from './layouts/main-layout';
import MoviesView from '../features/movies';
import MovieDetailsView from '../features/movies-details';
import FavoritesView from '../features/favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MoviesView /> },
      { path: 'search', element: <MoviesView isSearch /> },
      { path: 'movie/:id', element: <MovieDetailsView /> }, 
       { path: 'favorites', element: <FavoritesView /> }
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
