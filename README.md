# Heynori Web - Landing Page Moderna

Landing page moderna para Heynori, construida con React, TypeScript, Tailwind CSS y Vite.

## 🚀 Características

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **i18next** para internacionalización (ES/EN)
- **Vitest** para testing
- **Backend proxy** para formularios y emails

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd heynori-web
```

2. **Instalar dependencias del frontend**
```bash
npm install
```

3. **Instalar dependencias del servidor**
```bash
npm install --prefix ./server
```

4. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar `.env` con tus credenciales:
```env
# Baserow Configuration
BASEROW_TOKEN=your_baserow_token_here
BASEROW_TABLE_ID=your_table_id_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server Configuration
PORT=3001
```

## 🚀 Desarrollo

### Opción 1: Solo Frontend (sin backend)
```bash
npm run dev
```

### Opción 2: Frontend + Backend (recomendado)
```bash
npm run dev:full
```

Esto iniciará:
- Frontend en `http://localhost:3000`
- Backend en `http://localhost:3001`

### Opción 3: Servicios por separado
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

## 🏗️ Build

```bash
npm run build
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con UI
npm run test:ui

# Cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
heynori-web/
├── src/
│   ├── components/
│   │   ├── atoms/          # Componentes básicos
│   │   ├── molecules/      # Componentes compuestos
│   │   └── organisms/      # Componentes complejos
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utilidades
│   ├── types/              # Tipos TypeScript
│   ├── i18n/               # Traducciones
│   └── styles/             # Estilos globales
├── server.js               # Servidor proxy
├── package.json            # Dependencias frontend
├── package-server.json     # Dependencias servidor
└── env.example             # Variables de entorno
```

## 🔧 Configuración del Backend

El servidor proxy maneja:

1. **Formularios de contacto** - Guarda en Baserow
2. **Notificaciones por email** - Envía a hello@heynori.ai y email registrado
3. **CORS** - Evita problemas de cross-origin
4. **Validación** - Valida datos antes de procesar

### Configuración de Email (Gmail)

1. Habilitar autenticación de 2 factores
2. Generar contraseña de aplicación
3. Usar esa contraseña en `EMAIL_PASS`

## 🌐 Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Railway/Render/Vercel Functions)
```bash
npm run server
```

## 📝 Notas de Desarrollo

- **Formularios**: Usan el backend proxy para evitar CORS
- **Emails**: Se envían automáticamente a ambos destinatarios
- **Baserow**: Almacena todos los contactos
- **Validación**: Email corporativo y campos requeridos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Email**: hello@heynori.ai
- **Website**: https://heynori.ai 