import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

async function testWorking() {
  // Usar solo los valores que sabemos que funcionan
  const workingValues = ['project_management', 'communication', 'development', 'marketing', 'analytics', 'other']
  
  console.log('🧪 Probando con valores que funcionan...')
  console.log('=======================================')
  console.log('')
  
  for (const value of workingValues) {
    console.log(`📤 Probando: ${value}`)
    
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
        console.log(`❌ ${value} - NO FUNCIONA: ${errorText}`)
      }
    } catch (error) {
      console.log(`❌ ${value} - ERROR: ${error.message}`)
    }
    
    console.log('')
  }
}

testWorking() 