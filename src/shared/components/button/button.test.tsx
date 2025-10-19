import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, test, expect } from '@jest/globals';
import { Button } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

const MockIcon = () => <span data-testid="mock-icon">⭐</span>;

describe('Button', () => {
  test('garante que renderiza botão com texto', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  test('garante que renderiza label quando fornecida', () => {
    render(<Button label="Test Label" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('garante que renderiza startIcon corretamente', () => {
    render(
      <Button startIcon={<MockIcon />}>
        With Start Icon
      </Button>
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('With Start Icon')).toBeInTheDocument();
  });

  test('garante que renderiza endIcon corretamente', () => {
    render(
      <Button endIcon={<MockIcon />}>
        With End Icon
      </Button>
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('With End Icon')).toBeInTheDocument();
  });

  test('garante que renderiza ambos ícones simultaneamente', () => {
    const StartIcon = () => <span data-testid="start-icon">▶</span>;
    const EndIcon = () => <span data-testid="end-icon">◀</span>;
    
    render(
      <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
        Both Icons
      </Button>
    );
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByText('Both Icons')).toBeInTheDocument();
  });

  describe('variants', () => {
    test('garante que aplica estilos da variant default', () => {
      render(<Button variant="default">Default</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    test('garante que aplica estilos da variant destructive', () => {
      render(<Button variant="destructive">Destructive</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive', 'text-white');
    });

    test('garante que aplica estilos da variant outline', () => {
      render(<Button variant="outline">Outline</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'bg-background', 'shadow-xs');
    });

    test('garante que aplica estilos da variant secondary', () => {
      render(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    test('garante que aplica estilos da variant ghost', () => {
      render(<Button variant="ghost">Ghost</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
    });

    test('garante que aplica estilos da variant link', () => {
      render(<Button variant="link">Link</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary', 'underline-offset-4');
    });
  });

  describe('sizes', () => {
    test('garante que aplica estilos do size default', () => {
      render(<Button size="default">Default Size</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'py-2');
    });

    test('garante que aplica estilos do size sm', () => {
      render(<Button size="sm">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3');
    });

    test('garante que aplica estilos do size lg', () => {
      render(<Button size="lg">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-6');
    });

    test('garante que aplica estilos do size icon', () => {
      render(<Button size="icon" startIcon={<MockIcon />} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-9');
    });

    test('garante que aplica estilos do size icon-sm', () => {
      render(<Button size="icon-sm" startIcon={<MockIcon />} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-8');
    });

    test('garante que aplica estilos do size icon-lg', () => {
      render(<Button size="icon-lg" startIcon={<MockIcon />} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-10');
    });
  });

  test('garante que className customizada é aplicada mantendo classes base', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('inline-flex', 'items-center');
  });

  test('garante que props nativas são aplicadas corretamente', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled data-testid="test-button">
        Test
      </Button>
    );
    
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
  });

  test('garante que callback onClick é executado quando botão é clicado', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('garante que onClick não é executado quando botão está disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('garante que combina label, children e ícones corretamente', () => {
    render(
      <Button 
        label="Label Text" 
        startIcon={<span data-testid="start">Start</span>}
        endIcon={<span data-testid="end">End</span>}
      >
        Children Text
      </Button>
    );
    
    expect(screen.getByTestId('start')).toBeInTheDocument();
    expect(screen.getByText('Label Text')).toBeInTheDocument();
    expect(screen.getByText('Children Text')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  test('garante que aplica classes de foco e acessibilidade', () => {
    render(<Button>Accessible</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'outline-none',
      'focus-visible:border-ring',
      'focus-visible:ring-ring/50',
      'focus-visible:ring-[3px]'
    );
  });
});