import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, test, expect } from '@jest/globals';
import { Select } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

const mockOptions = [
  { value: 'option1', label: 'Opção 1' },
  { value: 'option2', label: 'Opção 2' },
  { value: 'option3', label: 'Opção 3', disabled: true },
];

describe('Select', () => {
  test('garante que renderiza select com todas as opções fornecidas', () => {
    render(<Select options={mockOptions} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
    expect(screen.getByText('Opção 3')).toBeInTheDocument();
  });

  test('garante que exibe label quando fornecida', () => {
    render(<Select label="Escolha uma opção" options={mockOptions} />);
    
    expect(screen.getByText('Escolha uma opção')).toBeInTheDocument();
  });

  test('garante que exibe placeholder quando fornecido', () => {
    render(<Select placeholder="Selecione..." options={mockOptions} />);
    
    expect(screen.getByText('Selecione...')).toBeInTheDocument();
  });

  describe('variants', () => {
    test('garante que aplica estilos da variant default corretamente', () => {
      render(<Select variant="default" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-input');
    });

    test('garante que aplica estilos da variant error corretamente', () => {
      render(<Select variant="error" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-destructive');
    });

    test('garante que aplica estilos da variant success corretamente', () => {
      render(<Select variant="success" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-green-500');
    });
  });

  describe('sizes', () => {
    test('garante que aplica estilos do size sm corretamente', () => {
      render(<Select size="sm" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-8', 'px-2', 'text-xs');
    });

    test('garante que aplica estilos do size default corretamente', () => {
      render(<Select size="default" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-10', 'px-3');
    });

    test('garante que aplica estilos do size lg corretamente', () => {
      render(<Select size="lg" options={mockOptions} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('h-12', 'px-4');
    });
  });

  test('garante que opções marcadas como disabled não são selecionáveis', () => {
    render(<Select options={mockOptions} />);
    
    const disabledOption = screen.getByText('Opção 3');
    expect(disabledOption).toBeDisabled();
  });

  test('garante que callback onChange é executado ao selecionar uma opção', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Select onChange={handleChange} options={mockOptions} />);
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option1');
    
    expect(handleChange).toHaveBeenCalled();
  });

  test('garante que mensagem de erro é exibida com estilos corretos', () => {
    render(<Select error="Seleção obrigatória" options={mockOptions} />);
    
    expect(screen.getByText('Seleção obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Seleção obrigatória')).toHaveClass('text-destructive');
  });

  test('garante que texto de ajuda é exibido quando fornecido', () => {
    render(<Select helper="Escolha uma das opções disponíveis" options={mockOptions} />);
    
    expect(screen.getByText('Escolha uma das opções disponíveis')).toBeInTheDocument();
  });

  test('garante que helper não é exibido quando tem mensagem de erro', () => {
    render(
      <Select 
        error="Erro" 
        helper="Ajuda"
        options={mockOptions}
      />
    );
    
    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.queryByText('Ajuda')).not.toBeInTheDocument();
  });

  test('garante que className customizada é aplicada ao select', () => {
    render(<Select className="custom-class" options={mockOptions} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });
});