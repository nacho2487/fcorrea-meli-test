# Ejercicio de Frontend de MercadoLibre

## Requisitos

Desarrollado y probado con node `8.9.4`, yarn `1.12.1` (o npm `5.6.0`).

## Entorno

Se han seteado dos variables de entorno:

| Nombre | Default | Descripción |
| ------ | ------- | ---------------------------------------- |
| SITE | `MLA` | Sitio (país) a donde la app se conectará |
| PORT | `5000` | Puerto donde la aplicación correrá |

Para efectos de este ejercicio el archivo `.env` está versionado con los valores por defecto.

## Correr la aplicación

### Desarrollo

Para correr la aplicación en modo de desarrollo basta con instalar las dependencias y correr:

```
yarn dev
```

### Producción

Para correr la aplicación en modo de producción basta con instalar solamente las dependencias de producción con:

```bash
npm install --production # o yarn install --production=true
```

e iniciar el servidor con:

```bash
npm run dev # o yarn dev
```
