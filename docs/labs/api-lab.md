# api-lab

API vulnerable para practicar IDOR, JWT exploitation y enumeração de endpoints.

## Información General

- **URL**: http://api.lab.local
- **Puerto interno**: 3000
- **Tecnologías**: Node.js, Express, JWT
- **Credenciales**: user@lab.local / Password123, admin@lab.local / admin123

## Vulnerabilidades Incluidas

### IDOR (Insecure Direct Object Reference)

```bash
# Sin autenticación - acceso a cualquier usuario
GET /api/users/1
GET /api/users/2
```

### JWT Debug/Exposed

```bash
# Endpoint debug expone el secret
GET /api/debug
# Respuesta: {"env":"development","jwtSecret":"dev-secret-123",...}
```

### Broken Access Control

```bash
# Solo admin puede acceder
GET /api/admin
# Con token JWT de admin: {"flag":"admin-access-ok","secret":"ADMIN_API_KEY=lab-123"}
```

## Endpoints Disponibles

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Health check | No |
| GET | `/api/users` | Lista todos los usuarios | No ❌ |
| GET | `/api/users/:id` | Ver usuario por ID | No ❌ (IDOR) |
| GET | `/api/admin` | Panel admin | Requiere JWT admin |
| GET | `/api/debug` | Info de debug | No ❌ |

## JWT Secret

```
JWT_SECRET = "dev-secret-123"
```

## Testing con Burp

### 1. Probar IDOR

```bash
# Sin auth, cambiar ID
GET /api/users/1
GET /api/users/2
```

### 2. Extraer JWT del login en auth.lab.local

```bash
POST http://auth.lab.local/login
{"email":"admin@lab.local","password":"admin123"}

# Recibir token
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Usar token en api-lab

```bash
GET http://api.lab.local/api/admin
Headers: Authorization: Bearer <token>
```

### 4. Decodificar JWT

```bash
# En Burp Decoder o python
import base64
# Header y payload están en base64url sin firma
```

## CTF Challenge Ideas

1. **Fácil**: Login como admin en auth.lab.local → usar token en api-lab/admin
2. **Medio**: Descubrir el secret en /api/debug → firmar token propio → admin
3. **Difícil**: Combinar IDOR + JWT para acceder a todos los usuarios sin auth