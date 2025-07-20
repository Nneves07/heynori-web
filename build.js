import { build } from 'vite'
import { copyFile, mkdir } from 'fs/promises'
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
    
    // Ensure dist directory exists
    const distDir = join(__dirname, 'dist')
    
    // Copy CNAME file to dist directory
    const cnameSource = join(__dirname, 'CNAME')
    const cnameDest = join(__dirname, 'dist', 'CNAME')
    
    // Copy favicon to dist directory
    const faviconSource = join(__dirname, 'public', 'favicon.svg')
    const faviconDest = join(__dirname, 'dist', 'favicon.svg')
    
    // Copy _redirects file for SPA routing
    const redirectsSource = join(__dirname, 'public', '_redirects')
    const redirectsDest = join(__dirname, 'dist', '_redirects')
    
    // Copy _headers file for HTTP headers
    const headersSource = join(__dirname, 'public', '_headers')
    const headersDest = join(__dirname, 'dist', '_headers')
    
    // Copy assets directory if it exists
    const assetsSource = join(__dirname, 'assets')
    const assetsDest = join(__dirname, 'dist', 'assets')
    
    try {
      await copyFile(cnameSource, cnameDest)
      console.log('✅ CNAME file copied to dist directory')
    } catch (error) {
      console.warn('⚠️ CNAME file not found, skipping...')
    }
    
    try {
      await copyFile(faviconSource, faviconDest)
      console.log('✅ Favicon copied to dist directory')
    } catch (error) {
      console.warn('⚠️ Favicon not found in public/, trying assets/...')
      try {
        const altFaviconSource = join(__dirname, 'assets', 'images', 'favicon.svg')
        await copyFile(altFaviconSource, faviconDest)
        console.log('✅ Favicon copied from assets/images/')
      } catch (altError) {
        console.warn('⚠️ Favicon not found in assets/images/ either')
      }
    }
    
    try {
      await copyFile(redirectsSource, redirectsDest)
      console.log('✅ _redirects file copied to dist directory')
    } catch (error) {
      console.warn('⚠️ _redirects file not found, skipping...')
    }
    
    try {
      await copyFile(headersSource, headersDest)
      console.log('✅ _headers file copied to dist directory')
    } catch (error) {
      console.warn('⚠️ _headers file not found, skipping...')
    }
    
    console.log('✅ Build completed successfully')
    console.log('📁 Build output directory: dist/')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

buildApp() 