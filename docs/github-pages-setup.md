# Configuración de GitHub Pages - Evitar Workflows Automáticos

## Problema
Aparecen 3 workflows ejecutándose simultáneamente:
1. "Deploy to GitHub Pages" (nuestro workflow)
2. "CI Pipeline" (nuestro workflow)
3. "pages build and deployment" (workflow automático de GitHub)

## Solución

### 1. Configuración en GitHub Settings

1. Ve a **Settings** → **Pages**
2. En **"Build and deployment"**:
   - Cambia **Source** de "GitHub Actions" a "Deploy from a branch"
   - Selecciona una rama (ej: `gh-pages`)
   - Guarda
   - Vuelve a cambiar a "GitHub Actions"
   - Selecciona tu workflow personalizado

### 2. Configuración de Branch Protection

1. Ve a **Settings** → **Branches**
2. Agrega regla para `main`:
   - ✅ "Require status checks to pass before merging"
   - ✅ "Require branches to be up to date before merging"
   - En "Status checks that are required":
     - Agrega "build-and-deploy" (de tu workflow)
     - Agrega "test" (de tu workflow CI)

### 3. Verificación

Después de la configuración, solo deberías ver:
- ✅ "Deploy to GitHub Pages"
- ✅ "CI Pipeline"
- ❌ "pages build and deployment" (ya no aparece)

## Workflows Esperados

### Deploy to GitHub Pages
- Se ejecuta en push a `main`
- Maneja build y deploy
- Usa concurrency para evitar conflictos

### CI Pipeline  
- Se ejecuta en push a `main`
- Maneja testing y verificación
- No interfiere con el deploy

## Beneficios
- ✅ Solo 2 workflows en lugar de 3
- ✅ Sin conflictos de artefactos
- ✅ Control total sobre el proceso de despliegue
- ✅ Mejor rendimiento y tiempo de ejecución 