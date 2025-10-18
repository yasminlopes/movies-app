import { useCallback, useEffect, useRef, useState } from 'react';
import { tmdbApiService } from '../services/tmdb';

type Props = { query?: string };

export function useTmdb({ query }: Props = {}) {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const isSearching = !!query && query.trim().length >= 2;
  const lastKeyRef = useRef<string>('');

  const fetchPage = useCallback(async (pageNum: number, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      const res = (isSearching
        ? await tmdbApiService.searchMovies(query!.trim(), pageNum)
        : await tmdbApiService.getPopularMovies(pageNum)) as { results?: any[]; total_pages?: number };

      const results = res?.results ?? [];
      const total = res?.total_pages ?? 1;

      setMovies((prev) => (append ? [...prev, ...results] : results));
      setTotalPages(total);
      setPage(pageNum);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar filmes';
      setError(message);
      if (!append) setMovies([]);
      console.error('[ERRO]', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [isSearching, query]);

  useEffect(() => {
    const key = isSearching ? `search:${query!.trim()}` : 'popular';
    if (key !== lastKeyRef.current) {
      lastKeyRef.current = key;
      setMovies([]);
      setPage(1);
      setTotalPages(1);
      fetchPage(1, false);
    }
  }, [isSearching, query, fetchPage]);

  const loadMoreMovies = useCallback(() => {
    if (page < totalPages && !loadingMore) {
      fetchPage(page + 1, true);
    }
  }, [page, totalPages, loadingMore, fetchPage]);

  const retryFetch = useCallback(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    loadingMore,
    loadMoreMovies,
    retryFetch,
  };
}
