# 🏝️ Sistema de Presas Canarias - Datos Actualizados

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Windows)
```bash
# Ejecuta este archivo para iniciar todo el sistema
start-sistema.bat
```

### Opción 2: Manual
```bash
# 1. Frontend (en una terminal)
cd front
npm start

# 2. Actualizador automático (en otra terminal)
npm run update-presas
```

## 📊 Lo que incluye el sistema:

### 🌐 Frontend (http://localhost:3000)
- **72 presas de Gran Canaria** con datos completos y actualizados
- **Dashboard interactivo** con estadísticas generales
- **Top 5 presas** por capacidad 
- **Buscador en tiempo real** por nombre, cuenca o barranco
- **Diseño responsivo** para móvil, tablet y desktop

### 🔄 Actualizador Automático
- Extrae datos frescos **cada hora** desde el sitio oficial
- Actualiza automáticamente el CSV del frontend
- **Logs detallados** de cada actualización
- **Manejo de errores** robusto

### 📈 Datos Incluidos
- **Fuente oficial**: Consejo Insular de Aguas de Gran Canaria
- **72 presas** con información completa:
  - Nombre y ubicación (cuenca, barranco)
  - Capacidad en hm³ o miles de m³
  - Altura del muro en metros
  - Cota del muro
  - Coordenadas y datos técnicos

## 🏆 Presas Destacadas (Top 5 por capacidad):
1. **Soria**: 32.30 hm³ - La presa más grande de Gran Canaria
2. **Chira**: 5.64 hm³ - Importante para el suministro de agua
3. **Cueva de las Niñas**: 5.18 hm³ - En la cuenca del Arguineguín
4. **Siberio**: 4.80 hm³ - Barranco de Siberio, La Aldea
5. **El Parralillo**: 4.59 hm³ - Barranco Grande, La Aldea

## 📱 Características del Frontend:

### 🎨 Diseño Moderno
- Header con gradiente azul-púrpura
- Cards interactivas con efectos hover
- Colores modernos y tipografía legible
- Iconos descriptivos para cada dato

### 📊 Estadísticas Generales
- **Total de presas**: 72
- **Capacidad total**: Suma de todas las capacidades
- **Altura promedio**: Calculada en tiempo real

### 🔍 Funcionalidades
- **Búsqueda inteligente** por cualquier campo
- **Formato automático** de capacidades (hm³ vs miles de m³)
- **Información completa** de cada presa
- **Responsive design** que se adapta a cualquier dispositivo

## ⚙️ Configuración Técnica:

### 🛠️ Stack Tecnológico
- **Frontend**: Next.js 15 con React 19
- **Scraping**: Node.js + Cheerio + Axios
- **Datos**: CSV actualizado automáticamente
- **Hosting**: Local (localhost:3000)

### 📂 Estructura del Proyecto
```
embalse-info/
├── front/                          # Frontend Next.js
│   ├── src/app/page.tsx            # Página principal
│   ├── public/presas_canarias.csv  # Datos actualizados
│   └── ...
├── integrations/scraping-presas-canarias/  # Sistema de scraping
│   ├── src/                        # Código fuente del scraper
│   ├── presas_canarias.csv        # CSV fuente
│   └── ...
├── update-presas.js               # Actualizador automático
├── start-sistema.bat              # Script de inicio (Windows)
└── README_SISTEMA.md             # Esta documentación
```

## 🔄 Sistema de Actualización:

### ⏰ Frecuencia
- **Automática cada hora** (3600000 ms)
- **Primera actualización inmediata** al iniciar
- **Logs detallados** de cada proceso

### 📊 Proceso de Actualización
1. **Conexión** al sitio oficial del Consejo Insular de Aguas
2. **Extracción** de datos de las 72 presas
3. **Procesamiento** y unificación de información
4. **Exportación** a CSV actualizado
5. **Copia** automática al frontend
6. **Logs** de confirmación

### 🛡️ Manejo de Errores
- Timeout de 60 segundos por scraping
- Continúa el programa aunque falle una actualización
- Logs detallados de errores
- Reintentos automáticos en la próxima hora

## 🚦 Estados del Sistema:

### ✅ Sistema Funcionando
- Frontend disponible en http://localhost:3000
- Actualizador ejecutándose cada hora
- Datos frescos y actualizados

### ⚠️ Posibles Problemas
- **Puerto 3000 ocupado**: Cerrar otras aplicaciones que usen el puerto
- **Error de scraping**: Verificar conexión a internet
- **Dependencias faltantes**: Ejecutar `npm install`

## 📞 Soporte y Comandos:

### 🔧 Comandos Útiles
```bash
# Ver estado del frontend
curl http://localhost:3000

# Actualización manual de datos
cd integrations/scraping-presas-canarias
npm run dev

# Reiniciar el sistema completo
# Ctrl+C para detener y ejecutar start-sistema.bat de nuevo
```

### 📋 Verificaciones
- ✅ Node.js instalado (v20+)
- ✅ NPM funcionando
- ✅ Conexión a internet
- ✅ Puerto 3000 disponible
- ✅ Permisos de escritura en la carpeta del proyecto

---

## 🎉 ¡Disfruta explorando las 72 presas de Gran Canaria con datos siempre actualizados!

**Desarrollado con ❤️ para la gestión y visualización de recursos hídricos canarios**