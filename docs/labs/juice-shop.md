# OWASP Juice Shop

## Información General

- **URL**: http://juice.local
- **Puerto interno**: 3000
- **Tecnologías**: Node.js, Express, SQLite/PostgreSQL
- **Credenciales por defecto**: No requiere login inicial (demo seed data)

## Descripción

Juice Shop es un application web intencionalmente vulnerable que涵盖了 OWASP Top 10 incluyendo:

- A1 - Injection (SQL, NoSQL)
- A2 - Broken Authentication
- A3 - Sensitive Data Exposure
- A4 - Insecure Design
- A5 - Security Misconfiguration
- A6 - IDOR (Insecure Direct Object Reference)
- A7 - XSS
- A8 - Deserialization
- A9 - Using Components with Known Vulnerabilities
- A10 - Insufficient Logging

## Vulnerabilidades Destacadas para Practicar

### SQL/NoSQL Injection
- Bypass de login
- Extracción de datos de usuarios

### IDOR (Broken Access Control)
- Acceder a pedidos de otros usuarios
- Modificar parámetros en requests

### JWT Vulnerabilities
- Algoritmo none
- Token manipulation

### XSS
- Stored XSS en reviews
- DOM-based XSS

### Business Logic
- Agregar producto al carrito con precio negativo
- Coupon code manipulation

## Configuración de Dificultad

Juice Shop tiene 3 niveles de dificultad:

1. **Tutorial**: Desafíos guiados
2. **Challenge Mode**: Seleccionar vulnerabilidades específicas
3. **CTF Mode**: Para competencias

### Cambiar dificultad

1. Ir a **Score Board** (ícono de copa)
2. Click en **All** para filtrar por dificultad
3. Seleccionar: `Tutorial` | `Challenge` | `Impossible`

## Pistas

Para cada desafío, hay pistas disponibles:
- **1**: Gratuita
- **2**: Paga puntos
- **3**: Paga más puntos
- **4**: Máximo costo

## API Endpoints Comunes

```bash
# Listar productos
GET /api/Products

# Detalle producto
GET /api/Products/:id

# Login
POST /rest/user/login

# Login (NoSQL injection)
POST /rest/user/login
{"email": {"$ne": ""}, "password": {"$ne": ""}}

# Carrito
GET /rest/basket/:id

# Reviews
GET /rest/products/:id/reviews
```

## Uso con Burp Suite

1. Configurar proxy en 127.0.0.1:8080
2. Navegar normal para ver tráfico
3. Interceptar y modificar requests
4. Usar **Autorize** para probar IDOR

## Workflow Recomendado

```
ffuf API discovery → Burp analyze → JWT tampering → IDOR testing
```

### 1. Descubrir API endpoints

```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/api.txt -u http://juice.local/api/FUZZ -mc 200
```

### 2. Analizar en Burp

- Revisar HTTP History
- Identificar patrones de autenticación
- Probar manipulación de tokens

### 3. Testing de vulnerabilidades

- **IDOR**: Cambiar IDs en `/rest/basket/:id`
- **JWT**: Modificar payload y jugar con algoritmo
- **XSS**: Probar en reviews y búsqueda