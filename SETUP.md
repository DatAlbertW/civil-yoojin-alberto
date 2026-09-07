# Setup — versión refinada para GitHub Pages

Esta versión cambia el diseño para que se vea **más fino, limpio y editorial**, con la invitación como protagonista.

## Estructura del proyecto

```text
yoojin-alberto-elite-redesign/
├── index.html
├── styles.css
├── rsvp.js
├── apps-script.gs
├── SETUP.md
├── .nojekyll
└── assets/
    ├── invitation.png
    ├── paper-texture.png
    ├── accent-top-left.png
    ├── accent-top-right.png
    ├── accent-bottom-left.png
    ├── accent-bottom-right.png
    └── favicon-bear.png
```

## Qué cambió de diseño

- Se quitó el fondo recargado.
- El fondo ahora es una base marfil limpia con textura muy sutil.
- La invitación es el elemento principal.
- El formulario RSVP está más limpio, con más aire y mejor jerarquía.
- El favicon ahora es un oso.
- Se añadieron acentos florales discretos tomados de la invitación.

## Publicación en GitHub Pages

1. Crea un repositorio público.
2. Sube **todos** los archivos y la carpeta `assets`.
3. Ve a **Settings → Pages**.
4. En **Build and deployment** selecciona:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/(root)`
5. Guarda.

Tu sitio quedará en una URL como:

```text
https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
```

## IMPORTANTE: no uses Custom domain si no quieres pagar

Si no quieres registrar un dominio, deja **vacío** el campo **Custom domain**.

## Conectar el formulario a Google Sheets

1. Abre Google Sheets y crea una hoja nueva.
2. Ve a **Extensiones → Apps Script**.
3. Pega ahí el contenido de `apps-script.gs`.
4. Ejecuta la función `setup()`.
5. Luego ve a **Deploy → New deployment → Web app**.
6. Configura:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copia la URL terminada en `/exec`.

## Pegar la URL del Apps Script

Abre `rsvp.js` y reemplaza esta línea:

```js
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```

por tu URL real.

## Volver a subir el cambio

Guarda `rsvp.js`, súbelo a GitHub y haz commit. GitHub Pages se actualizará automáticamente.

## Cómo cambiar el fondo después

Si quieres cambiar el fondo más adelante, abre `styles.css` y busca el bloque:

```css
body{
  ...
}
```

Ahí puedes modificar:
- el gradiente general
- la textura sutil
- el color base

Si quieres, en el siguiente paso puedo hacer una segunda versión todavía más minimalista/luxury-hotel.
