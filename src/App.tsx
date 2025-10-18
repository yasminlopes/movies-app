import { RouterProvider } from 'react-router';
import { router } from './core/routes';
import { FavoritesProvider } from './core/contexts/favorites/favorites-provider';

function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}

export default App;
