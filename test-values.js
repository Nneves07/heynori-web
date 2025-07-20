import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

async function testValues() {
  const possibleValues = [
    'project_management',
    'communication',
    'development',
    'productivity_tools',
    'business_tools',
    'crm_sales',
    'marketing_tools',
    'design_product',
    'analytics_tools',
    'other_tools',
    'productivity',
    'business',
    'marketing',
    'analytics',
    'other'
  ]

  console.log('🧪 Probando valores para el campo Stack...')
  console.log('==========================================')
  console.log('')

  for (const value of possibleValues) {
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
        console.log(`❌ ${value} - NO FUNCIONA`)
      }
    } catch (error) {
      console.log(`❌ ${value} - ERROR: ${error.message}`)
    }
    
    console.log('')
  }
}

testValues() 