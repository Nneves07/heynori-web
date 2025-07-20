import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Iniciando Heynori Web en modo desarrollo...\n');

// Iniciar servidor backend
console.log('📡 Iniciando servidor backend...');
const server = spawn('node', ['server.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

// Iniciar frontend
console.log('🌐 Iniciando frontend...');
const frontend = spawn('node', ['./node_modules/.bin/vite'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

// Manejar cierre de procesos
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando procesos...');
  server.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Cerrando procesos...');
  server.kill('SIGTERM');
  frontend.kill('SIGTERM');
  process.exit(0);
});

// Manejar errores
server.on('error', (error) => {
  console.error('❌ Error en servidor:', error);
});

frontend.on('error', (error) => {
  console.error('❌ Error en frontend:', error);
}); 