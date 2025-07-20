import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

async function testBusiness() {
  console.log('🧪 Probando valor "business"...')
  console.log('==============================')
  console.log('')
  
  const testData = {
    "Name": "Test User",
    "Email": "test@example.com",
    "Company": "Test Company",
    "Industry": "Technology",
    "Team Size": "1-10",
    "Stack": ["productivity"],
    "Message": "Test message"
  }

  console.log('📤 Enviando:', testData)
  console.log('')

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
      const result = await response.json()
      console.log('✅ ÉXITO: "business" funciona')
      console.log('📋 Resultado:', result)
    } else {
      const errorText = await response.text()
      console.log('❌ ERROR:', errorText)
    }
  } catch (error) {
    console.error('❌ Error de red:', error)
  }
}

testBusiness() 