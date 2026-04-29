# admin-lab

Panel administrativo expuesto intencionalmente para practicar broken access control.

## Información General

- **URL**: http://admin.lab.local
- **Puerto interno**: 80
- **Tecnologías**: Nginx serving static HTML

## Contenido

El panel muestra hints sobre cómo acceder a recursos protegidos:

```
Panel admin expuesto intencionalmente.
Hint: revisar auth.lab.local/debug y api.lab.local/api/admin
```

## Propósito

Este lab demuestra:
- Paneles admin expuestos en internet
- Información sensitiva en páginas de error
- Broken access control

## Testing con Burp

### 1. Ver página principal

```
GET http://admin.lab.local/
```

### 2. Revisar código fuente para hints

```html
<body>
  <h1>Admin Lab</h1>
  <p>Panel admin expuesto intencionalmente.</p>
  <p>Hint: revisar auth.lab.local/debug y api.lab.local/api/admin</p>
</body>
```

### 3. Seguir los hints

1. Ir a http://auth.lab.local/debug → exponer JWT secret
2. Crear JWT con role admin
3. Acceder a http://api.lab.local/api/admin

## CTF Challenge Ideas

1. **Fácil**: Leer hints y seguir el path
2. **Medio**: Encontrar el panel y pivotear a otros labs
3. **Difícil**: Combinar con otros hallazgos para acceso completo