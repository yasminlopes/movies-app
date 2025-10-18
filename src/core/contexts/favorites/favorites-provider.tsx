import { useEffect, useState, type ReactNode } from "react"
import type { Movie } from '../../../shared/types/movies'
import { FavoritesContext } from './favorites-context'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded]   = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("@tmbd_favorites")
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse favorites:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("@tmbd_favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId))
  }

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
