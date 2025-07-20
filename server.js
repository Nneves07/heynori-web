import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    baserow: {
      token: process.env.BASEROW_TOKEN ? '✅ Configurado' : '❌ No configurado',
      dbId: process.env.BASEROW_DB_ID ? '✅ Configurado' : '❌ No configurado',
      tableId: process.env.BASEROW_TABLE_ID ? '✅ Configurado' : '❌ No configurado'
    }
  })
})

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body
    console.log('Datos recibidos:', formData)

    // Validar variables de entorno de Baserow
    if (!process.env.BASEROW_TOKEN || !process.env.BASEROW_DB_ID || !process.env.BASEROW_TABLE_ID) {
      console.error('❌ Variables de entorno de Baserow no configuradas:')
      console.error('BASEROW_TOKEN:', process.env.BASEROW_TOKEN ? '✅' : '❌')
      console.error('BASEROW_DB_ID:', process.env.BASEROW_DB_ID ? '✅' : '❌')
      console.error('BASEROW_TABLE_ID:', process.env.BASEROW_TABLE_ID ? '✅' : '❌')
      
      return res.status(500).json({ 
        success: false, 
        error: 'Configuración de Baserow incompleta',
        details: {
          token: !!process.env.BASEROW_TOKEN,
          dbId: !!process.env.BASEROW_DB_ID,
          tableId: !!process.env.BASEROW_TABLE_ID
        }
      })
    }

    // Guardar en Baserow
    const baserowData = {
      "Name": formData.name,
      "Email": formData.email,
      "Company": formData.company,
      "Industry": formData.role, // Mapear industry a role
      "Team Size": formData.team_size,
      "Stack": formData.tech_stack.map(stack => {
        // Mapear los valores del frontend a los valores exactos esperados por Baserow
        const stackMapping = {
          'project': 'project_management',
          'communication': 'communication',
          'development': 'development',
          'productivity': 'project_management', // Usar valor que funciona
          'business': 'project_management', // Usar valor que funciona
          'crm': 'project_management', // Usar valor que funciona
          'marketing': 'marketing',
          'design': 'project_management', // Usar valor que funciona
          'analytics': 'analytics',
          'others': 'other'
        }
        const mappedValue = stackMapping[stack]
        if (!mappedValue) {
          console.warn(`⚠️ Valor no mapeado: ${stack}, usando project_management`)
          return 'project_management'
        }
        return mappedValue
      }).filter(value => value), // Filtrar valores vacíos
      "Message": formData.message || formData.use_case || '', // Cambiar de "Use Case" a "Message"
      "Created At": new Date().toISOString() // Agregar fecha actual en formato ISO
    }

    // Si hay valores que no funcionan, usar valores por defecto
    if (baserowData.Stack.length === 0) {
      baserowData.Stack = ['project_management']
      console.log('⚠️ No se seleccionaron herramientas válidas, usando valor por defecto')
    }

    console.log('Enviando a Baserow:', baserowData)
    console.log('URL Baserow:', `https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`)

    const baserowResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(baserowData)
    })

    if (!baserowResponse.ok) {
      const errorText = await baserowResponse.text()
      console.error('Error Baserow:', errorText)
      throw new Error(`Error al guardar en Baserow: ${baserowResponse.status}`)
    }

    const baserowResult = await baserowResponse.json()
    console.log('✅ Datos guardados en Baserow:', baserowResult)

    // Enviar email (opcional - solo si tienes configuración de email)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        })

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'contact@heynori.ai',
          subject: `Nueva solicitud de demo - ${formData.company}`,
          html: `
            <h2>Nueva solicitud de demo</h2>
            <p><strong>Nombre:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Empresa:</strong> ${formData.company}</p>
            <p><strong>Rol:</strong> ${formData.role}</p>
            <p><strong>Tamaño del equipo:</strong> ${formData.team_size}</p>
            <p><strong>Stack tecnológico:</strong> ${formData.tech_stack.join(', ')}</p>
            <p><strong>Mensaje:</strong> ${formData.message || ''}</p>
          `
        }

        await transporter.sendMail(mailOptions)
        console.log('✅ Email enviado correctamente')
      } catch (emailError) {
        console.error('⚠️ Error al enviar email:', emailError)
        // No fallamos por error de email, solo lo registramos
      }
    } else {
      console.log('ℹ️ Email no configurado, saltando envío de email')
    }

    res.json({ 
      success: true, 
      message: 'Solicitud enviada correctamente',
      baserowId: baserowResult.id
    })

  } catch (error) {
    console.error('Error en el servidor:', error)
    res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor proxy ejecutándose en puerto ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  
  // Verificar configuración al iniciar
  console.log('\n📋 Configuración de Baserow:')
  console.log('BASEROW_TOKEN:', process.env.BASEROW_TOKEN ? '✅ Configurado' : '❌ No configurado')
  console.log('BASEROW_DB_ID:', process.env.BASEROW_DB_ID ? '✅ Configurado' : '❌ No configurado')
  console.log('BASEROW_TABLE_ID:', process.env.BASEROW_TABLE_ID ? '✅ Configurado' : '❌ No configurado')
  
  if (!process.env.BASEROW_TOKEN || !process.env.BASEROW_DB_ID || !process.env.BASEROW_TABLE_ID) {
    console.log('\n⚠️ ADVERTENCIA: Variables de entorno de Baserow incompletas')
    console.log('   El formulario no funcionará correctamente')
  }
}) 