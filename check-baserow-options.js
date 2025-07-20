import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '.env') })

console.log('🔍 Verificando opciones válidas de Baserow')
console.log('=========================================')
console.log('')

async function checkBaserowOptions() {
  try {
    // 1. Obtener campos de la tabla para ver las opciones del select
    console.log('🔍 Obteniendo campos de la tabla...')
    const fieldsResponse = await fetch(`https://api.baserow.io/api/database/fields/table/${process.env.BASEROW_TABLE_ID}/`, {
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`
      }
    })

    if (!fieldsResponse.ok) {
      console.error('❌ Error al obtener campos:', fieldsResponse.status)
      const errorText = await fieldsResponse.text()
      console.error('Error:', errorText)
      return
    }

    const fields = await fieldsResponse.json()
    console.log('✅ Campos obtenidos')
    
    // Buscar el campo Stack
    const stackField = fields.find(field => field.name === 'Stack')
    if (stackField) {
      console.log('\n📋 Campo Stack encontrado:')
      console.log('Tipo:', stackField.type)
      console.log('ID:', stackField.id)
      
      if (stackField.select_options) {
        console.log('\n🎯 Opciones válidas del campo Stack:')
        stackField.select_options.forEach(option => {
          console.log(`  - ${option.value} (ID: ${option.id}, Color: ${option.color})`)
        })
      } else {
        console.log('⚠️ No se encontraron opciones de select')
      }
    } else {
      console.log('❌ Campo Stack no encontrado')
    }

    // 2. Probar con diferentes valores para ver cuáles funcionan
    console.log('\n🧪 Probando diferentes valores...')
    
    const testValues = [
      'project_management',
      'communication', 
      'development',
      'productivity_tools',
      'business_tools',
      'crm_sales',
      'marketing_tools',
      'design_product',
      'analytics_tools',
      'other_tools'
    ]

    for (const value of testValues) {
      console.log(`\n📤 Probando: ${value}`)
      
      const testData = {
        "Name": "Test User",
        "Email": "test@example.com",
        "Company": "Test Company",
        "Industry": "Technology",
        "Team Size": "1-10",
        "Stack": [value],
        "Message": "Test message"
      }

      try {
        const response = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testData)
        })

        if (response.ok) {
          console.log(`✅ ${value} - FUNCIONA`)
        } else {
          const errorText = await response.text()
          console.log(`❌ ${value} - NO FUNCIONA:`, errorText)
        }
      } catch (error) {
        console.log(`❌ ${value} - ERROR:`, error.message)
      }
    }

  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

checkBaserowOptions() 