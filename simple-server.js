import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'front', 'public')));

// Leer datos CSV
function loadPresasData() {
  try {
    const csvPath = path.join(__dirname, 'front', 'public', 'presas_canarias.csv');
    const csvText = fs.readFileSync(csvPath, 'utf8');
    
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        nombre: values[0] || '',
        isla: values[1] || '',
        cuenca: values[2] || '',
        barranco: values[3] || '',
        cotaMuro: parseFloat(values[4]) || 0,
        altura: parseFloat(values[5]) || 0,
        capacidad: parseFloat(values[6]) || 0,
        volumenMaximo: parseFloat(values[7]) || 0,
        fuente: values[10] || ''
      };
    }).filter(presa => presa.nombre);
    
    return data;
  } catch (error) {
    console.error('Error cargando datos:', error);
    return [];
  }
}

// Función para formatear capacidad
function formatCapacity(capacity) {
  if (capacity >= 1000000) {
    return `${(capacity / 1000000).toFixed(2)} hm³`;
  }
  return `${(capacity / 1000).toFixed(0)} mil m³`;
}

// Página principal
app.get('/', (req, res) => {
  const presas = loadPresasData();
  const topPresas = [...presas].sort((a, b) => b.capacidad - a.capacidad).slice(0, 5);
  const searchTerm = req.query.search || '';
  
  const filteredPresas = presas.filter(presa =>
    presa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    presa.cuenca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    presa.barranco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏝️ Presas de Canarias</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
            line-height: 1.6;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        
        /* Header */
        .header {
            text-align: center;
            margin-bottom: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        /* Stats Cards */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-card h3 {
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        .stat-card .value {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
        }
        .stat-blue { color: #4a90e2; }
        .stat-green { color: #50e3c2; }
        .stat-orange { color: #f5a623; }
        
        /* Top 5 */
        .top-section {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            margin-bottom: 40px;
        }
        .top-section h2 {
            color: #333;
            margin-bottom: 20px;
        }
        .top-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 4px solid;
        }
        .top-1 { border-left-color: #FFD700; }
        .top-2 { border-left-color: #C0C0C0; }
        .top-3 { border-left-color: #CD7F32; }
        .top-4 { border-left-color: #4a90e2; }
        .top-5 { border-left-color: #50e3c2; }
        
        /* Search */
        .search {
            margin-bottom: 30px;
        }
        .search input {
            width: 100%;
            padding: 15px;
            font-size: 1rem;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            outline: none;
            transition: border-color 0.3s ease;
        }
        .search input:focus {
            border-color: #4a90e2;
        }
        
        /* Presas Grid */
        .presas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        .presa-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .presa-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .presa-card h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        .presa-detail {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .presa-detail .label {
            color: #666;
        }
        .presa-detail .value {
            font-weight: bold;
        }
        .capacity-value {
            color: #4a90e2;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 30px;
            background: #333;
            color: white;
            border-radius: 12px;
        }
        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .header p { font-size: 1rem; }
            .presas-grid {
                grid-template-columns: 1fr;
            }
            .container { padding: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <h1>🏝️ Presas de Canarias</h1>
            <p>Información completa sobre las ${presas.length} presas de Gran Canaria</p>
        </header>

        <!-- Stats Cards -->
        <div class="stats">
            <div class="stat-card">
                <h3 class="stat-blue">Total Presas</h3>
                <div class="value">${presas.length}</div>
            </div>
            <div class="stat-card">
                <h3 class="stat-green">Capacidad Total</h3>
                <div class="value">${formatCapacity(presas.reduce((sum, presa) => sum + presa.capacidad, 0))}</div>
            </div>
            <div class="stat-card">
                <h3 class="stat-orange">Altura Promedio</h3>
                <div class="value">${Math.round(presas.reduce((sum, presa) => sum + presa.altura, 0) / presas.length)} m</div>
            </div>
        </div>

        <!-- Top 5 Presas -->
        <div class="top-section">
            <h2>🏆 Top 5 Presas por Capacidad</h2>
            ${topPresas.map((presa, index) => `
                <div class="top-item top-${index + 1}">
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold;">
                            ${index + 1}. ${presa.nombre}
                        </div>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                            ${presa.cuenca} - ${presa.barranco}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.1rem; font-weight: bold; color: #333;">
                            ${formatCapacity(presa.capacidad)}
                        </div>
                        <div style="font-size: 0.9rem; color: #666;">
                            ${presa.altura}m altura
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Search -->
        <div class="search">
            <form method="GET">
                <input type="text" name="search" placeholder="🔍 Buscar por nombre, cuenca o barranco..." value="${searchTerm}">
            </form>
        </div>

        <!-- Presas Grid -->
        <div class="presas-grid">
            ${filteredPresas.map(presa => `
                <div class="presa-card">
                    <h3>💧 ${presa.nombre}</h3>
                    
                    <div class="presa-detail">
                        <span class="label">🌊 Capacidad:</span>
                        <span class="value capacity-value">${formatCapacity(presa.capacidad)}</span>
                    </div>
                    
                    <div class="presa-detail">
                        <span class="label">📏 Altura:</span>
                        <span class="value">${presa.altura} m</span>
                    </div>
                    
                    ${presa.cuenca ? `
                    <div class="presa-detail">
                        <span class="label">🗺️ Cuenca:</span>
                        <span class="value">${presa.cuenca}</span>
                    </div>
                    ` : ''}
                    
                    ${presa.barranco ? `
                    <div class="presa-detail">
                        <span class="label">🏔️ Barranco:</span>
                        <span class="value">${presa.barranco}</span>
                    </div>
                    ` : ''}
                    
                    ${presa.cotaMuro > 0 ? `
                    <div class="presa-detail">
                        <span class="label">📍 Cota Muro:</span>
                        <span class="value">${presa.cotaMuro} m</span>
                    </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>

        <!-- Footer -->
        <footer class="footer">
            <p style="margin-bottom: 10px;">
                📊 Datos extraídos del <a href="https://www.aguasgrancanaria.com/presas/ubicacion_presas.php" target="_blank">
                    Consejo Insular de Aguas de Gran Canaria
                </a>
            </p>
            <p style="opacity: 0.7; font-size: 0.9rem;">
                Proyecto desarrollado con ❤️ para la gestión y visualización de presas canarias
            </p>
            <p style="margin-top: 10px; font-size: 0.8rem; opacity: 0.6;">
                Datos actualizados cada hora automáticamente
            </p>
        </footer>
    </div>

    <script>
        // Auto-submit search on typing
        const searchInput = document.querySelector('input[name="search"]');
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.form.submit();
            }, 500);
        });
    </script>
</body>
</html>
  `;
  
  res.send(html);
});

// API endpoint para datos JSON
app.get('/api/presas', (req, res) => {
  const presas = loadPresasData();
  res.json(presas);
});

app.listen(PORT, () => {
  console.log('🏝️  SERVIDOR DE PRESAS CANARIAS');
  console.log('===============================');
  console.log(`🌐 Frontend disponible en: http://localhost:${PORT}`);
  console.log(`📊 API JSON disponible en: http://localhost:${PORT}/api/presas`);
  console.log(`📋 Total de presas cargadas: ${loadPresasData().length}`);
  console.log('');
  console.log('🔄 Para actualizar datos: npm run update-presas');
  console.log('🛑 Para detener: Ctrl+C');
});