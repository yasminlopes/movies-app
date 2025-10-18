import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

type Props = {
  delay?: number;
  minLength?: number;
  param?: string;
  searchPath?: string;
  homePath?: string;  
}

export function useSearchRoute({
  delay = 500,
  minLength = 2,
  param = 'q',
  searchPath = '/search',
  homePath = '/',
}: Props = {}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initial = searchParams.get(param) ?? '';
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const urlValue = searchParams.get(param) ?? '';
    setValue(urlValue);
  }, [location.search]);

  useEffect(() => {
    const id = setTimeout(() => {
      const term = value.trim();

      if (term.length < minLength) {
        if (searchParams.has(param)) {
          const next = new URLSearchParams(searchParams)
          next.delete(param)

          setSearchParams(next, { replace: false })
        }
        if (location.pathname === searchPath) navigate(homePath, { replace: false })

        return;
      }

      const next = new URLSearchParams(searchParams)
      next.set(param, term)

      if (location.pathname !== searchPath) {
        navigate(`${searchPath}?${next.toString()}`, { replace: false })
      } else {
        setSearchParams(next, { replace: false })
      }
    }, delay)

    return () => clearTimeout(id);
  }, [value, delay, minLength, param, searchPath, homePath, location.pathname]);

  const api = useMemo(() => ({ value, setValue }), [value])

  return api;
}
