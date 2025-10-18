import { cloneElement, isValidElement, type ReactNode } from 'react';
import { useTooltip } from "../hooks/use-tooltip";

interface Props {
  title         : string;
  position     ?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  children      : ReactNode;
  className    ?: string;
}

export const Tooltip = ({
  title,
  position = "top",
  delayDuration = 300,
  children,
  className,
}: Props) => {
  const { tooltipProps, TooltipPortal } = useTooltip({
    title,
    position,
    delayDuration,
    className,
  });

  if (isValidElement(children)) {
    return (
      <>
        {cloneElement(children, tooltipProps)}
        <TooltipPortal />
      </>
    );
  }

  return (
    <>
      <div {...tooltipProps}>{children}</div>
      <TooltipPortal />
    </>
  );
}