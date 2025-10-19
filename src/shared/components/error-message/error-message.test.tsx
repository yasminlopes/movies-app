import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest, describe, test, expect } from '@jest/globals';
import { ErrorMessage } from '.';

jest.mock('../button', () => ({
  Button: ({ children, onClick, variant, ...props }: any) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

describe('ErrorMessage', () => {
  test('garante que exibe mensagem de erro', () => {
    render(<ErrorMessage message="Algo deu errado" />);
    
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  test('garante que mensagem tem estilo de erro', () => {
    render(<ErrorMessage message="Erro ao carregar" />);
    
    const message = screen.getByText('Erro ao carregar');
    expect(message).toHaveClass('text-destructive');
  });

  test('garante que não exibe botão de retry quando onRetry não é fornecido', () => {
    render(<ErrorMessage message="Erro" />);
    
    expect(screen.queryByText('Tentar novamente')).not.toBeInTheDocument();
  });

  test('garante que exibe botão de retry quando onRetry é fornecido', () => {
    const handleRetry = jest.fn();
    
    render(<ErrorMessage message="Erro" onRetry={handleRetry} />);
    
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
  });

  test('garante que botão de retry tem variant outline', () => {
    const handleRetry = jest.fn();
    
    render(<ErrorMessage message="Erro" onRetry={handleRetry} />);
    
    const button = screen.getByText('Tentar novamente');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  test('garante que callback onRetry é executado ao clicar no botão', async () => {
    const user = userEvent.setup();
    const handleRetry = jest.fn();
    
    render(<ErrorMessage message="Erro" onRetry={handleRetry} />);
    
    const button = screen.getByText('Tentar novamente');
    await user.click(button);
    
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('garante que aplica classes de layout corretas', () => {
    const { container } = render(<ErrorMessage message="Erro" />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'p-8',
      'text-center'
    );
  });

  test('garante que mensagem tem margem inferior', () => {
    render(<ErrorMessage message="Erro" onRetry={jest.fn()} />);
    
    const message = screen.getByText('Erro');
    expect(message).toHaveClass('mb-4');
  });
});