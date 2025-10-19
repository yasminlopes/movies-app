import { render, screen } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import { Badge } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

const MockIcon = () => <span data-testid="mock-icon">⭐</span>;

describe('Badge', () => {
  test('garante que renderiza badge com texto', () => {
    render(<Badge>Badge Text</Badge>);
    
    const badge = screen.getByText('Badge Text');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
  });

  test('garante que renderiza ícone junto com texto', () => {
    render(
      <Badge icon={<MockIcon />}>
        With Icon
      </Badge>
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  describe('variants', () => {
    test('garante que aplica estilos da variant default', () => {
      render(<Badge variant="default">Default</Badge>);
      
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    test('garante que aplica estilos da variant secondary', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    test('garante que aplica estilos da variant destructive', () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      
      const badge = screen.getByText('Destructive');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    test('garante que aplica estilos da variant outline', () => {
      render(<Badge variant="outline">Outline</Badge>);
      
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('text-foreground', 'border-border');
    });

    test('garante que aplica estilos da variant success', () => {
      render(<Badge variant="success">Success</Badge>);
      
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-green-500', 'text-white');
    });

    test('garante que aplica estilos da variant warning', () => {
      render(<Badge variant="warning">Warning</Badge>);
      
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-yellow-500', 'text-white');
    });
  });

  describe('sizes', () => {
    test('garante que aplica estilos do size sm', () => {
      render(<Badge size="sm">Small</Badge>);
      
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('text-xs', 'px-2', 'py-0.5');
    });

    test('garante que aplica estilos do size default', () => {
      render(<Badge size="default">Default Size</Badge>);
      
      const badge = screen.getByText('Default Size');
      expect(badge).toHaveClass('text-xs', 'px-2.5', 'py-0.5');
    });

    test('garante que aplica estilos do size lg', () => {
      render(<Badge size="lg">Large</Badge>);
      
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('text-sm', 'px-3', 'py-1');
    });
  });

  test('garante que className customizada é aplicada mantendo classes base', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('inline-flex', 'items-center');
  });

  test('garante que props nativas do span são aplicadas', () => {
    render(
      <Badge data-testid="test-badge" title="Test title">
        Test
      </Badge>
    );
    
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('title', 'Test title');
  });

  test('garante que aplica classes base corretamente', () => {
    render(<Badge>Test</Badge>);
    
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-1',
      'rounded-full',
      'border'
    );
  });

  test('garante que combina ícone e texto corretamente', () => {
    render(
      <Badge icon={<span data-testid="icon">🏆</span>}>
        Achievement
      </Badge>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Achievement')).toBeInTheDocument();
  });

  test('garante que aplica classes de foco e acessibilidade', () => {
    render(<Badge>Accessible</Badge>);
    
    const badge = screen.getByText('Accessible');
    expect(badge).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2'
    );
  });

  test('garante que combina diferentes variantes com tamanhos', () => {
    render(
      <div>
        <Badge variant="success" size="sm">Small Success</Badge>
        <Badge variant="destructive" size="lg">Large Error</Badge>
      </div>
    );
    
    const smallBadge = screen.getByText('Small Success');
    const largeBadge = screen.getByText('Large Error');
    
    expect(smallBadge).toHaveClass('bg-green-500', 'text-xs', 'px-2');
    expect(largeBadge).toHaveClass('bg-destructive', 'text-sm', 'px-3');
  });
});