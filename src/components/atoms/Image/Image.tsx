import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'

interface ImageProps extends BaseComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  lazy?: boolean
  priority?: boolean
  rounded?: boolean
  shadow?: boolean
  hover?: boolean
  fallback?: string
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  priority = false,
  rounded = false,
  shadow = false,
  hover = false,
  fallback,
  className,
  id,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback)
      setHasError(false)
    } else {
      setHasError(true)
    }
  }

  const imageClasses = cn(
    'transition-all duration-300',
    {
      'rounded-lg': rounded,
      'shadow-lg': shadow,
      'hover:scale-105 hover:shadow-xl': hover,
      'opacity-0': !isLoaded && !hasError,
      'opacity-100': isLoaded || hasError,
    },
    className
  )

  if (hasError) {
    return (
      <div
        id={id}
        className={cn(
          'flex items-center justify-center bg-secondary-100 text-secondary-500',
          imageClasses
        )}
        style={{ width, height }}
        {...props}
      >
        <span className="text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <motion.img
      id={id}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy && !priority ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      className={imageClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  )
}

export default Image 