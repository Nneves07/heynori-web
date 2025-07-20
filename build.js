import { build } from 'vite'
import { copyFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function buildApp() {
  try {
    // Build the application
    await build()
    
    // Copy CNAME file to dist directory
    const cnameSource = join(__dirname, 'CNAME')
    const cnameDest = join(__dirname, 'dist', 'CNAME')
    
    // Copy favicon to dist directory
    const faviconSource = join(__dirname, 'public', 'favicon.svg')
    const faviconDest = join(__dirname, 'dist', 'favicon.svg')
    
    // Copy _headers file to dist directory
    const headersSource = join(__dirname, 'public', '_headers')
    const headersDest = join(__dirname, 'dist', '_headers')
    
    // Copy _redirects file to dist directory
    const redirectsSource = join(__dirname, 'public', '_redirects')
    const redirectsDest = join(__dirname, 'dist', '_redirects')
    
    await copyFile(cnameSource, cnameDest)
    await copyFile(faviconSource, faviconDest)
    await copyFile(headersSource, headersDest)
    await copyFile(redirectsSource, redirectsDest)
    
    console.log('✅ Build completed successfully')
    console.log('✅ CNAME file copied to dist directory')
    console.log('✅ Favicon copied to dist directory')
    console.log('✅ Headers file copied to dist directory')
    console.log('✅ Redirects file copied to dist directory')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

buildApp() 