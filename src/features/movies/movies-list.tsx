import { Heart, Star } from 'lucide-react';
import { Button } from '../../shared/components/button';
import { Card, CardContent } from '../../shared/components/card';
import { getImageUrl } from '../../shared/utils/image';
import {Tooltip} from '../../shared/components/tooltip';
import type { Movie } from '../../shared/types/movies';
import { Image } from '../../shared/components/image';
import { Link } from 'react-router';

interface Props {
  movie: Movie;
  favorite: boolean;
  onToggleFavorite: (movie: any) => void;
}

export default function MoviesList({ movie, favorite, onToggleFavorite }: Props) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card className="group overflow-hidden bg-card hover:ring-2 hover:ring-primary transition-all duration-300 h-full">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            <Image
              src={getImageUrl(movie.poster_path, "w300") || "/placeholder.svg"}
              alt={movie.title}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <Tooltip title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} >
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm"
              onClick={onToggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorite ? 'fill-primary text-primary' : 'text-white'
                }`}
              />
            </Button>
            </Tooltip>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-semibold text-white">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            {movie.release_date && (
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
