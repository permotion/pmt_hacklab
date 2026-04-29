# PMT HackLab

Laboratorio de práctica para ethical hacking y bug bounty.

## Quick Start

```bash
# 1. Levantar labs
cd docker
docker-compose up -d

# 2. Iniciar documentación
cd ..
source .venv/bin/activate
mkdocs serve

# 3. Acceder
# Labs: http://localhost (ver abajo)
# Docs: http://localhost:8003
```

## Laboratorios Disponibles

| Lab | URL | Puerto | Vulnerabilidades |
|-----|-----|--------|-----------------|
| DVWA | http://dvwa.local | 80 | SQLi, XSS, CSRF |
| bWAPP | http://bwapp.local | 80 | 560+ bugs |
| Juice Shop | http://juice.local | 3000 | JWT, IDOR |
| api-lab | http://api.lab.local | 3000 | IDOR, JWT |
| auth-lab | http://auth.lab.local | 3000 | Login bypass |
| admin-lab | http://admin.lab.local | 80 | Broken Access Control |
| files-lab | http://files.lab.local | 3000 | File Upload |

## Estructura

```
PMT_HackLab/
├── docker/           # Labs Docker
├── docs/              # Documentación MkDocs
├── toolbox/           # Herramientas (copiar aqui)
├── .venv/             # Entorno virtual
├── mkdocs.yml
└── README.md
```

## Configuración de Hosts

Agregar en `/etc/hosts`:

```
127.0.0.1 dvwa.local bwapp.local juice.local api.lab.local auth.lab.local admin.lab.local files.lab.local
```

## Credentiales

| Lab | Usuario | Contraseña |
|-----|---------|------------|
| DVWA | admin | password |
| bWAPP | bee | bug |
| api-lab | admin@lab.local | admin123 |
| auth-lab | admin@lab.local | admin123 |