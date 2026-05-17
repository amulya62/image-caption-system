@echo off
echo ===================================================
echo   CaptionAI Backend Server
echo ===================================================
echo.

cd /d "%~dp0"

:: Load HF token from .env file
for /f "tokens=1,* delims==" %%a in (.env) do (
    if "%%a"=="HF_TOKEN" set HF_TOKEN=%%b
)

if defined HF_TOKEN (
    echo HuggingFace token loaded.
) else (
    echo WARNING: HF_TOKEN not found in .env
)

echo Starting FastAPI on http://localhost:8000
echo Press Ctrl+C to stop.
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000
