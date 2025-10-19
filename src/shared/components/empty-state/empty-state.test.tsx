import { render, screen } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import { EmptyState } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

const MockIcon = () => <span data-testid="mock-icon">📭</span>;

describe('EmptyState', () => {
  test('garante que renderiza título como heading h3', () => {
    render(<EmptyState title="Nenhum item encontrado" />);
    
    expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Nenhum item encontrado');
  });

  test('garante que renderiza título com descrição quando fornecidos', () => {
    render(
      <EmptyState 
        title="Lista vazia" 
        description="Adicione alguns itens para começar"
      />
    );
    
    expect(screen.getByText('Lista vazia')).toBeInTheDocument();
    expect(screen.getByText('Adicione alguns itens para começar')).toBeInTheDocument();
  });

  test('garante que exibe ícone quando fornecido', () => {
    render(
      <EmptyState 
        title="Sem resultados"
        icon={<MockIcon />}
      />
    );
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('garante que renderiza ação quando fornecida', () => {
    const action = <button data-testid="action-button">Adicionar Item</button>;
    
    render(
      <EmptyState 
        title="Lista vazia"
        action={action}
      />
    );
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  describe('sizes', () => {
    test('garante que aplica estilos do size sm', () => {
      const { container } = render(
        <EmptyState title="Teste" size="sm" />
      );
      
      expect(container.firstChild).toHaveClass('py-8');
    });

    test('garante que aplica estilos do size default', () => {
      const { container } = render(
        <EmptyState title="Teste" size="default" />
      );
      
      expect(container.firstChild).toHaveClass('py-12');
    });

    test('garante que aplica estilos do size lg', () => {
      const { container } = render(
        <EmptyState title="Teste" size="lg" />
      );
      
      expect(container.firstChild).toHaveClass('py-16');
    });
  });

  test('garante que renderiza todos os elementos quando componente está completo', () => {
    const icon = <span data-testid="icon">🎬</span>;
    const action = <button data-testid="cta">Explorar Filmes</button>;
    
    render(
      <EmptyState
        title="Nenhum filme favoritado"
        description="Adicione filmes aos seus favoritos para vê-los aqui!"
        icon={icon}
        action={action}
        size="lg"
        className="custom-empty-state"
      />
    );
    
    expect(screen.getByText('Nenhum filme favoritado')).toBeInTheDocument();
    expect(screen.getByText('Adicione filmes aos seus favoritos para vê-los aqui!')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('cta')).toBeInTheDocument();
  });

  test('garante que className customizada é aplicada ao container', () => {
    const { container } = render(
      <EmptyState title="Teste" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('garante que aplica classes de tamanho de texto corretas para size lg', () => {
    render(
      <EmptyState 
        title="Título Grande" 
        description="descrição grande"
        size="lg" 
      />
    );
    
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('text-xl');
    
    const description = screen.getByText('Descrição grande');
    expect(description).toHaveClass('text-base');
  })
})