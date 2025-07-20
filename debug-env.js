import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '.env') })

console.log('🔍 Verificación de Variables de Entorno')
console.log('=====================================')
console.log('')

console.log('📁 Archivo .env cargado desde:', join(__dirname, '.env'))
console.log('')

console.log('🔧 Variables de Baserow:')
console.log('BASEROW_TOKEN:', process.env.BASEROW_TOKEN ? `✅ "${process.env.BASEROW_TOKEN.substring(0, 10)}..."` : '❌ No configurado')
console.log('BASEROW_DB_ID:', process.env.BASEROW_DB_ID ? `✅ "${process.env.BASEROW_DB_ID}"` : '❌ No configurado')
console.log('BASEROW_TABLE_ID:', process.env.BASEROW_TABLE_ID ? `✅ "${process.env.BASEROW_TABLE_ID}"` : '❌ No configurado')
console.log('')

console.log('🌐 Variables del Servidor:')
console.log('PORT:', process.env.PORT ? `✅ "${process.env.PORT}"` : '❌ No configurado (usará 3001)')
console.log('')

console.log('📧 Variables de Email:')
console.log('EMAIL_USER:', process.env.EMAIL_USER ? `✅ "${process.env.EMAIL_USER}"` : '❌ No configurado')
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `✅ "${process.env.EMAIL_PASS.substring(0, 5)}..."` : '❌ No configurado')
console.log('')

// Verificar si todas las variables de Baserow están configuradas
const baserowVars = ['BASEROW_TOKEN', 'BASEROW_DB_ID', 'BASEROW_TABLE_ID']
const missingVars = baserowVars.filter(varName => !process.env[varName])

if (missingVars.length === 0) {
  console.log('✅ Todas las variables de Baserow están configuradas correctamente')
} else {
  console.log('❌ Variables de Baserow faltantes:', missingVars.join(', '))
  console.log('')
  console.log('💡 Solución:')
  console.log('1. Verifica que el archivo .env existe en la raíz del proyecto')
  console.log('2. Asegúrate de que las variables estén escritas correctamente')
  console.log('3. No debe haber espacios alrededor del signo igual')
  console.log('4. Ejemplo correcto: BASEROW_TOKEN=tu_token_aqui')
}

console.log('')
console.log('🔗 Para probar la conexión con Baserow, ejecuta:')
console.log('node debug-baserow.js') 