import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '.env') })

console.log('🧪 Test Baserow Connection')
console.log('=========================')
console.log('')

async function testBaserow() {
  try {
    // Probar obtención de registros existentes
    console.log('🔍 Obteniendo registros existentes...')
    const response = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`
      }
    })

    if (!response.ok) {
      console.error('❌ Error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      return
    }

    const data = await response.json()
    console.log('✅ Conexión exitosa!')
    console.log(`📊 Total de registros: ${data.results.length}`)
    
    if (data.results.length > 0) {
      console.log('\n📋 Campos disponibles en el último registro:')
      const lastRow = data.results[data.results.length - 1]
      Object.entries(lastRow).forEach(([key, value]) => {
        console.log(`  ${key}:`, typeof value === 'object' ? JSON.stringify(value) : value)
      })
    }

    // Probar creación de un registro de prueba
    console.log('\n🧪 Probando creación de registro...')
    const testData = {
      "Name": "Test User",
      "Email": "test@example.com", 
      "Company": "Test Company",
      "Industry": "Technology",
      "Team Size": "1-10",
      "Stack": ["project", "crm"],
      "Message": "Test message"
    }

    console.log('📤 Enviando:', testData)

    const createResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    if (!createResponse.ok) {
      console.error('❌ Error al crear:', createResponse.status)
      const errorText = await createResponse.text()
      console.error('Error details:', errorText)
      return
    }

    const createdRow = await createResponse.json()
    console.log('✅ Registro creado exitosamente!')
    console.log('📋 Datos guardados:')
    Object.entries(createdRow).forEach(([key, value]) => {
      console.log(`  ${key}:`, typeof value === 'object' ? JSON.stringify(value) : value)
    })

  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

testBaserow() 