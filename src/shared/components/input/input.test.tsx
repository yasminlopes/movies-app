import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, test, expect } from '@jest/globals';
import { Input } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

const MockIcon = () => <span data-testid="mock-icon">🔍</span>;

describe('Input', () => {
  test('garante que renderiza input com placeholder', () => {
    render(<Input placeholder="Digite algo..." />);
    
    const input = screen.getByPlaceholderText('Digite algo...');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  test('garante que exibe label quando fornecida', () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />);
    
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  test('garante que renderiza startIcon e ajusta padding esquerdo', () => {
    render(<Input startIcon={<MockIcon />} placeholder="Buscar..." />);
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar...')).toHaveClass('pl-10');
  });

  test('garante que renderiza endIcon e ajusta padding direito', () => {
    render(<Input endIcon={<MockIcon />} placeholder="Buscar..." />);
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar...')).toHaveClass('pr-10');
  });

  test('garante que renderiza ambos ícones com paddings corretos', () => {
    const StartIcon = () => <span data-testid="start-icon">🔍</span>;
    const EndIcon = () => <span data-testid="end-icon">❌</span>;
    
    render(
      <Input 
        startIcon={<StartIcon />} 
        endIcon={<EndIcon />}
        placeholder="Buscar..."
      />
    );
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar...')).toHaveClass('pl-10', 'pr-10');
  });

  describe('variants', () => {
    test('garante que aplica estilos da variant default', () => {
      render(<Input variant="default" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-input');
    });

    test('garante que aplica estilos da variant error', () => {
      render(<Input variant="error" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-destructive', 'focus-visible:ring-destructive');
    });

    test('garante que aplica estilos da variant success', () => {
      render(<Input variant="success" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-green-500', 'focus-visible:ring-green-500');
    });
  });

  describe('sizes', () => {
    test('garante que aplica estilos do size sm', () => {
      render(<Input size="sm" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-8', 'px-2', 'text-xs');
    });

    test('garante que aplica estilos do size default', () => {
      render(<Input size="default" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10', 'px-3');
    });

    test('garante que aplica estilos do size lg', () => {
      render(<Input size="lg" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-12', 'px-4', 'text-base');
    });
  });

  test('garante que mensagem de erro é exibida com estilos corretos', () => {
    render(<Input error="Campo obrigatório" />);
    
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Campo obrigatório')).toHaveClass('text-destructive');
  });

  test('garante que texto de ajuda é exibido com estilos corretos', () => {
    render(<Input helper="Digite pelo menos 3 caracteres" />);
    
    expect(screen.getByText('Digite pelo menos 3 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Digite pelo menos 3 caracteres')).toHaveClass('text-muted-foreground');
  });

  test('garante que helper não é exibido quando há erro', () => {
    render(
      <Input 
        error="Campo obrigatório" 
        helper="Digite pelo menos 3 caracteres"
      />
    );
    
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.queryByText('Digite pelo menos 3 caracteres')).not.toBeInTheDocument();
  });

  test('garante que callback onChange é executado ao digitar', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'teste');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('garante que className customizada é aplicada ao input', () => {
    render(<Input className="custom-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  test('garante que suporta diferentes tipos de input', () => {
    render(<Input type="email" placeholder="Email" />);
    
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');
  });
})