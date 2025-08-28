# 🏝️ Embalse Info - Presas de Canarias

Proyecto completo para gestión y visualización de información sobre presas canarias, incluyendo web scraping automatizado, frontend moderno y asistente inteligente powered by Claude.

## 🚀 Características Principales

### 📊 Dashboard Interactivo
- **72 presas de Gran Canaria** con datos completos
- **Estadísticas en tiempo real**: capacidad total, altura promedio
- **Buscador inteligente** por nombre, cuenca o barranco
- **Top 5 ranking** de presas por capacidad
- **Diseño responsivo** para móviles y desktop

### 🤖 Asistente Inteligente Claude
- **Chat flotante** integrado con Claude de Anthropic
- **Consultas en lenguaje natural** sobre las presas
- **Respuestas contextualizadas** con datos reales
- **Interfaz conversacional** moderna y amigable

### 🔧 Web Scraping Automatizado
- **Scraper robusto** para múltiples fuentes
- **Exportación a CSV** con datos estructurados
- **Arquitectura escalable** para futuras expansiones
- **Integración automática** con el frontend

## 📁 Estructura del Proyecto

```
embalse-info/
├── front/                          # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/claude/         # API de Claude
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx            # Dashboard principal
│   │   └── components/
│   │       └── ClaudeChat.tsx      # Componente de chat
│   ├── public/
│   │   └── presas_canarias.csv     # Datos de presas
│   └── package.json
├── integrations/                   # Scrapers especializados
│   ├── scraping-presas-canarias/
│   ├── scraping-cuenca-mediterranea/
│   └── scraping-cuenca-mino-sil/
├── packages/
│   └── db-model/                   # Modelos de datos
├── run-scripts/                    # Scripts de ejecución
└── vercel.json                     # Configuración de deployment
```

## 🛠️ Tecnologías

### Frontend
- **Next.js 15.4.1**: Framework React con App Router
- **TypeScript**: Desarrollo tipado y robusto
- **React 19**: Última versión con hooks modernos

### Inteligencia Artificial
- **Claude (Anthropic)**: Asistente conversacional especializado
- **@anthropic-ai/sdk**: Integración oficial con la API

### Web Scraping
- **Cheerio**: Parsing de HTML eficiente
- **Axios**: Cliente HTTP robusto
- **Node.js**: Entorno de ejecución

### Infraestructura
- **Turbo**: Monorepo y gestión de dependencias
- **Vercel**: Deployment y hosting
- **npm workspaces**: Gestión de paquetes

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/embalse-info.git
cd embalse-info
```

### 2. Instalar Dependencias
```bash
# Instalar dependencias globales
npm install

# Instalar dependencias del frontend
cd front
npm install
```

### 3. Configurar Claude (Opcional)
```bash
# Crear archivo de configuración
cp front/.env.example front/.env.local

# Editar y agregar tu API key de Claude
# ANTHROPIC_API_KEY=tu_api_key_aqui
```

### 4. Ejecutar el Proyecto
```bash
# Desde la carpeta front
npm run dev

# O desde la raíz
npm run start
```

### 5. Abrir en el Navegador
```
http://localhost:3000
```

## 🤖 Configuración de Claude

### Obtener API Key
1. Ve a [console.anthropic.com](https://console.anthropic.com/)
2. Crea una cuenta o inicia sesión
3. Navega a "API Keys"
4. Genera una nueva API key
5. Cópiala al archivo `.env.local`

### Ejemplos de Preguntas
- "¿Cuál es la presa más grande de Gran Canaria?"
- "¿Cuántas presas hay en total?"
- "Información sobre la presa Soria"
- "¿Qué presas están en la cuenca del Guiniguada?"

## 🔄 Web Scraping

### Ejecutar Scrapers
```bash
# Scraper de presas canarias
npm run scripts presas-canarias

# Ejecutar desde la integración
cd integrations/scraping-presas-canarias
npm run dev
```

### Datos Generados
- **72 presas** de Gran Canaria
- **Formato CSV** con datos estructurados
- **Información completa**: capacidad, altura, cuenca, barranco

## 🌐 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno:
   - `ANTHROPIC_API_KEY`: Tu API key de Claude
3. Deploy automático en cada push

### Variables de Entorno
```bash
# En Vercel Dashboard > Settings > Environment Variables
ANTHROPIC_API_KEY=tu_api_key_de_anthropic
```

## 📊 Datos Incluidos

### Presas de Gran Canaria (72 total)
- **Nombre** de la presa
- **Cuenca hidrográfica**
- **Barranco** donde se ubica
- **Altura** en metros
- **Capacidad** en metros cúbicos
- **Cota del muro** en metros
- **Fuente** de los datos

### Estadísticas Principales
- **Capacidad total**: ~76.7 hm³
- **Presa más grande**: Soria (32.30 hm³)
- **Altura promedio**: Variable por presa
- **Fuente**: Consejo Insular de Aguas de Gran Canaria

## 🔮 Roadmap

### Corto Plazo
- [ ] Datos de otras islas (Tenerife, La Palma)
- [ ] Integración con base de datos
- [ ] API REST completa
- [ ] Gráficos interactivos

### Mediano Plazo
- [ ] Datos en tiempo real de llenado
- [ ] Mapas interactivos con coordenadas
- [ ] Sistema de alertas
- [ ] App móvil nativa

### Largo Plazo
- [ ] Machine Learning para predicciones
- [ ] Integración con sistemas gubernamentales
- [ ] Portal de datos abiertos
- [ ] Dashboard administrativo

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙋‍♂️ Soporte

¿Necesitas ayuda? 

- 📧 Email: tu-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/embalse-info/issues)
- 💬 Chat: Usa el asistente Claude integrado en la app

## 🎉 Agradecimientos

- **Consejo Insular de Aguas de Gran Canaria** por los datos públicos
- **Anthropic** por la API de Claude
- **Vercel** por el hosting gratuito
- **Next.js** por el framework excepcional

---

**¡Explora las presas de Canarias de manera inteligente!** 🏝️💧🤖