@echo off
echo Starting Smart Health Prediction Frontend...
cd /d "%~dp0"
cd frontend

IF EXIST node_modules (
    echo node_modules found. Skipping installation.
) ELSE (
    echo Installing dependencies...
    npm install
)

echo Starting development server on local network...
set HOST=0.0.0.0
npm start

pause
