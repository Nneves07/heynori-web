# Configurar Formspree para el Formulario de Contacto

## Problema Actual
El formulario está simulando envío exitoso pero no está enviando realmente los datos a ningún servicio.

## Solución: Configurar Formspree

### 1. Crear cuenta en Formspree
1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Crear un nuevo formulario
1. En el dashboard de Formspree, haz clic en "New Form"
2. Dale un nombre como "heynori-contact"
3. Selecciona "Email" como destino
4. Agrega tu email donde quieres recibir las notificaciones

### 3. Obtener el endpoint
1. Una vez creado el formulario, copia el endpoint
2. Será algo como: `https://formspree.io/f/xpzgwqjq`
3. Este es el endpoint que necesitas usar en el código

### 4. Actualizar el código
Reemplaza la sección temporal en `Contact.tsx`:

```javascript
// TEMPORAL: Simular envío exitoso mientras configuramos Formspree
console.log('TEMP: Simulating successful submission while Formspree is configured')

// Simular delay de red
await new Promise(resolve => setTimeout(resolve, 1000))

// Mostrar datos en consola para verificación
console.log('Form data that would be sent:', {
  name: formData.name,
  email: formData.email,
  company: formData.company,
  industry: formData.industry,
  teamSize: formData.teamSize,
  tools: formData.tools,
  message: formData.message
})

setSubmitStatus('success')
// Limpiar formulario
setFormData({ 
  name: '', 
  email: '', 
  company: '', 
  industry: '', 
  teamSize: '', 
  tools: [], 
  message: '' 
})

// Redirigir después de 2 segundos
setTimeout(() => {
  window.location.href = 'https://heynori.ai/?submitted=true'
}, 2000)
```

Con el código real de Formspree:

```javascript
// Enviar a Formspree
const formDataToSend = new FormData()
formDataToSend.append('name', formData.name)
formDataToSend.append('email', formData.email)
formDataToSend.append('company', formData.company)
formDataToSend.append('industry', formData.industry)
formDataToSend.append('teamSize', formData.teamSize)
formDataToSend.append('tools', formData.tools.join(', '))
formDataToSend.append('message', formData.message)
formDataToSend.append('subject', 'Nueva solicitud de demo - heynori!')

const response = await fetch('TU_ENDPOINT_DE_FORMSPREE_AQUI', {
  method: 'POST',
  body: formDataToSend,
  headers: {
    'Accept': 'application/json'
  }
})

console.log('Formspree response status:', response.status)

if (response.ok) {
  const result = await response.json()
  console.log('Formspree response:', result)
  
  if (result.ok) {
    setSubmitStatus('success')
    // Limpiar formulario
    setFormData({ 
      name: '', 
      email: '', 
      company: '', 
      industry: '', 
      teamSize: '', 
      tools: [], 
      message: '' 
    })
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      window.location.href = 'https://heynori.ai/?submitted=true'
    }, 2000)
  } else {
    throw new Error('Error en el envío del formulario')
  }
} else {
  const errorText = await response.text()
  console.error('Formspree error response:', errorText)
  throw new Error(`HTTP ${response.status}: ${errorText}`)
}
```

### 5. Probar el formulario
1. Una vez configurado, prueba el formulario
2. Verifica que recibas el email
3. Revisa la consola del navegador para logs

### 6. Configuración adicional (opcional)
- **Webhooks**: Puedes configurar webhooks para enviar datos a tu base de datos
- **Integración con Baserow**: Formspree puede integrarse con Baserow via webhooks
- **Filtros de spam**: Formspree tiene protección anti-spam integrada

## Estado Actual
- ✅ Formulario funcional en desarrollo
- ✅ Simulación de envío exitoso
- ⏳ Pendiente: Configurar Formspree real
- ⏳ Pendiente: Integrar con base de datos

## Próximos Pasos
1. Configurar Formspree siguiendo las instrucciones arriba
2. Probar envío real de emails
3. Configurar integración con base de datos si es necesario
4. Desplegar en producción 