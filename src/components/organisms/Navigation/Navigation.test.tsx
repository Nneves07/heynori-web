import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'
import Navigation from './Navigation'

// Mock de las funciones de scroll
const mockScrollIntoView = vi.fn()
Object.defineProperty(window, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true
})

// Mock de getElementById
const mockGetElementById = vi.fn()
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
})

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockScrollIntoView.mockClear()
    mockGetElementById.mockClear()
  })

  const renderNavigation = (props = {}) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Navigation {...props} />
      </I18nextProvider>
    )
  }

  it('renderiza correctamente con todos los enlaces de navegación', () => {
    renderNavigation()
    
    // Verificar que todos los enlaces estén presentes
    expect(screen.getByText('Problems')).toBeInTheDocument()
    expect(screen.getByText('How it Works')).toBeInTheDocument()
    expect(screen.getByText('Benefits')).toBeInTheDocument()
    expect(screen.getByText('Integrations')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('maneja clics en enlaces de navegación correctamente', () => {
    const mockElement = { scrollIntoView: mockScrollIntoView }
    mockGetElementById.mockReturnValue(mockElement)
    
    renderNavigation()
    
    // Hacer clic en un enlace
    const problemsLink = screen.getByText('Problems')
    fireEvent.click(problemsLink)
    
    // Verificar que se llamó a getElementById con el ID correcto
    expect(mockGetElementById).toHaveBeenCalledWith('problems')
    
    // Verificar que se llamó a scrollIntoView
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('maneja secciones no encontradas correctamente', () => {
    mockGetElementById.mockReturnValue(null)
    
    renderNavigation()
    
    // Hacer clic en un enlace
    const problemsLink = screen.getByText('Problems')
    fireEvent.click(problemsLink)
    
    // Verificar que se llamó a getElementById pero no a scrollIntoView
    expect(mockGetElementById).toHaveBeenCalledWith('problems')
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('renderiza el botón "Solicitar Acceso"', () => {
    renderNavigation()
    
    expect(screen.getByText('Request Access')).toBeInTheDocument()
  })

  it('maneja clic en el botón "Solicitar Acceso"', () => {
    const mockElement = { scrollIntoView: mockScrollIntoView }
    mockGetElementById.mockReturnValue(mockElement)
    
    renderNavigation()
    
    const requestButton = screen.getByText('Request Access')
    fireEvent.click(requestButton)
    
    // Verificar que se navega a la sección de contacto
    expect(mockGetElementById).toHaveBeenCalledWith('contact')
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('renderiza el logo correctamente', () => {
    renderNavigation()
    
    const logo = screen.getByAltText('heynori!')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/assets/images/heynori-logo.png')
  })

  it('aplica clases CSS correctas cuando se hace scroll', () => {
    renderNavigation()
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
  })

  it('maneja el estado del menú móvil', () => {
    const onToggle = vi.fn()
    renderNavigation({ isOpen: false, onToggle })
    
    // Buscar el botón del menú móvil
    const menuButton = screen.getByLabelText('Toggle menu')
    expect(menuButton).toBeInTheDocument()
    
    // Hacer clic en el botón
    fireEvent.click(menuButton)
    expect(onToggle).toHaveBeenCalled()
  })

  it('renderiza el menú móvil cuando está abierto', () => {
    renderNavigation({ isOpen: true })
    
    // Verificar que los enlaces del menú móvil estén presentes
    expect(screen.getAllByText('Problems')).toHaveLength(2) // Desktop + móvil
    expect(screen.getAllByText('How it Works')).toHaveLength(2)
    expect(screen.getAllByText('Benefits')).toHaveLength(2)
    expect(screen.getAllByText('Integrations')).toHaveLength(2)
    expect(screen.getAllByText('Contact')).toHaveLength(2)
  })

  it('cierra el menú móvil al hacer clic en un enlace', () => {
    const onToggle = vi.fn()
    const mockElement = { scrollIntoView: mockScrollIntoView }
    mockGetElementById.mockReturnValue(mockElement)
    
    renderNavigation({ isOpen: true, onToggle })
    
    // Hacer clic en un enlace del menú móvil
    const mobileLinks = screen.getAllByText('Problems')
    const mobileLink = mobileLinks[1] // El segundo es el del menú móvil
    fireEvent.click(mobileLink)
    
    // Verificar que se navega y se cierra el menú
    expect(mockScrollIntoView).toHaveBeenCalled()
    expect(onToggle).toHaveBeenCalled()
  })
}) 