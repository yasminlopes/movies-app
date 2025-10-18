import { createContext, useContext } from "react"
import type { Movie } from '../../../shared/types/movies'

export interface FavoritesContextType {
  favorites     : Movie[]
  addFavorite   : (movie: Movie) => void
  removeFavorite: (movieId: number) => void
  isFavorite    : (movieId: number) => boolean
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
