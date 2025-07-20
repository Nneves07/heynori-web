import { build } from 'vite'
import { copyFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildApp() {
  try {
    console.log('🚀 Starting build process...')
    
    // Build the application
    await build()
    console.log('✅ Vite build completed')
    
    // Copy CNAME file to dist directory (not in public/)
    const cnameSource = join(__dirname, 'CNAME')
    const cnameDest = join(__dirname, 'dist', 'CNAME')
    
    // Copy vercel.json for headers and routing
    const vercelSource = join(__dirname, 'vercel.json')
    const vercelDest = join(__dirname, 'dist', 'vercel.json')
    
    try {
      await copyFile(cnameSource, cnameDest)
      console.log('✅ CNAME file copied to dist directory')
    } catch (error) {
      console.warn('⚠️ CNAME file not found, skipping...')
    }
    
    try {
      await copyFile(vercelSource, vercelDest)
      console.log('✅ vercel.json copied to dist directory')
    } catch (error) {
      console.warn('⚠️ vercel.json not found, skipping...')
    }
    
    console.log('✅ Build completed successfully')
    console.log('📁 Build output directory: dist/')
    console.log('📁 Public files copied automatically by Vite')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

buildApp() 