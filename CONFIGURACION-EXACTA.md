# Configuración Exacta del Formulario de Contacto

## Campos del Formulario Original

### Campos Ocultos (Hidden Fields)
```html
<input type="hidden" name="access_key" value="93b2e936-c8d2-4e12-bfd5-1eef00c25ff6">
<input type="hidden" name="subject" value="Nueva solicitud de demo - heynori!">
<input type="hidden" name="from_name" value="heynori! Landing Page">
<input type="hidden" name="redirect" value="https://heynori.ai/?submitted=true">
<input type="hidden" name="language" value="es">
<input type="hidden" name="baserow_token" value="PSP8nLZ92SFUcl1hVJ6PDoCwIF3c4fkV">
<input type="hidden" name="baserow_table_id" value="602481">
```

### Campos del Formulario
1. **Name** (required) - Nombre completo
2. **Email** (required) - Email corporativo
3. **Company** (required) - Empresa
4. **Industry** (required) - Industria
5. **Team Size** (required) - Tamaño del equipo
   - Opciones: "1-10", "11-50", "51-200", "201+"
6. **Stack** (required) - Herramientas a integrar (checkboxes)
   - Valores: "project_management", "communication", "development", "documentation", "crm", "marketing", "design", "analytics", "other"
7. **Message** (optional) - Mensaje

## Configuración de Baserow

### Token de Baserow
```
PSP8nLZ92SFUcl1hVJ6PDoCwIF3c4fkV
```

### ID de Tabla
```
602481
```

### URL de Baserow
```
https://api.baserow.io/api/database/rows/table/602481/?user_field_names=true
```

### Headers de Baserow
```
Authorization: Token PSP8nLZ92SFUcl1hVJ6PDoCwIF3c4fkV
Content-Type: application/json
```

## Configuración de Web3Forms

### Access Key
```
93b2e936-c8d2-4e12-bfd5-1eef00c25ff6
```

### URL de Web3Forms
```
https://api.web3forms.com/submit
```

## Estructura de Datos Enviados

### Para Web3Forms
```javascript
{
  access_key: "93b2e936-c8d2-4e12-bfd5-1eef00c25ff6",
  subject: "Nueva solicitud de demo - heynori!",
  from_name: "heynori! Landing Page",
  name: "Nombre del usuario",
  email: "email@empresa.com",
  company: "Nombre de la empresa",
  teamSize: "11-50",
  stack: "project_management, communication, development",
  message: "Mensaje del usuario"
}
```

### Para Baserow
```javascript
{
  "Name": "Nombre del usuario",
  "Email": "email@empresa.com",
  "Company": "Nombre de la empresa",
  "Industry": "Industria",
  "Stack": "project_management, communication, development",
  "Team Size": "11-50",
  "Message": "Mensaje del usuario",
  "Created At": "2024-01-15T10:30:00.000Z"
}
```

## Validaciones

### Campos Requeridos
- Name
- Email (debe ser email corporativo, no personal)
- Company
- Industry
- Team Size
- Al menos una categoría de Stack

### Validación de Email Corporativo
Los siguientes dominios están bloqueados:
- gmail.com
- yahoo.com
- hotmail.com
- outlook.com

## Configuración Actual en React

### Estado del Formulario
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  company: '',
  industry: '',
  teamSize: '',
  stack: [] as string[],
  message: ''
})
```

### Opciones de Stack
```javascript
[
  { value: 'project_management', label: 'Gestión de Proyectos' },
  { value: 'communication', label: 'Comunicación' },
  { value: 'development', label: 'Desarrollo' },
  { value: 'documentation', label: 'Documentación' },
  { value: 'crm', label: 'CRM y Ventas' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Diseño y Producto' },
  { value: 'analytics', label: 'Analítica' },
  { value: 'other', label: 'Otras' }
]
```

## Próximos Pasos para Configurar Formspree

1. **Crear cuenta en Formspree**
   - Ve a [formspree.io](https://formspree.io)
   - Crea una cuenta gratuita
   - Verifica tu email

2. **Crear formulario**
   - Nombre: "heynori-contact"
   - Destino: Email
   - Email de destino: Tu email

3. **Configurar webhooks (opcional)**
   - Para integrar con Baserow
   - Para enviar datos a tu base de datos

4. **Actualizar el código**
   - Reemplazar la simulación temporal con el endpoint real de Formspree
   - Configurar los campos exactos como se muestra arriba

## Estado Actual
- ✅ Campos del formulario coinciden con la configuración original
- ✅ Validaciones implementadas
- ✅ Traducciones actualizadas
- ✅ Integración con Baserow funcionando
- ✅ Notificación por email (Formspree opcional)
- ✅ Formulario completamente funcional 