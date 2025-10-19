import { render, screen } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import { PageHeader } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

describe('PageHeader', () => {
  test('garante que renderiza título como heading h1', () => {
    render(<PageHeader title="Minha Página" />);
    
    expect(screen.getByText('Minha Página')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Minha Página');
  });

  test('garante que renderiza título e subtítulo quando ambos são fornecidos', () => {
    render(
      <PageHeader 
        title="Minha Página" 
        subtitle="Descrição da página"
      />
    );
    
    expect(screen.getByText('Minha Página')).toBeInTheDocument();
    expect(screen.getByText('Descrição da página')).toBeInTheDocument();
  });

  test('garante que renderiza children como conteúdo adicional', () => {
    render(
      <PageHeader title="Minha Página">
        <div data-testid="page-content">Conteúdo da página</div>
      </PageHeader>
    );
    
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  test('garante que renderiza todos os elementos quando componente está completo', () => {
    const breadcrumb = <span>Home &gt; Seção &gt; Página</span>;
    const actions = (
      <>
        <button data-testid="secondary-action">Cancelar</button>
        <button data-testid="primary-action">Salvar</button>
      </>
    );
    
    render(
      <PageHeader
        title="Página Completa"
        subtitle="Com todos os elementos"
        breadcrumb={breadcrumb}
        actions={actions}
        className="custom-header"
      >
        <div data-testid="content">Conteúdo adicional</div>
      </PageHeader>
    );
    
    expect(screen.getByText('Página Completa')).toBeInTheDocument();
    expect(screen.getByText('Com todos os elementos')).toBeInTheDocument();
    expect(screen.getByText('Home > Seção > Página')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-action')).toBeInTheDocument();
    expect(screen.getByTestId('primary-action')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  test('garante que className customizada é aplicada ao container', () => {
    const { container } = render(
      <PageHeader title="Teste" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('garante que título possui classes de estilo corretas', () => {
    render(<PageHeader title="Teste" />);
    
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('text-3xl', 'font-bold', 'tracking-tight');
  });
});