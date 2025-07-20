# Solución: Error de Artefactos Duplicados en GitHub Pages

## Problema
El error `Multiple artifacts named "github-pages" were unexpectedly found for this workflow run. Artifact count is 2` indica que hay múltiples artefactos con el mismo nombre, causando conflictos en el despliegue.

## Causa Raíz
- Múltiples ejecuciones simultáneas del workflow
- Artefactos residuales de ejecuciones anteriores
- Configuración de concurrency insuficiente

## Solución Implementada

### 1. Separación de Workflows
- **`ci.yml`**: Maneja testing y building
- **`deploy.yml`**: Maneja exclusivamente el despliegue

### 2. Mejoras en Concurrency
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true  # Cancela ejecuciones en progreso
```

### 3. Actualización de Versiones
- `actions/upload-pages-artifact@v4` (antes v3)
- `actions/deploy-pages@v4`

### 4. Eliminación de Artefactos Intermedios
- Removido `actions/upload-artifact` del workflow principal
- Build y deploy en un solo job para evitar transferencias

## Workflows Resultantes

### CI Pipeline (`ci.yml`)
- ✅ Testing (lint, type-check, tests)
- ✅ Building (verificación de output)
- ❌ No maneja despliegue

### Deploy Pipeline (`deploy.yml`)
- ✅ Build y deploy en un solo job
- ✅ Concurrency controlado
- ✅ Sin artefactos intermedios

## Beneficios
1. **Eliminación de conflictos**: No hay artefactos duplicados
2. **Mejor rendimiento**: Build y deploy optimizados
3. **Separación de responsabilidades**: CI y CD independientes
4. **Facilidad de debugging**: Workflows más simples

## Próximos Pasos
1. Commit y push de los cambios
2. Verificar que el despliegue funcione correctamente
3. Monitorear futuras ejecuciones del workflow 