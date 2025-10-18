import { ArrowUpDown } from 'lucide-react';
import { EmptyState } from '../../shared/components/empty-state';
import { Select } from '../../shared/components/select';
import MoviesList from '../movies/movies-list';
import { useFavorites } from '../../core/contexts/favorites/favorites-context';
import { PageHeader } from '../../shared/components/page-header';
import { useSorting } from '../../shared/hooks/use-sorting';

const FILTERS_OPTIONS = [
  { value: 'title-asc', label: 'Título (A-Z)' },
  { value: 'title-desc', label: 'Título (Z-A)' },
  { value: 'rating-desc', label: 'Nota (Maior)' },
  { value: 'rating-asc', label: 'Nota (Menor)' },
]

export default function FavoritesView() {
  const { favorites, removeFavorite } = useFavorites();

  const { sortedData: sortedFavorites, sortBy, setSortBy } = useSorting(
    favorites,
    'title-asc'
  );

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Nenhum favorito ainda"
          description="Comece a adicionar filmes aos seus favoritos para vê-los aqui. Explore filmes populares e salve os que você mais gosta!"
          actionLabel="Explorar Filmes"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <PageHeader
          title="Meus Favoritos"
          subtitle={`${favorites.length} ${
            favorites.length === 1 ? 'filme' : 'filmes'
          } na lista`}
        />

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select
            value={sortBy}
            onValueChange={setSortBy}
            options={FILTERS_OPTIONS}
            placeholder="Ordenar por..."
            className="w-[200px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {sortedFavorites.map((movie) => {
          const handleToggleFavorite = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            removeFavorite(movie.id);
          };

          return (
            <MoviesList
              key={movie.id}
              movie={movie}
              favorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        })}
      </div>
    </div>
  );
}