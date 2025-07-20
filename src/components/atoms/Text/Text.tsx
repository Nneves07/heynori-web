import React from 'react'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'

interface TextProps extends BaseComponentProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white' | 'black'
  align?: 'left' | 'center' | 'right' | 'justify'
  as?: keyof JSX.IntrinsicElements
}

const Text: React.FC<TextProps> = ({
  variant = 'p',
  size = 'base',
  weight = 'normal',
  color = 'black',
  align = 'left',
  as,
  className,
  id,
  children,
  ...props
}) => {
  const Component = as || variant

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-600',
    accent: 'text-accent-500',
    muted: 'text-secondary-500',
    white: 'text-white',
    black: 'text-secondary-900'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  return (
    <Component
      id={id}
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Text 