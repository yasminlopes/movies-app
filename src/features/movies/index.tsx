import { PageHeader } from '../../shared/components/page-header';
import MoviesList from './movies-list';
import { useTmdb } from '../../shared/hooks/use-tmdb';
import { ErrorMessage } from '../../shared/components/error-message';
import { Button } from '../../shared/components/button';
import { useSearchParams } from 'react-router';
import MoviesListSkeleton from './movies-list-skeleton';
import { useFavorites } from '../../core/contexts/favorites/favorites-context';
import MoviesSearch from './movies-search';
import { EmptyState } from '../../shared/components/empty-state';

interface Props {
  isSearch?: boolean;
}

export default function MoviesView({ isSearch = false }: Props) {
  const [searchParams] = useSearchParams();
  const query          = (searchParams.get('q') ?? '').trim();

  const {
    movies,
    loading,
    error,
    page,
    totalPages,
    loadingMore,
    loadMoreMovies,
    retryFetch,
  } = useTmdb({ query: isSearch ? query : undefined });

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (isSearch && query.length < 2) {
    return <MoviesSearch />;
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={retryFetch} />;
  }

  const hasNoResults =
    !loading && movies.length === 0 && isSearch && query.length >= 2;

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={isSearch && query ? `Resultados para "${query}"` : 'Tendências'}
        subtitle={
          isSearch && query
            ? `Encontramos ${movies.length} ${movies.length === 1 ? 'filme' : 'filmes'} `
            : 'Descubra os filmes mais populares do momento'
        }
      />

      {/* Sem resultados */}
      {hasNoResults && (
        <EmptyState
          title={'Nenhum filme encontrado para "' + query + '"'}
          description="Tente ajustar seus termos de pesquisa ou explorar os filmes populares."
        />
      )}

      {loading && movies.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <MoviesListSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => {
            const favorite = isFavorite(movie.id);
            const handleToggleFavorite = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              favorite ? removeFavorite(movie.id) : addFavorite(movie);
            };

            return (
              <MoviesList
                key={movie.id}
                movie={movie}
                favorite={favorite}
                onToggleFavorite={handleToggleFavorite}
              />
            );
          })}
        </div>
      )}

      {loadingMore && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MoviesListSkeleton key={`more-${i}`} />
          ))}
        </div>
      )}

      {error && movies.length > 0 && (
        <div className="mt-8">
          <ErrorMessage message={error} onRetry={() => loadMoreMovies()} />
        </div>
      )}

      {!error && page < totalPages && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={loadMoreMovies}
            disabled={loadingMore}
            size="lg"
            className="min-w-[200px]"
            label={loadingMore ? 'Carregando...' : 'Carregar mais filmes'}
          />
        </div>
      )}

      {page >= totalPages && movies.length > 0 && (
        <p className="text-center text-muted-foreground mt-12">
          Você chegou ao fim da lista
        </p>
      )}
    </div>
  );
}
