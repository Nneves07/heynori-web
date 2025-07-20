// Component Props
export interface BaseComponentProps {
  className?: string
  id?: string
  children?: React.ReactNode
}

// Button Props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

// Navigation Props
export interface NavigationProps extends BaseComponentProps {
  isOpen?: boolean
  onToggle?: () => void
}

// Hero Section Props
export interface HeroProps extends BaseComponentProps {
  title: string
  subtitle: string
  description: string
  primaryAction: {
    text: string
    onClick: () => void
  }
  secondaryAction?: {
    text: string
    onClick: () => void
  }
}

// Problem Section Props
export interface ProblemProps extends BaseComponentProps {}

// Solution Section Props
export interface SolutionProps extends BaseComponentProps {}

// CTA Section Props
export interface CTAProps extends BaseComponentProps {}

// Feature Card Props
export interface FeatureCardProps extends BaseComponentProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

// Integration Props
export interface IntegrationProps extends BaseComponentProps {
  name: string
  logo: string
  alt: string
}

// Form Props
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: FormData) => void
  loading?: boolean
}

// Language Props
export interface LanguageProps extends BaseComponentProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

// Animation Props
export interface AnimationProps extends BaseComponentProps {
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

// SEO Props
export interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form Data Types
export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface DemoRequestData {
  name: string
  email: string
  company: string
  teamSize: string
  useCase: string
}

// Theme Types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

// Localization Types
export interface Locale {
  code: string
  name: string
  flag: string
}

// Analytics Types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: number
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
} 