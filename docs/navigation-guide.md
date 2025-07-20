# Guía del Navegador - heynori! Landing Page

## Funcionalidades Implementadas

### 1. Navegación por Secciones
El navegador permite desplazarse suavemente a las siguientes secciones:

- **Problemas** (`#problems`) - Sección que describe los problemas comunes
- **Cómo Funciona** (`#como-funciona`) - Explicación de la solución
- **Beneficios** (`#benefits`) - Ventajas de usar heynori!
- **Integraciones** (`#integrations`) - Herramientas compatibles
- **Contacto** (`#contact`) - Formulario de contacto

### 2. Características del Navegador

#### Desktop
- Navegación horizontal con enlaces a todas las secciones
- Botón "Solicitar Acceso" que lleva a la sección de contacto
- Selector de idioma (ES/EN)
- Logo clickeable que lleva al inicio

#### Móvil
- Menú hamburguesa que se expande/colapsa
- Navegación vertical en el menú móvil
- Mismo botón "Solicitar Acceso" y selector de idioma
- Cierre automático del menú al hacer clic en un enlace

### 3. Scroll Suave
- Implementado con `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Funciona tanto en desktop como móvil
- Logs de debug para verificar que las secciones se encuentran correctamente

### 4. Efectos Visuales
- Navegador transparente al inicio, con fondo al hacer scroll
- Animaciones suaves con Framer Motion
- Transiciones de color en hover
- Backdrop blur para mejor legibilidad

## Estructura de Archivos

```
src/components/organisms/Navigation/
├── Navigation.tsx          # Componente principal
├── index.ts               # Exportación
└── Navigation.test.tsx    # Tests (pendiente)
```

## Traducciones

### Español (es.json)
```json
{
  "nav": {
    "problemas": "Problemas",
    "como-funciona": "Cómo Funciona", 
    "beneficios": "Beneficios",
    "integraciones": "Integraciones",
    "contacto": "Contacto",
    "solicitar-acceso": "Solicitar Acceso"
  }
}
```

### Inglés (en.json)
```json
{
  "nav": {
    "problemas": "Problems",
    "como-funciona": "How it Works",
    "beneficios": "Benefits", 
    "integraciones": "Integrations",
    "contacto": "Contact",
    "solicitar-acceso": "Request Access"
  }
}
```

## IDs de Secciones

Asegúrate de que las secciones en `App.tsx` tengan estos IDs exactos:

```tsx
<Problem id="problems" />
<Solution id="como-funciona" />
<Benefits id="benefits" />
<Integrations id="integrations" />
<CTA id="cta" />
<Contact id="contact" />
```

## Debugging

El navegador incluye logs de debug que aparecen en la consola del navegador:

- `Navigating to section: [sectionId]` - Cuando se hace clic en un enlace
- `Section found, scrolling to: [sectionId]` - Cuando la sección existe
- `Section not found: [sectionId]` - Cuando la sección no existe

## Próximos Pasos

1. **Tests**: Implementar tests unitarios y de integración
2. **Accesibilidad**: Agregar atributos ARIA y navegación por teclado
3. **Performance**: Optimizar re-renders y animaciones
4. **Analytics**: Trackear clics en navegación

## Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm run test

# Linting
npm run lint
``` 