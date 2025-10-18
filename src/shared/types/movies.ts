export interface Movie {
  id            : number
  title         : string
  poster_path   : string | null
  backdrop_path : string | null
  overview      : string
  release_date  : string
  vote_average  : number
  genre_ids    ?: number[]
  genres       ?: Genre[]
  runtime      ?: number
  tagline      ?: string
}

export interface Genre {
  id  : number
  name: string
}

export interface MovieDetails extends Movie {
  genres : Genre[]
  runtime: number
  status : string
  tagline: string
}

export interface TMDBResponse {
  page         : number
  results      : Movie[]
  total_pages  : number
  total_results: number
}
