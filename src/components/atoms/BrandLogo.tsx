import React, { useState } from 'react'

interface BrandLogoProps {
  name: string
  logoUrl: string
  size?: number
  className?: string
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  name,
  logoUrl,
  size = 32,
  className = '',
}) => {
  const [hover, setHover] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
    console.warn(`Logo not found for: ${name}`)
  }
  
  if (imageError) {
    // Fallback: mostrar un placeholder con las iniciales
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase()
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg transition-all duration-300 ${className}`}
        style={{ 
          width: size,
          height: size,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span 
          className={`font-semibold text-sm transition-all duration-300 ${
            hover ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          {initials}
        </span>
      </div>
    )
  }
  
  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ 
        width: size,
        height: size,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={logoUrl}
        alt={name}
        className={`transition-all duration-300 ${
          hover 
            ? 'filter-none scale-110' 
            : 'filter grayscale opacity-70'
        }`}
        style={{ 
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
        onError={handleImageError}
      />
    </div>
  )
}

export default BrandLogo 