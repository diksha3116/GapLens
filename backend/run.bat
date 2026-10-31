@echo off
echo ========================================================
echo Starting GapLens FastAPI Epistemic Backend (Port 8001)...
echo ========================================================

set PYTHON_EXE=C:\Users\acer\AppData\Local\Programs\Python\Python312\python.exe
if not exist "%PYTHON_EXE%" (
    set PYTHON_EXE=python
)

cd /d "%~dp0"
"%PYTHON_EXE%" -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
pause
