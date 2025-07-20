# Configuración de GitHub Pages

## Configuración del Repositorio

Para que el deployment a GitHub Pages funcione correctamente, necesitas configurar los siguientes elementos:

### 1. Habilitar GitHub Pages

1. Ve a **Settings** > **Pages** en tu repositorio
2. En **Source**, selecciona **GitHub Actions**
3. Esto permitirá que el workflow de GitHub Actions despliegue automáticamente

### 2. Configurar Permisos del Workflow

El workflow ya está configurado con los permisos correctos:
- `contents: read` - Para leer el código
- `pages: write` - Para escribir en GitHub Pages
- `id-token: write` - Para autenticación

### 3. Configurar el Ambiente (Opcional pero Recomendado)

1. Ve a **Settings** > **Environments**
2. Crea un nuevo ambiente llamado `github-pages`
3. Esto proporcionará una capa adicional de seguridad

### 4. Dominio Personalizado

El archivo `CNAME` ya está configurado con `heynori.ai`. Para que funcione:

1. Asegúrate de que el dominio `heynori.ai` apunte a tu repositorio de GitHub
2. En **Settings** > **Pages**, verifica que el dominio personalizado esté configurado
3. Marca la opción "Enforce HTTPS" si está disponible

## Workflow de CI/CD

El workflow está configurado para:

1. **Test**: Ejecutar type-check, linting y tests
2. **Build**: Construir la aplicación y copiar el archivo CNAME
3. **Deploy**: Desplegar a GitHub Pages usando las acciones oficiales

### Archivos Importantes

- `.github/workflows/ci.yml` - Configuración del workflow
- `CNAME` - Dominio personalizado
- `build.js` - Script de build personalizado que copia el CNAME

## Solución de Problemas

### Error 403 - Permission Denied

Si ves este error, verifica:
1. Que GitHub Pages esté habilitado con **GitHub Actions** como fuente
2. Que el repositorio tenga permisos de escritura en la rama `gh-pages`
3. Que el workflow tenga los permisos correctos configurados

### Dominio No Funciona

Si el dominio personalizado no funciona:
1. Verifica que el DNS esté configurado correctamente
2. Asegúrate de que el archivo CNAME esté en el directorio raíz del build
3. Espera hasta 24 horas para que los cambios de DNS se propaguen

## Verificación

Para verificar que todo funciona:

1. Haz un push a la rama `main`
2. Ve a **Actions** para ver el progreso del workflow
3. Una vez completado, visita `https://heynori.ai` para verificar el deployment

## Notas Importantes

- El deployment solo ocurre en pushes a la rama `main`
- Los pull requests ejecutan solo tests, no deployment
- El archivo CNAME se copia automáticamente durante el build
- El workflow usa las acciones oficiales de GitHub para mayor confiabilidad 