# Scraper de Presas Canarias

Este integrador realiza web scraping de las presas de Canarias, específicamente de la página del Consejo Insular de Aguas de Gran Canaria, para obtener información detallada sobre las presas del archipiélago.

## 🏝️ Fuentes de Datos

- **Gran Canaria**: [Consejo Insular de Aguas de Gran Canaria](https://www.aguasgrancanaria.com/presas/ubicacion_presas.php)
- **Tenerife**: Pendiente de implementación (cuando esté disponible)
- **Otras islas**: Pendiente de implementación

## 📊 Datos Extraídos

### Presas Asignadas al Consejo
- Nombre de la presa
- Altura total (metros)
- Volumen máximo (m³)
- Isla (Gran Canaria)

### Grandes Presas de Gran Canaria
- Nombre de la presa
- Cuenca hidrográfica
- Barranco
- Cota del muro (metros)
- Capacidad (m³)
- Altura (metros)
- Isla (Gran Canaria)

## 🚀 Uso

### Instalación de dependencias
```bash
npm install
```

### Ejecutar el scraper
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

### Desde el proyecto principal
```bash
npm run scripts presas-canarias
```

## 📁 Estructura del Proyecto

```
src/
├── api/
│   ├── presas-canarias.api.ts    # Funciones para obtener datos de las APIs
│   ├── presas-canarias.model.ts  # Modelos de datos TypeScript
│   └── index.ts                  # Exportaciones de la API
├── scraper/
│   ├── business.ts               # Lógica de negocio para extraer datos
│   ├── mapper.ts                 # Mapeadores de datos
│   └── index.ts                  # Exportaciones del scraper
├── integration.ts                # Función principal de integración
├── console-runner.ts             # Ejecutor de consola
└── index.ts                      # Exportaciones principales
```

## 📋 Funciones Principales

### `scrapePresasCanarias()`
Realiza el scraping completo y retorna un array de presas canarias con todos los datos.

### `scrapePresasCanariasAsUpdateEntity()`
Retorna los datos en formato de entidad de actualización para integración con bases de datos.

### `scrapePresasCanariasAsCSV()`
Exporta los datos en formato CSV.

### `ejecutarScrapingCompleto()`
Ejecuta el scraping completo y muestra un resumen detallado en consola.

## 📈 Estadísticas Generales

El scraper extrae automáticamente:
- Capacidad total de almacenamiento
- Número total de presas
- Distribución por islas
- Top 5 presas por capacidad

## 🎯 Características

- ✅ Web scraping automatizado
- ✅ Extracción de múltiples tablas
- ✅ Eliminación de duplicados
- ✅ Exportación a CSV
- ✅ Logs detallados
- ✅ Manejo de errores
- ✅ TypeScript completo

## 🔧 Configuración

El scraper está configurado para:
- Timeout de 10 segundos en las peticiones HTTP
- User-Agent personalizado para evitar bloqueos
- Filtrado automático de filas de totales y encabezados
- Normalización de datos numéricos

## 📄 Salida

El scraper genera:
1. **Logs en consola** con el progreso y resumen
2. **Archivo CSV** (`presas_canarias.csv`) con todos los datos extraídos
3. **Datos estructurados** en formato TypeScript para integración

## 🚨 Limitaciones Actuales

- Solo incluye datos de Gran Canaria
- No incluye datos de volumen actual (solo capacidad máxima)
- No incluye coordenadas geográficas
- No incluye datos históricos de llenado

## 🔮 Próximos Pasos

- [ ] Integración con datos de Tenerife
- [ ] Obtención de coordenadas geográficas
- [ ] Datos de volumen actual en tiempo real
- [ ] Integración con base de datos
- [ ] API REST para consulta de datos
- [ ] Dashboard web para visualización

## 📞 Soporte

Para reportar problemas o sugerir mejoras, por favor crea un issue en el repositorio del proyecto. 