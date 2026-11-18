@echo off
title Push Chatbot ke GitHub (tamara7S)
echo ========================================================
echo  UPLOAD CHATBOT KE GITHUB - TIM KKN UM 2026
echo ========================================================
echo.
echo Pastikan kamu sudah membuat repository baru di GitHub:
echo https://github.com/new
echo Nama repository yang disarankan: chatbot-bahrulmaghfiroh
echo.
set /p REPO_NAME="Masukkan nama repository GitHub (default: chatbot-bahrulmaghfiroh): "
if "%REPO_NAME%"=="" set REPO_NAME=chatbot-bahrulmaghfiroh

echo.
echo Menghubungkan ke https://github.com/tamara7S/%REPO_NAME%.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/tamara7S/%REPO_NAME%.git
git branch -M main

echo Melakukan Push ke branch main...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  BERHASIL DI-UPLOAD KE GITHUB!
    echo  URL Repo: https://github.com/tamara7S/%REPO_NAME%
    echo.
    echo  Untuk mengaktifkan link web gratis agar temanmu bisa coba:
    echo  1. Buka repo di GitHub -> Settings -> Pages
    echo  2. Pilih Branch 'main' -> Save
    echo  3. Link web: https://tamara7s.github.io/%REPO_NAME%/
    echo ========================================================
) else (
    echo.
    echo [Perhatian] Jika gagal, pastikan:
    echo 1. Kamu sudah membuat repository '%REPO_NAME%' di akun GitHub https://github.com/tamara7S
    echo 2. Kamu sudah login di browser atau Git Credential Manager.
)
echo.
pause
