# Configuración de Host

Para acceder a los laboratorios por hostname, es necesario configurar el archivo hosts.

## Archivo hosts

Agregar las siguientes líneas al archivo `/etc/hosts`:

```
127.0.0.1 dvwa.local bwapp.local juice.local api.lab.local auth.lab.local admin.lab.local dev.lab.local files.lab.local
```

## Linux/macOS

```bash
# Abrir con editor
sudo nano /etc/hosts

# O agregar directamente (copiar todo el bloque)
echo "127.0.0.1 dvwa.local bwapp.local juice.local api.lab.local auth.lab.local admin.lab.local dev.lab.local files.lab.local" | sudo tee -a /etc/hosts
```

## Verificación

```bash
ping dvwa.local
ping bwapp.local
ping juice.local
ping api.lab.local
ping auth.lab.local
ping admin.lab.local
ping dev.lab.local
ping files.lab.local
```

## Resumen de Labs Disponibles

| Lab | URL | Puerto | Propósito |
|-----|-----|--------|-----------|
| DVWA | http://dvwa.local | 80 | SQLi, XSS, CSRF, File Inclusion |
| bWAPP | http://bwapp.local | 80 | 560+ vulnerabilidades |
| Juice Shop | http://juice.local | 3000 | JWT, IDOR, Business Logic |
| api-lab | http://api.lab.local | 3000 | IDOR, JWT debug, API endpoints |
| auth-lab | http://auth.lab.local | 3000 | Login bypass, JWT exploits |
| admin-lab | http://admin.lab.local | 80 | Broken Access Control |
| files-lab | http://files.lab.local | 3000 | File upload, path traversal |
| dev (alias) | http://dev.lab.local | 3000 | Apunta a api-lab (dev environment) |

## Acceso Rápido

```
dvwa.local     → DVWA (admin / password)
bwapp.local     → bWAPP (bee / bug)
juice.local     → Juice Shop (sin login)
api.lab.local   → API vulnerable
auth.lab.local  → Auth service
admin.lab.local → Panel admin
files.lab.local → Upload vulnerable
dev.lab.local   → Dev environment (→ api-lab)
```