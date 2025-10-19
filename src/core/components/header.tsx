import { Clapperboard, Heart, Search } from 'lucide-react';
import { Button } from '../../shared/components/button';
import { Input } from '../../shared/components/input';
import { Link } from 'react-router';
import { useSearchRoute } from '../../shared/hooks/use-search-route';
import { Tooltip } from '../../shared/components/tooltip';

export default function Header() {
  const { value, setValue } = useSearchRoute({
    delay: 500,
    minLength: 2,
    param: 'q',
    searchPath: '/search',
    homePath: '/',
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
        >
          <Clapperboard className="h-8 w-8" />
          <span className="font-bold text-xl hidden sm:inline">MovieDB</span>
        </Link>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              type="search"
              startIcon={<Search />}
              placeholder="Buscar filmes..."
              className="pl-10 bg-secondary border-border"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <Link to="/favorites">
          <Tooltip title="Meus favoritos" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              startIcon={<Heart />}
            />
          </Tooltip>
        </Link>
      </div>
    </header>
  );
}
