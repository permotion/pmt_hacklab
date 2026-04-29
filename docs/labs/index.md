# Laboratorios

Entornos vulnerables disponibles para práctica.

## Labs Pre-configurados

- [DVWA](dvwa.md) - Damn Vulnerable Web Application
- [bWAPP](bwapp.md) - Buggy Web Application
- [Juice Shop](juice-shop.md) - OWASP Juice Shop

## Labs Custom (Node.js/Nginx)

- [api-lab](api-lab.md) - API vulnerable con IDOR y JWT
- [auth-lab](auth-lab.md) - Servicio de autenticación
- [admin-lab](admin-lab.md) - Panel admin expuesto
- [files-lab](files-lab.md) - Upload de archivos vulnerable

## Por Categoría

| Vulnerabilidad | Labs recomendados |
|----------------|-------------------|
| SQL Injection | DVWA, bWAPP |
| XSS | DVWA, bWAPP, Juice Shop |
| IDOR | api-lab, Juice Shop |
| JWT | api-lab, auth-lab, Juice Shop |
| File Upload | files-lab, DVWA |
| Broken Access Control | admin-lab, Juice Shop |
| Business Logic | Juice Shop |
| SSRF/OOB | Todos (usar Interactsh) |