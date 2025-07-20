import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://heynori.ai', 'https://www.heynori.ai'],
  credentials: true
}));
app.use(express.json());

// Endpoint para procesar el formulario
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    console.log('Datos recibidos:', formData);

    // Guardar en Baserow
    const baserowResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${process.env.BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BASEROW_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        team_size: formData.team_size,
        tech_stack: formData.tech_stack,
        use_case: formData.use_case,
        message: formData.message
      })
    });

    if (!baserowResponse.ok) {
      console.error('Error Baserow:', await baserowResponse.text());
      throw new Error('Error al guardar en Baserow');
    }

    const baserowData = await baserowResponse.json();
    console.log('Datos guardados en Baserow:', baserowData);

    res.json({ 
      success: true, 
      message: 'Formulario enviado correctamente',
      baserowId: baserowData.id 
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor proxy ejecutándose en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 