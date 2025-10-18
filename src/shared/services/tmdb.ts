import { axiosInterceptor } from '../../core/interceptors/axios';

class TmdbApiService {
  async getPopularMovies(page = 1) {
    return axiosInterceptor.get('movie/popular', {
      params: { page },
    });
  }

  async searchMovies(query: string, page = 1) {
    return axiosInterceptor.get('search/movie', {
      params: { page, query, include_adult: false },
    });
  }

  async getMovieDetails(id: number) {
    return axiosInterceptor.get(`/movie/${id}`, {});
  }
}

export const tmdbApiService = new TmdbApiService();
