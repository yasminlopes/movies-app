import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

interface Props {
  title: string
  position?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  className?: string
}

export function useTooltip({
  title,
  position = 'top',
  delayDuration = 300,
  className,
}: Props) {

  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<number | undefined>(undefined)

  const showTooltip = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()

    switch (position) {
      case 'top':
        setCoords({ x: rect.left + rect.width / 2, y: rect.top })
        break
      case 'bottom':
        setCoords({ x: rect.left + rect.width / 2, y: rect.bottom })
        break
      case 'left':
        setCoords({ x: rect.left, y: rect.top + rect.height / 2 })
        break
      case 'right':
        setCoords({ x: rect.right, y: rect.top + rect.height / 2 })
        break
      default:
        setCoords({ x: rect.left + rect.width / 2, y: rect.top })
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, delayDuration)
  }

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const getTooltipStyle = () => {
    const offset = 8
    switch (position) {
      case 'top':
        return {
          left: coords.x,
          top: coords.y - offset,
          transform: 'translate(-50%, -100%)',
        }
      case 'bottom':
        return {
          left: coords.x,
          top: coords.y + offset,
          transform: 'translate(-50%, 0%)',
        }
      case 'left':
        return {
          left: coords.x - offset,
          top: coords.y,
          transform: 'translate(-100%, -50%)',
        }
      case 'right':
        return {
          left: coords.x + offset,
          top: coords.y,
          transform: 'translate(0%, -50%)',
        }
      default:
        return {
          left: coords.x,
          top: coords.y - offset,
          transform: 'translate(-50%, -100%)',
        }
    }
  }

  const tooltipProps = {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
  }

  const TooltipPortal = () => {
    if (!open || !title) return null

    return createPortal(
      <div
        className={cn(
          'bg-foreground text-background fixed z-[9999] w-max max-w-xs rounded-md px-3 py-1.5 text-xs pointer-events-none whitespace-nowrap',
          className
        )}
        style={getTooltipStyle()}
      >
        {title}
      </div>,
      document.body
    )
  }

  return {
    tooltipProps,
    TooltipPortal,
  }
}
