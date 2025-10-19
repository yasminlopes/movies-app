import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { tmdbApiService } from '../../shared/services/tmdb';
import { Button } from '../../shared/components/button';
import { Heart, Star, Calendar, Film, ArrowLeft } from 'lucide-react';
import MovieDetailsSkeleton from './movies-details-skeleton';
import { ErrorMessage } from '../../shared/components/error-message';
import { getImageUrl } from '../../shared/utils/image';
import { useFavorites } from '../../core/contexts/favorites/favorites-context';
import type { Movie } from '../../shared/types/movies';
import { Image } from '../../shared/components/image';
import { Badge } from '../../shared/components/badge';

export default function MovieDetailsView() {

  const { id }                                      = useParams<{ id: string }>();
  const movieId                                     = Number(id);
  const [movie, setMovie]                           = useState<Movie | null>(null);
  const [loading, setLoading]                       = useState(true);
  const [error, setError]                           = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await tmdbApiService.getMovieDetails(movieId);
        if (!active) return;
        setMovie(res as Movie);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao carregar detalhes';
        setError(message);
        setMovie(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (!Number.isFinite(movieId)) {
      setError('ID de filme inválido');
      setLoading(false);
      return;
    }

    load();
    return () => {
      active = false;
    };
  }, [movieId]);

  if (loading) return <MovieDetailsSkeleton />;

  if (error)
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  if (!movie) return null;

  const isFav = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {movie.backdrop_path ? (
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')!}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <Film className="h-10 w-10" />
          </div>
        )}

        <div className="absolute inset-0 bg-background/20" />

        {/* gradiente no topo (some para baixo) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background/90 to-transparent" />

        {/* gradiente no rodapé (some para cima) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <Link to="/" className="absolute top-4 left-4 z-10 p-1">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-24 md:-mt-28 lg:-mt-32 pb-16 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">

          <div className="hidden md:block">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
              <Image
                src={
                  getImageUrl(movie.poster_path, 'w500') || '/placeholder.svg'
                }
                alt={movie.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-muted-foreground italic">
                  {movie.tagline}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-accent/20 px-3 py-1.5 rounded-full">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-bold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>

              {movie.release_date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}

              {movie.runtime && (
                <div className="text-muted-foreground">
                  <span>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                  </span>
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <Button
              onClick={handleToggleFavorite}
              size="lg"
              variant={isFav ? 'default' : 'outline'}
              className="gap-2"
            >
              <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
              {isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </Button>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Sinopse
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {movie.overview || 'Sinopse não disponível.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              {movie.runtime && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                    Duração
                  </h3>
                  <p className="text-foreground">{movie.runtime} minutos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
