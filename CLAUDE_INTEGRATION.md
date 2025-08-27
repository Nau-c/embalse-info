# 🤖 Integración de Claude Chat - Presas Canarias

## 📋 Descripción

Se ha integrado un asistente inteligente powered by Claude de Anthropic que permite a los usuarios hacer preguntas sobre las presas de Gran Canaria de manera conversacional.

## ✨ Características

### 🧠 Inteligencia Artificial
- **Claude Haiku**: Modelo optimizado para respuestas rápidas y precisas
- **Contexto especializado**: Entrenado con todos los datos de las 72 presas
- **Respuestas conversacionales**: Interfaz natural y amigable

### 💬 Chat Interactivo
- **Botón flotante**: Acceso fácil desde cualquier parte de la página
- **Interfaz moderna**: Diseño limpio y responsivo
- **Preguntas sugeridas**: Ejemplos para comenzar la conversación
- **Tiempo real**: Respuestas inmediatas con indicador de carga

### 📊 Datos Integrados
- **72 presas de Gran Canaria**: Información completa y actualizada
- **Estadísticas automáticas**: Cálculos dinámicos de capacidad total, etc.
- **Contexto rico**: Datos de cuencas, barrancos, alturas y capacidades

## 🚀 Configuración

### 1. Instalar Dependencias
```bash
cd front
npm install
```

### 2. Configurar API Key de Claude
```bash
# Crear archivo .env.local en front/
cp .env.example .env.local

# Editar .env.local y agregar tu API key
ANTHROPIC_API_KEY=tu_api_key_aqui
```

### 3. Obtener API Key
1. Ve a [console.anthropic.com](https://console.anthropic.com/)
2. Crea una cuenta o inicia sesión
3. Navega a "API Keys"
4. Genera una nueva API key
5. Cópiala al archivo `.env.local`

### 4. Ejecutar el Proyecto
```bash
npm run start
```

## 🔧 Estructura Técnica

### Archivos Creados/Modificados
```
front/
├── .env.example                    # Plantilla de variables de entorno
├── .env.local                      # Variables de entorno (no en git)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── claude/
│   │   │       └── route.ts        # API route para Claude
│   │   └── page.tsx                # Página principal (modificada)
│   └── components/
│       └── ClaudeChat.tsx          # Componente del chat
└── package.json                    # Dependencias actualizadas
```

### 🛠️ Tecnologías Utilizadas
- **@anthropic-ai/sdk**: SDK oficial de Claude
- **Next.js API Routes**: Backend para comunicación segura
- **React Hooks**: Estado y efectos del chat
- **TypeScript**: Tipado fuerte y seguridad

## 💬 Ejemplos de Preguntas

### 📊 Estadísticas Generales
- "¿Cuántas presas hay en total?"
- "¿Cuál es la capacidad total de todas las presas?"
- "¿Cuál es la altura promedio de las presas?"

### 🏆 Rankings y Comparaciones
- "¿Cuál es la presa más grande?"
- "¿Cuáles son las 3 presas más altas?"
- "Compara la presa Soria con la presa Chira"

### 🗺️ Información Geográfica
- "¿Qué presas están en la cuenca del Guiniguada?"
- "¿Cuántas presas hay en el barranco de Arguineguín?"
- "Dime sobre las presas en la zona norte de la isla"

### 🔍 Búsquedas Específicas
- "Información completa sobre la presa Soria"
- "¿Cuáles son las presas con más de 1000m de altura?"
- "Presas con capacidad menor a 1 hm³"

## 🎯 Funcionalidades del Chat

### ✅ Implementadas
- [x] Chat flotante con botón de acceso
- [x] Interfaz conversacional moderna
- [x] Integración completa con datos de presas
- [x] Preguntas sugeridas para nuevos usuarios
- [x] Indicadores de carga y timestamps
- [x] Manejo de errores y API key no configurada

### 🔮 Futuras Mejoras
- [ ] Memoria de conversación entre sesiones
- [ ] Exportar respuestas a PDF/CSV
- [ ] Modo de voz (speech-to-text)
- [ ] Gráficos generados por IA
- [ ] Integración con mapas interactivos

## 🔐 Seguridad

- **API Key**: Almacenada de forma segura en variables de entorno
- **Servidor**: Llamadas a Claude desde el backend (Next.js API routes)
- **Sin exposición**: La API key nunca se expone al cliente
- **Rate limiting**: Protección automática de Anthropic

## 📈 Rendimiento

- **Modelo Haiku**: Optimizado para velocidad (< 3 segundos)
- **Caché de datos**: Los datos de presas se cargan una sola vez
- **Lazy loading**: El chat se carga solo cuando se necesita
- **Optimización**: Componentes React optimizados

## 🐛 Solución de Problemas

### Error: "API key no configurada"
1. Verifica que existe el archivo `.env.local`
2. Confirma que la variable `ANTHROPIC_API_KEY` está definida
3. Reinicia el servidor de desarrollo

### Error: "Error al procesar la consulta"
1. Verifica tu conexión a internet
2. Confirma que la API key es válida
3. Revisa los límites de tu cuenta de Anthropic

### El chat no aparece
1. Verifica que no hay errores de JavaScript en la consola
2. Confirma que el componente está importado correctamente
3. Revisa que las dependencias están instaladas

## 🎉 Resultado Final

El asistente Claude está ahora completamente integrado en tu proyecto de presas canarias, proporcionando:

1. **Acceso instantáneo** a información de las 72 presas
2. **Respuestas inteligentes** en lenguaje natural
3. **Interfaz moderna** y fácil de usar
4. **Datos contextualizados** y precisos

¡Los usuarios ahora pueden explorar los datos de las presas de manera conversacional! 🏝️💧
