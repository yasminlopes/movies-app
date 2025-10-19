import { render, screen } from '@testing-library/react';
import { jest, describe, test, expect, beforeEach } from '@jest/globals';

jest.mock('../../hooks/use-tooltip', () => ({
  useTooltip: jest.fn().mockReturnValue({
    tooltipProps: {
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
    },
    TooltipPortal: () => <div data-testid="tooltip-portal">mock Tooltip</div>,
  }),
}));

import { Tooltip } from '.';
import { useTooltip } from '../../hooks/use-tooltip';

const mockUseTooltip = useTooltip as jest.MockedFunction<typeof useTooltip>;

const MockTooltip = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div data-testid="tooltip-wrapper" title={title}>
    {children}
    <div data-testid="tooltip-portal">Tooltip content: {title}</div>
  </div>
);

describe('Tooltip', () => {
  beforeEach(() => {
  jest.clearAllMocks();
  mockUseTooltip.mockReturnValue({
    tooltipProps: {
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
    },
    TooltipPortal: () => <div data-testid="tooltip-portal">mock Tooltip</div> as any,
  });
});

  test('garante que renderiza tooltip com children e title', () => {
    render(
      <MockTooltip title="Dica útil">
        <button>Hover me</button>
      </MockTooltip>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-portal')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-wrapper')).toHaveAttribute('title', 'Dica útil');
  });

  test('garante que renderiza tooltip com texto simples', () => {
    render(
      <MockTooltip title="Texto da dica">
        <span>Texto simples</span>
      </MockTooltip>
    );

    expect(screen.getByText('Texto simples')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-portal')).toBeInTheDocument();
    expect(screen.getByText('Tooltip content: Texto da dica')).toBeInTheDocument();
  });

  test('garante que renderiza TooltipPortal via mock do hook', () => {
    render(
      <Tooltip title="Always shows portal">
        <div>Content</div>
      </Tooltip>
    );

    expect(screen.getByTestId('tooltip-portal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('garante que funciona com diferentes tipos de children sem Fragment', () => {
    const { rerender } = render(
      <Tooltip title="Button tooltip">
        <button>Button child</button>
      </Tooltip>
    );
    expect(screen.getByText('Button child')).toBeInTheDocument();

    rerender(
      <Tooltip title="Div tooltip">
        <div>Div child</div>
      </Tooltip>
    );
    expect(screen.getByText('Div child')).toBeInTheDocument();

    rerender(
      <Tooltip title="Multiple children">
        <div>
          <span>First</span>
          <span>Second</span>
        </div>
      </Tooltip>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  test('garante que configura posição right corretamente', () => {
    render(
      <Tooltip title="Right tooltip" position="right">
        <button>Button</button>
      </Tooltip>
    );
    expect(mockUseTooltip).toHaveBeenCalledWith(expect.objectContaining({ position: 'right' }));
  });

  test('garante que configura posição bottom corretamente', () => {
    render(
      <Tooltip title="Bottom tooltip" position="bottom">
        <button>Button</button>
      </Tooltip>
    );
    expect(mockUseTooltip).toHaveBeenCalledWith(expect.objectContaining({ position: 'bottom' }));
  });

  test('garante que configura posição left corretamente', () => {
    render(
      <Tooltip title="Left tooltip" position="left">
        <button>Button</button>
      </Tooltip>
    );
    expect(mockUseTooltip).toHaveBeenCalledWith(expect.objectContaining({ position: 'left' }));
  });

  test('garante que passa className para useTooltip', () => {
    render(
      <Tooltip title="Custom class" className="my-custom-tooltip">
        <button>Button</button>
      </Tooltip>
    );
    expect(mockUseTooltip).toHaveBeenCalledWith(
      expect.objectContaining({ className: 'my-custom-tooltip' })
    );
  });

  test('garante que configura delay duration customizado', () => {
    render(
      <Tooltip title="Custom delay" delayDuration={1000}>
        <button>Button</button>
      </Tooltip>
    );
    expect(mockUseTooltip).toHaveBeenCalledWith(
      expect.objectContaining({ delayDuration: 1000 })
    );
  });
});