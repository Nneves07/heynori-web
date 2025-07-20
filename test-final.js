import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

async function testFinal() {
  // Simular los datos que enviaría el formulario
  const formData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    role: 'Technology',
    team_size: '11-50',
    tech_stack: ['productivity', 'business'],
    message: 'Test message'
  }

  console.log('🧪 Test Final - Simulando envío del formulario')
  console.log('=============================================')
  console.log('')
  console.log('📤 Datos del formulario:', formData)
  console.log('')

  // Aplicar el mismo mapeo que usa el servidor
  const stackMapping = {
    'project': 'project_management',
    'communication': 'communication',
    'development': 'development',
    'productivity': 'productivity_tools',
    'business': 'business_tools',
    'crm': 'crm_sales',
    'marketing': 'marketing',
    'design': 'design_product',
    'analytics': 'analytics',
    'others': 'other'
  }

  const mappedStack = formData.tech_stack.map(stack => {
    const mappedValue = stackMapping[stack]
    if (!mappedValue) {
      console.warn(`⚠️ Valor no mapeado: ${stack}, usando valor original`)
      return stack
    }
    return mappedValue
  }).filter(value => value)

  const baserowData = {
    "Name": formData.name,
    "Email": formData.email,
    "Company": formData.company,
    "Industry": formData.role,
    "Team Size": formData.team_size,
    "Stack": mappedStack,
    "Message": formData.message
  }

  console.log('📤 Datos mapeados para Baserow:', baserowData)
  console.log('')

  try {
    const response = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(baserowData)
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ ÉXITO: Datos guardados correctamente')
      console.log('📋 Resultado:', result)
    } else {
      const errorText = await response.text()
      console.log('❌ ERROR:', errorText)
    }
  } catch (error) {
    console.error('❌ Error de red:', error)
  }
}

testFinal() 