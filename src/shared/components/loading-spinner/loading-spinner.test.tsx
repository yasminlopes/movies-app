import { render } from '@testing-library/react';
import { jest, describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { LoadingSpinner } from '.';

jest.mock('../../utils/cn', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

describe('LoadingSpinner', () => {
  test('garante que renderiza spinner', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('garante que aplica classes de animação e estilo', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'border-2',
      'border-gray-300',
      'border-t-primary'
    );
  });

  test('garante que aplica classes de layout no wrapper', () => {
    const { container } = render(<LoadingSpinner />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center', 'p-8');
  });

  describe('sizes', () => {
    test('garante que aplica size sm', () => {
      const { container } = render(<LoadingSpinner size="sm" />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-4', 'w-4');
    });

    test('garante que aplica size md por padrão', () => {
      const { container } = render(<LoadingSpinner />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-8', 'w-8');
    });

    test('garante que aplica size md quando especificado', () => {
      const { container } = render(<LoadingSpinner size="md" />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-8', 'w-8');
    });

    test('garante que aplica size lg', () => {
      const { container } = render(<LoadingSpinner size="lg" />);
      
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });
  });

  test('garante que className customizada é aplicada ao wrapper', () => {
    const { container } = render(<LoadingSpinner className="custom-wrapper" />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  test('garante que mantém classes base ao usar className customizada', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center', 'p-8', 'custom-class');
  });

  test('garante que combina size e className customizada', () => {
    const { container } = render(<LoadingSpinner size="lg" className="my-custom-class" />);
    
    const wrapper = container.firstChild;
    const spinner = container.querySelector('.animate-spin');
    
    expect(wrapper).toHaveClass('my-custom-class');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });
});