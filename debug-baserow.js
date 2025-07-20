import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '.env') })

console.log('🔍 Debug Baserow - Estructura de Tabla')
console.log('=====================================')
console.log('')

// Verificar configuración
if (!process.env.BASEROW_TOKEN || !process.env.BASEROW_DB_ID || !process.env.BASEROW_TABLE_ID) {
  console.log('❌ Variables de entorno de Baserow no configuradas')
  process.exit(1)
}

console.log('📋 Configuración:')
console.log('Token:', process.env.BASEROW_TOKEN.substring(0, 10) + '...')
console.log('DB ID:', process.env.BASEROW_DB_ID)
console.log('Table ID:', process.env.BASEROW_TABLE_ID)
console.log('')

async function debugBaserow() {
  try {
    // 1. Obtener información de la tabla
    console.log('🔍 1. Obteniendo información de la tabla...')
    const tableResponse = await fetch(`https://api.baserow.io/api/database/tables/${process.env.BASEROW_TABLE_ID}/`, {
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`
      }
    })

    if (!tableResponse.ok) {
      console.error('❌ Error al obtener información de la tabla:', tableResponse.status)
      const errorText = await tableResponse.text()
      console.error('Error:', errorText)
      return
    }

    const tableInfo = await tableResponse.json()
    console.log('✅ Información de la tabla obtenida')
    console.log('Nombre de la tabla:', tableInfo.name)
    console.log('')

    // 2. Obtener campos de la tabla
    console.log('🔍 2. Obteniendo campos de la tabla...')
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
    console.log('✅ Campos de la tabla:')
    fields.forEach(field => {
      console.log(`  - ${field.name} (${field.type}) - ID: ${field.id}`)
    })
    console.log('')

    // 3. Obtener registros existentes
    console.log('🔍 3. Obteniendo registros existentes...')
    const rowsResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`
      }
    })

    if (!rowsResponse.ok) {
      console.error('❌ Error al obtener registros:', rowsResponse.status)
      const errorText = await rowsResponse.text()
      console.error('Error:', errorText)
      return
    }

    const rows = await rowsResponse.json()
    console.log(`✅ Registros encontrados: ${rows.results.length}`)
    
    if (rows.results.length > 0) {
      console.log('📋 Último registro:')
      const lastRow = rows.results[rows.results.length - 1]
      Object.entries(lastRow).forEach(([key, value]) => {
        console.log(`  ${key}:`, value)
      })
    }
    console.log('')

    // 4. Probar creación de un registro de prueba
    console.log('🔍 4. Probando creación de registro...')
    const testData = {
      "Name": "Test User",
      "Email": "test@example.com",
      "Company": "Test Company",
      "Industry": "Technology",
      "Team Size": "1-10",
      "Stack": ["project", "crm"],
      "Message": "Test message"
    }

    console.log('📤 Enviando datos de prueba:', testData)

    const createResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })

    if (!createResponse.ok) {
      console.error('❌ Error al crear registro:', createResponse.status)
      const errorText = await createResponse.text()
      console.error('Error:', errorText)
      return
    }

    const createdRow = await createResponse.json()
    console.log('✅ Registro de prueba creado:')
    Object.entries(createdRow).forEach(([key, value]) => {
      console.log(`  ${key}:`, value)
    })

  } catch (error) {
    console.error('❌ Error general:', error)
  }
}

debugBaserow() 