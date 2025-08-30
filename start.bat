@echo off
echo ========================================
echo    Sistema de Gestion de Usuarios
echo ========================================
echo.
echo Iniciando el servidor...
echo.
echo Asegurate de que MongoDB este ejecutandose
echo en tu sistema antes de continuar.
echo.
echo Presiona cualquier tecla para continuar...
pause > nul

echo.
echo Compilando TypeScript...
npm run build

echo.
echo Iniciando servidor en modo desarrollo...
npm run dev
