# DVWA - Damn Vulnerable Web Application

## Información General

- **URL**: http://dvwa.local
- **Dificultad**: Baja, Media, Alta
- **Tecnologías**: PHP, MySQL
- **Credenciales**: admin / password

## Vulnerabilidades Disponibles

| Módulo | Descripción |
|--------|-------------|
| Brute Force | Autenticación por fuerza bruta |
| Command Injection | Ejecución de comandos del sistema |
| CSRF | Cross-Site Request Forgery |
| File Inclusion | Inclusión de archivos locales/remotos |
| File Upload | Subida de archivos maliciosa |
| Insecure CAPTCHA |验证码 vulnerable |
| SQL Injection | Inyección SQL (SQLi) |
| SQL Injection (Blind) | SQLi a ciegas |
| XSS (Reflected) | Cross-Site Scripting reflejado |
| XSS (Stored) | XSS almacenado |
| XSS (DOM) | XSS basado en DOM |

## Configuración de Seguridad

Niveles de dificultad configurables:

- **Low**: Sin protección
- **Medium**: Protección básica (fácil de bypasear)
- **High**: Protección avanzada

Cambiar en: `DVWA Security` → seleccionar nivel

## Uso con Burp Suite

1. Configurar proxy en Burp Suite (127.0.0.1:8080)
2. Configurar proxy del navegador
3. Interceptar tráfico