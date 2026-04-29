# PMT HackLab

Laboratorio de práctica para ethical hacking y bug bounty con herramientas open source.

## Labs Disponibles

| Lab | URL | Puerto | Propósito |
|-----|-----|--------|-----------|
| DVWA | http://dvwa.local | 80 | SQL Injection, XSS, CSRF |
| bWAPP | http://bwapp.local | 80 | 560+ vulnerabilidades |
| Juice Shop | http://juice.local | 3000 | JWT, IDOR, Business Logic |
| api-lab | http://api.lab.local | 3000 | IDOR, JWT exploits |
| auth-lab | http://auth.lab.local | 3000 | Login bypass, JWT generation |
| admin-lab | http://admin.lab.local | 80 | Broken Access Control |
| files-lab | http://files.lab.local | 3000 | File upload, path traversal |

## Quick Start

### 1. Levantar Labs

```bash
cd docker
docker-compose up -d
```

### 2. Configurar Hosts

```bash
echo "127.0.0.1 dvwa.local bwapp.local juice.local api.lab.local auth.lab.local admin.lab.local files.lab.local" | sudo tee -a /etc/hosts
```

### 3. Iniciar Documentación (local)

```bash
cd ..
source .venv/bin/activate
mkdocs serve
```

Acceder a http://localhost:8003 para la documentación.

## Credentiales

| Lab | Usuario | Contraseña |
|-----|---------|------------|
| DVWA | admin | password |
| bWAPP | bee | bug |
| api-lab | admin@lab.local | admin123 |
| auth-lab | admin@lab.local | admin123 |
| api-lab / auth-lab | user@lab.local | Password123 |

## Estructura del Proyecto

```
PMT_HackLab/
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deployment
├── docker/               # Configuración de contenedores
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── api-lab/          # Custom API vulnerable
│   ├── auth-lab/         # Auth service
│   ├── admin-lab/        # Admin panel
│   └── files-lab/        # File upload service
├── docs/                 # Documentación MkDocs
├── toolbox/              # Directorio para herramientas
├── .venv/                # Entorno virtual Python
├── mkdocs.yml
└── README.md
```

## Despliegue a GitHub Pages

El proyecto está configurado para deploy automático a GitHub Pages via GitHub Actions.

### Configuración

1. Hacer push a `main`
2. Ir a **Settings → Pages → Source**
3. Seleccionar **GitHub Actions** como fuente
4. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente

### Verificación

Una vez deployado, la documentación estará disponible en:
```
https://[username].github.io/PMT_HackLab/
```

## Configuración de Proxy

Para usar con Burp Suite:

1. Burp Suite → Proxy → Options → Proxy Listeners
2. Add → Bind to port 8080
3. Configurar navegador para usar `127.0.0.1:8080`

## Troubleshooting

### DVWA/BWAPP dan 502 en primera request

```bash
cd docker
docker-compose restart dvwa bwapp
```

### Reiniciar todos los servicios

```bash
cd docker
docker-compose down
docker-compose up -d
```

## Documentación

La documentación completa está en la carpeta `docs/` y puede servirse con mkdocs.

Para contribuir, editá los archivos `.md` en `docs/` y la navegación se actualiza automáticamente en `mkdocs.yml`.