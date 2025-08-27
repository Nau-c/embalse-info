@echo off
echo 🏝️  SISTEMA DE PRESAS CANARIAS
echo ================================
echo.
echo 🚀 Iniciando sistema completo...
echo.

REM Instalar dependencias si es necesario
echo 📦 Verificando dependencias...
if not exist node_modules (
    echo 💾 Instalando dependencias del proyecto principal...
    npm install
)

if not exist front\node_modules (
    echo 💾 Instalando dependencias del frontend...
    cd front && npm install && cd ..
)

REM Iniciar el frontend en segundo plano
echo 🌐 Iniciando frontend en http://localhost:3000...
start "Frontend Presas Canarias" cmd /k "cd front && npm start"

REM Esperar un poco para que el frontend inicie
timeout /t 3 /nobreak >nul

REM Iniciar el actualizador automático
echo 🔄 Iniciando actualizador automático de datos...
echo ⏰ Los datos se actualizarán cada hora automáticamente
echo.
echo 📋 INSTRUCCIONES:
echo    - Frontend: http://localhost:3000
echo    - Para detener: Ctrl+C en esta ventana
echo    - Los datos se actualizan cada hora
echo.
node update-presas.js
pause