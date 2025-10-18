import { env } from '../../core/config/env';

export const getImageUrl = (
  path: string | null,
  size: 'w300' | 'w500' | 'original' = 'w300'
) => {
  if (!path) return '/assets/placeholder.svg';
  return `${env.tmdbImageBaseurl}/${size}${path}`;
};
