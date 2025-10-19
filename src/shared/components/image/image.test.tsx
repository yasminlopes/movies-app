import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import { Image } from './index';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

describe('Image', () => {
  test('garante que renderiza imagem com src e alt corretos', () => {
    render(<Image src="/test.jpg" alt="Imagem teste" />);
    
    const img = screen.getByAltText('Imagem teste');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  test('garante que exibe placeholder durante carregamento quando habilitado', () => {
    render(<Image src="/test.jpg" alt="Teste" showPlaceholder={true} />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('garante que não exibe placeholder quando showPlaceholder é false', () => {
    render(<Image src="/test.jpg" alt="Teste" showPlaceholder={false} />);
    
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  describe('aspect ratios', () => {
    test('garante que aplica aspect ratio square', () => {
      const { container } = render(<Image src="/test.jpg" aspectRatio="square" />);
      
      const imageContainer = container.querySelector('div');
      expect(imageContainer).toHaveClass('aspect-square');
    });

    test('garante que aplica aspect ratio video', () => {
      const { container } = render(<Image src="/test.jpg" aspectRatio="video" />);
      
      const imageContainer = container.querySelector('div');
      expect(imageContainer).toHaveClass('aspect-video');
    });

    test('garante que aplica aspect ratio portrait', () => {
      const { container } = render(<Image src="/test.jpg" aspectRatio="portrait" />);
      
      const imageContainer = container.querySelector('div');
      expect(imageContainer).toHaveClass('aspect-[3/4]');
    });
  });

  describe('object fit', () => {
    test('garante que aplica object-fit cover', () => {
      const { container } = render(<Image src="/test.jpg" objectFit="cover" />);
      
      const img = container.querySelector('img');
      expect(img).toHaveClass('object-cover');
    });

    test('garante que aplica object-fit contain', () => {
      const { container } = render(<Image src="/test.jpg" objectFit="contain" />);
      
      const img = container.querySelector('img');
      expect(img).toHaveClass('object-contain');
    });
  });

  test('garante que exibe imagem de fallback quando src é inválida (string)', async () => {
    const { container } = render(<Image src="/invalid.jpg" fallback="/fallback.jpg" alt="Teste" />);
    
    const img = container.querySelector('img');
    fireEvent.error(img!);
    
    await waitFor(() => {
      const fallbackImg = screen.getByAltText('Teste');
      expect(fallbackImg).toHaveAttribute('src', '/fallback.jpg');
    });
  });

  test('garante que exibe componente de fallback quando src é inválida (ReactNode)', async () => {
    const FallbackComponent = () => <div data-testid="fallback">Erro ao carregar</div>;
    
    const { container } = render(<Image src="/invalid.jpg" fallback={<FallbackComponent />} alt="Teste" />);
    
    const img = container.querySelector('img');
    fireEvent.error(img!);
    
    await waitFor(() => {
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });
  });

  test('garante que callback onLoad é executado quando imagem carrega', async () => {
    const handleLoad = jest.fn();
    const { container } = render(<Image src="/test.jpg" onLoad={handleLoad} />);
    
    const img = container.querySelector('img');
    fireEvent.load(img!);
    
    expect(handleLoad).toHaveBeenCalled();
  });

  test('garante que callback onError é executado quando imagem falha', async () => {
    const handleError = jest.fn();
    const { container } = render(<Image src="/invalid.jpg" onError={handleError} />);
    
    const img = container.querySelector('img');
    fireEvent.error(img!);
    
    expect(handleError).toHaveBeenCalled();
  });

  test('garante que aplica loading lazy por padrão', () => {
    const { container } = render(<Image src="/test.jpg" />);
    
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('garante que aplica loading eager quando especificado', () => {
    const { container } = render(<Image src="/test.jpg" loading="eager" />);
    
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  test('garante que remove placeholder após carregamento completo da imagem', async () => {
    const { container } = render(<Image src="/test.jpg" showPlaceholder={true} />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    
    const img = container.querySelector('img');
    fireEvent.load(img!);
    
    await waitFor(() => {
      expect(img).toHaveClass('opacity-100');
    });
  });

  test('garante que className customizada é aplicada ao container', () => {
    const { container } = render(<Image src="/test.jpg" className="custom-image" />);
    
    const img = container.querySelector('img');
    expect(img).toHaveClass('custom-image');
  });
});