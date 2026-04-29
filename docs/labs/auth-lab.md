# auth-lab

Servicio de autenticación con login vulnerable y JWT generation.

## Información General

- **URL**: http://auth.lab.local
- **Puerto interno**: 3000
- **Tecnologías**: Node.js, Express, JWT, CORS
- **Credenciales**: user@lab.local / Password123, admin@lab.local / admin123

## Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/login` | Login y generación de JWT |
| GET | `/debug` | Información de debug |

## Login

### Request

```bash
POST http://auth.lab.local/login
Content-Type: application/json

{"email":"user@lab.local","password":"Password123"}
```

### Response (éxito)

```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### Response (error)

```json
{"error": "invalid credentials"}
```

## JWT Structure

```javascript
// Payload
{
  "id": 1,
  "email": "user@lab.local",
  "role": "user"  // o "admin"
}

// Secret: "dev-secret-123"
// Algorithm: HS256
```

## Testing con Burp

### 1. Login normal

```bash
POST /login
{"email":"user@lab.local","password":"Password123"}
```

### 2. Login como admin

```bash
POST /login
{"email":"admin@lab.local","password":"admin123"}
```

### 3. Testear acceso a otros labs

```bash
# Usar token de auth.lab.local para acceder a api.lab.local
GET /api/admin
Authorization: Bearer <token>
```

## Vulnerabilidades

### Credenciales hardcodeadas

```javascript
const users = [
  { id: 1, email: "user@lab.local", role: "user", password: "Password123" },
  { id: 2, email: "admin@lab.local", role: "admin", password: "admin123" },
];
```

### Debug endpoint expone información

```bash
GET /debug
# Respuesta: jwtSecret, testUsers, etc.
```

## CTF Challenge Ideas

1. **Fácil**: Encontrar credenciales en el código fuente o en requests
2. **Medio**: Bruteforce de login
3. **Difícil**: Crear token JWT forged para role admin