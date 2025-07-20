import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

async function testSimple() {
  // Probar con los valores que sabemos que funcionan del test anterior
  const testData = {
    "Name": "Test User",
    "Email": "test@example.com",
    "Company": "Test Company",
    "Industry": "Technology",
    "Team Size": "1-10",
    "Stack": ["productivity_tools", "business_tools"],
    "Message": "Test message"
  }

  console.log('📤 Enviando:', testData)

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
      console.log('✅ Éxito:', result)
    } else {
      const errorText = await response.text()
      console.log('❌ Error:', errorText)
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

testSimple() 