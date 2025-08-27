# 🚀 Guía de Inicio - Presas de Canarias

## 📋 Pasos para Levantar el Proyecto

### 1. Instalar Dependencias
```bash
# En el directorio raíz del proyecto
npm install
```

### 2. Ejecutar el Frontend
```bash
# Opción 1: Desde el directorio raíz
cd front
npm start

# Opción 2: Usando turbo (si está configurado)
npx turbo start --filter=front

# Opción 3: Manualmente
cd front
npm run start
```

### 3. Verificar que Funciona
- Abre tu navegador en: **http://localhost:3000**
- Deberías ver la aplicación con las 72 presas de Gran Canaria

## 🎯 Lo que Verás en la Aplicación

### 🏝️ Dashboard Principal
- **Header atractivo** con gradiente azul-púrpura
- **72 presas de Gran Canaria** con datos completos
- **Estadísticas generales**: Total presas, capacidad total, altura promedio

### 🏆 Top 5 Presas por Capacidad
1. **Soria**: 32.30 hm³ (la más grande)
2. **Chira**: 5.64 hm³
3. **Cueva de las Niñas**: 5.18 hm³
4. **Siberio**: 4.80 hm³
5. **El Parralillo**: 4.59 hm³

### 🔍 Funcionalidades
- **Buscador en tiempo real** por nombre, cuenca o barranco
- **Cards interactivas** con efectos hover
- **Información completa** de cada presa:
  - Capacidad en hm³ o miles de m³
  - Altura en metros
  - Cuenca hidrográfica
  - Barranco
  - Cota del muro

### 📱 Diseño Responsivo
- Adaptable a móviles, tablets y desktop
- Grid dinámico que se ajusta al tamaño de pantalla
- Colores modernos y tipografía legible

## 🛠️ Solución de Problemas

### Si el puerto 3000 está ocupado:
```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :3000

# Matar el proceso (Windows)
taskkill /PID [numero_pid] /F
```

### Si hay errores de dependencias:
```bash
# Limpiar caché e instalar de nuevo
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Errores de TypeScript:
- Los tipos están definidos en `front/src/app/page.tsx`
- Todas las interfaces están correctamente tipadas

## 📊 Datos Incluidos

- **Fuente**: Consejo Insular de Aguas de Gran Canaria
- **Total**: 72 presas
- **Datos**: Nombre, cuenca, barranco, altura, capacidad, cota del muro
- **Formato**: CSV procesado dinámicamente

## 🔮 Próximos Pasos

1. **Optimización**: Agregar loading states
2. **Mapas**: Integrar coordenadas geográficas
3. **Otras islas**: Expandir a Tenerife, La Palma, etc.
4. **Base de datos**: Migrar de CSV a BD relacional
5. **API**: Crear endpoints REST
6. **Tiempo real**: Datos de volumen actual

---

**¡Disfruta explorando las presas de Canarias!** 🏝️💧

