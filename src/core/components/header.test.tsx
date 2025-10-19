import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { jest, describe, test, expect } from '@jest/globals';
import Header from './header';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('../../shared/hooks/use-search-route', () => ({
  useSearchRoute: () => ({ 
    value: 'bat', 
    setValue: jest.fn() 
  }),
}));

jest.mock('../../shared/components/button', () => ({
  Button: ({ startIcon, ...props }: any) => (
    <button {...props}>
      {startIcon}
    </button>
  ),
}));
jest.mock('../../shared/components/input', () => ({
  Input: (props: any) => <input {...props} />,
}));
jest.mock('../../shared/components/tooltip', () => ({
  Tooltip: ({ children }: any) => <>{children}</>,
}));

jest.mock('../../shared/components/input', () => ({
  Input: ({ startIcon, endIcon, className, ...props }: any) => (
    <div className="relative">
      {startIcon && <div data-testid="start-icon-wrapper">{startIcon}</div>}
      <input className={className} {...props} />
      {endIcon && <div data-testid="end-icon-wrapper">{endIcon}</div>}
    </div>
  ),
}));


jest.mock('lucide-react', () => ({
  Clapperboard: () => <div data-testid="clapperboard-icon" />,
  Heart: () => <div data-testid="heart-icon" />,
  Search: () => <div data-testid="search-icon" />,
}));

describe('Header', () => {
  test('renderiza logo, input de busca e link de favoritos', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /moviedb/i })).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/buscar filmes/i);
    expect(input).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    const favLink = links.find((l) => l.getAttribute('href') === '/favorites');
    expect(favLink).toBeTruthy();
  });

  test('renderiza header como elemento fixo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0');
  });

  test('exibe ícones corretamente', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId('clapperboard-icon')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });
});

