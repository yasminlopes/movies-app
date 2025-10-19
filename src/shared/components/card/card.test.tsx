import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, test, expect } from '@jest/globals';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

describe('Card', () => {
  test('garante que renderiza card com conteúdo', () => {
    render(
      <Card data-testid="card">
        <div>Conteúdo do card</div>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument();
  });

  describe('variants', () => {
    test('garante que aplica estilos da variant default', () => {
      render(<Card variant="default" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-border', 'shadow-sm');
    });

    test('garante que aplica estilos da variant outlined', () => {
      render(<Card variant="outlined" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-border', 'shadow-none');
    });

    test('garante que aplica estilos da variant elevated', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-border', 'shadow-lg');
    });

    test('garante que aplica estilos da variant ghost', () => {
      render(<Card variant="ghost" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-transparent', 'shadow-none');
    });
  });

  describe('padding', () => {
    test('garante que não aplica padding quando é none', () => {
      render(<Card padding="none" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('p-3', 'p-6', 'p-8');
    });

    test('garante que aplica padding sm', () => {
      render(<Card padding="sm" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-3');
    });

    test('garante que aplica padding default', () => {
      render(<Card padding="default" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-6');
    });

    test('garante que aplica padding lg', () => {
      render(<Card padding="lg" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('interaction states', () => {
    test('garante que aplica classes hover ', () => {
      render(<Card hoverable data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('transition-shadow', 'hover:shadow-md');
    });

    test('garante que aplica classes click ', () => {
      render(<Card clickable data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('cursor-pointer', 'transition-all', 'hover:shadow-md', 'hover:scale-[1.02]');
    });

    test('garante que aplica classes combinadas quando hoverable e clickable', () => {
      render(<Card hoverable clickable data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('cursor-pointer', 'transition-all', 'hover:shadow-lg', 'hover:scale-[1.02]');
    });
  });

  test('garante que callback onClick é executado quando card é clickable', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(
      <Card clickable onClick={handleClick} data-testid="card">
        Content
      </Card>
    );
    
    await user.click(screen.getByTestId('card'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('garante que className customizada é aplicada ao card', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });
});

describe('CardHeader', () => {
  test('garante que renderiza header com estilos corretos', () => {
    render(
      <CardHeader data-testid="card-header">
        <div>Header content</div>
      </CardHeader>
    );
    
    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-6');
  });
});

describe('CardTitle', () => {
  test('garante que renderiza título como heading h3 com estilos corretos', () => {
    render(<CardTitle>Título do Card</CardTitle>);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Título do Card');
    expect(title).toHaveClass('text-2xl', 'font-semibold');
  });
});

describe('CardDescription', () => {
  test('garante que renderiza descrição com estilos corretos', () => {
    render(<CardDescription>Descrição do card</CardDescription>);
    
    const description = screen.getByText('Descrição do card');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });
});

describe('CardContent', () => {
  test('garante que renderiza conteúdo com estilos corretos', () => {
    render(
      <CardContent data-testid="card-content">
        <p>Conteúdo principal</p>
      </CardContent>
    );
    
    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('pb-6');
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  test('garante que renderiza footer com estilos corretos', () => {
    render(
      <CardFooter data-testid="card-footer">
        <button>Ação</button>
      </CardFooter>
    );
    
    const footer = screen.getByTestId('card-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'items-center', 'pt-6');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('Card Composition', () => {
  test('garante que renderiza card completo com todos os componentes e estilos', () => {
    render(
      <Card variant="elevated" padding="lg" hoverable data-testid="complete-card">
        <CardHeader>
          <CardTitle>Título Completo</CardTitle>
          <CardDescription>Descrição detalhada do card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Conteúdo principal do card com informações importantes.</p>
        </CardContent>
        <CardFooter>
          <button data-testid="action-button">Ação Principal</button>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('complete-card')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Título Completo');
    expect(screen.getByText('Descrição detalhada do card')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo principal do card com informações importantes.')).toBeInTheDocument();
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
    
    const card = screen.getByTestId('complete-card');
    expect(card).toHaveClass('shadow-lg', 'p-8', 'transition-shadow', 'hover:shadow-md');
  });

});