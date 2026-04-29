# Docker Setup

## Servicios Disponibles

| Servicio | Tipo | Puerto interno | Hostname | Descripción |
|----------|------|----------------|----------|-------------|
| DVWA | Pre-built image | 80 | dvwa.local | Damn Vulnerable Web Application |
| bWAPP | Pre-built image | 80 | bwapp.local | Buggy Web Application |
| Juice Shop | Pre-built image | 3000 | juice.local | OWASP Juice Shop |
| **api-lab** | Custom Node.js | 3000 | api.lab.local | API vulnerable con IDOR, JWT, debug |
| **auth-lab** | Custom Node.js | 3000 | auth.lab.local | Login + JWT authentication |
| **admin-lab** | Custom Nginx | 80 | admin.lab.local | Panel admin expuesto |
| **files-lab** | Custom Node.js | 3000 | files.lab.local | Upload de archivos vulnerable |

## Arquitectura

```
                    nginx (:80)
                   /      |      \
         dvwa.local    juice.local    api.lab.local
         bwapp.local   admin.lab.local  auth.lab.local
                                     files.lab.local
```

## Archivos de Configuración

### docker-compose.yml

```yaml
services:
  dvwa:
    image: vulnerables/web-dvwa
    container_name: dvwa
    networks:
      - labnet

  bwapp:
    image: raesene/bwapp
    container_name: bwapp
    networks:
      - labnet

  juice-shop:
    image: bkimminich/juice-shop
    container_name: juice-shop
    networks:
      - labnet

  api-lab:
    build: ./api-lab
    container_name: api-lab
    networks:
      - labnet

  auth-lab:
    build: ./auth-lab
    container_name: auth-lab
    networks:
      - labnet

  admin-lab:
    build: ./admin-lab
    container_name: admin-lab
    networks:
      - labnet

  files-lab:
    build: ./files-lab
    container_name: files-lab
    networks:
      - labnet

  nginx:
    image: nginx:alpine
    container_name: reverse_proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    networks:
      - labnet
    depends_on:
      - dvwa
      - bwapp
      - juice-shop
      - api-lab
      - auth-lab
      - admin-lab
      - files-lab

networks:
  labnet:
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name dvwa.local;
    location / {
        proxy_pass http://dvwa;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name bwapp.local;
    location / {
        proxy_pass http://bwapp;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name juice.local;
    location / {
        proxy_pass http://juice-shop:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.lab.local;
    location / {
        proxy_pass http://api-lab:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name auth.lab.local;
    location / {
        proxy_pass http://auth-lab:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name admin.lab.local;
    location / {
        proxy_pass http://admin-lab:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name dev.lab.local;
    location / {
        proxy_pass http://api-lab:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name files.lab.local;
    location / {
        proxy_pass http://files-lab:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Levantar Servicios

```bash
cd docker
docker-compose up -d
```

## Build Custom Labs

```bash
# Build todas las imágenes custom
docker-compose build

# O iniciar directamente (auto-build)
docker-compose up -d
```

## Verificar Estado

```bash
docker-compose ps
docker-compose logs -f
```

## Verificar Accesos

```bash
curl -s -o /dev/null -w "dvwa: %{http_code}\n" --header "Host: dvwa.local" http://127.0.0.1/
curl -s -o /dev/null -w "bwapp: %{http_code}\n" --header "Host: bwapp.local" http://127.0.0.1/
curl -s -o /dev/null -w "juice: %{http_code}\n" --header "Host: juice.local" http://127.0.0.1/
curl -s -o /dev/null -w "api: %{http_code}\n" --header "Host: api.lab.local" http://127.0.0.1/
curl -s -o /dev/null -w "auth: %{http_code}\n" --header "Host: auth.lab.local" http://127.0.0.1/
curl -s -o /dev/null -w "admin: %{http_code}\n" --header "Host: admin.lab.local" http://127.0.0.1/
curl -s -o /dev/null -w "dev: %{http_code}\n" --header "Host: dev.lab.local" http://127.0.0.1/
curl -s -o /dev/null -w "files: %{http_code}\n" --header "Host: files.lab.local" http://127.0.0.1/
```

## Troubleshooting

### DVWA/BWAPP dan 502 en primera request
```bash
docker-compose restart dvwa bwapp
```

### Todos los servicios dan 502
```bash
docker-compose down
docker-compose up -d
docker-compose restart nginx
```