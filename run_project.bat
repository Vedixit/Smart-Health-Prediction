@echo off
echo Starting Full Stack App
cd backend
call venv\Scripts\activate.bat
pip install -r requirements.txt
start cmd /k "python app.py"
cd ..
cd frontend
npm install
start cmd /k "npm start"
pause