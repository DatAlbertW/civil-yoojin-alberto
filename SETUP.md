# Yoojin & Alberto — guía completa para GitHub Pages + Google Sheets RSVP

Esta versión usa una carpeta `assets/` porque es la mejor opción para conservar buena calidad visual, mantener el HTML limpio y facilitar cambios posteriores.

---

# 0. Estructura exacta del proyecto

Tu repositorio debe verse exactamente así:

```text
civil-yoojin-alberto/
│
├── index.html
├── styles.css
├── rsvp.js
├── .nojekyll
├── SETUP.md
├── apps-script.gs
│
└── assets/
    ├── invitation.png
    ├── top-art.png
    ├── bottom-art.png
    ├── paper-texture.png
    └── favicon.png
```

No cambies los nombres de los archivos salvo que también actualices las referencias en `index.html` y `styles.css`.

`apps-script.gs` y `SETUP.md` no son necesarios para que la página se renderice, pero conviene mantenerlos en el repositorio como documentación.

---

# 1. URL GRATIS: NO uses "Custom domain"

Si no quieres comprar ni registrar un dominio, **NO escribas nada en el campo Custom domain de GitHub Pages**.

Un `.com`, por ejemplo:

```text
www.civilyoojinalberto.com
```

no puede utilizarse gratuitamente solo por escribirlo en GitHub. El dominio raíz `civilyoojinalberto.com` tendría que estar registrado a tu nombre con un registrador y después tendrías que configurar sus registros DNS.

## URL gratuita recomendada

Si tu usuario de GitHub es:

```text
datalbertw
```

y tu repositorio se llama:

```text
civil-yoojin-alberto
```

tu página gratuita será:

```text
https://datalbertw.github.io/civil-yoojin-alberto/
```

No tienes que registrar nada.

### Si quieres una URL un poco más corta

Puedes nombrar el repositorio:

```text
boda
```

y tendrás:

```text
https://datalbertw.github.io/boda/
```

o:

```text
yoojin-alberto
```

y tendrás:

```text
https://datalbertw.github.io/yoojin-alberto/
```

El nombre después de `github.io/` depende del nombre del repositorio.

## Si quieres usar directamente https://datalbertw.github.io/

El repositorio debe llamarse exactamente:

```text
datalbertw.github.io
```

Esto crea un "user site" en la raíz de tu cuenta.

Solo recomiendo esta opción si no utilizas `datalbertw.github.io` para ningún otro sitio.

---

# 2. Por qué falló www.civilyoojinalberto.com

GitHub mostró:

```text
DNS check unsuccessful
Domain's DNS record could not be retrieved
InvalidDNSError
```

Eso significa que GitHub no puede encontrar una configuración DNS válida que demuestre que ese dominio existe y apunta a GitHub Pages.

Para usar `www.civilyoojinalberto.com` necesitarías:

1. Registrar/comprar `civilyoojinalberto.com`.
2. Entrar al panel DNS de ese registrador.
3. Crear los registros DNS requeridos para GitHub Pages.
4. Esperar a que propaguen.
5. Volver a GitHub Pages y verificar el dominio.

Como quieres gastar **$0**, simplemente no uses Custom domain.

### Elimina la configuración anterior

En tu repositorio:

1. `Settings`
2. `Pages`
3. Busca `Custom domain`
4. Borra `www.civilyoojinalberto.com`
5. Guarda.

También revisa la raíz del repositorio. Si existe un archivo llamado:

```text
CNAME
```

elimínalo.

No necesitas `CNAME` cuando usas la dirección gratuita `github.io`.

---

# 3. Crear el repositorio de GitHub

## Opción recomendada

Crea un repositorio llamado:

```text
civil-yoojin-alberto
```

Pasos:

1. Entra a GitHub.
2. Pulsa `+` arriba a la derecha.
3. `New repository`.
4. Repository name: `civil-yoojin-alberto`
5. Visibility: **Public**.
6. Puedes dejar README desactivado porque ya tienes los archivos.
7. Pulsa `Create repository`.

---

# 4. Subir los archivos

Descarga y descomprime el ZIP que te entregó ChatGPT.

Debes subir:

```text
index.html
styles.css
rsvp.js
.nojekyll
SETUP.md
apps-script.gs
assets/
```

## Desde la web de GitHub

1. Abre tu repositorio.
2. `Add file`
3. `Upload files`
4. Arrastra **todos los archivos y la carpeta assets**.
5. Verifica que GitHub muestre la carpeta `assets`.
6. Commit message: `Initial wedding RSVP site`
7. `Commit changes`.

La carpeta `assets` debe seguir siendo una carpeta. No coloques las imágenes sueltas junto al `index.html`.

---

# 5. Activar GitHub Pages

1. En el repositorio abre `Settings`.
2. En la barra izquierda abre `Pages`.
3. En `Build and deployment`:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. Pulsa `Save`.

Espera normalmente uno o varios minutos.

GitHub mostrará un mensaje similar a:

```text
Your site is live at:
https://datalbertw.github.io/civil-yoojin-alberto/
```

Ese es tu dominio gratuito.

---

# 6. NO configurar Custom domain

Debajo de GitHub Pages hay un campo llamado:

```text
Custom domain
```

Déjalo completamente vacío.

No escribas:

```text
www.civilyoojinalberto.com
```

ni ningún `.com` que no hayas registrado.

La URL `*.github.io` ya incluye HTTPS y no requiere DNS externo.

---

# 7. Configurar Google Sheets para recibir los RSVP

El sitio de GitHub Pages solo muestra el formulario. Las respuestas se guardarán con Google Apps Script en Google Sheets.

## Crear la hoja

1. Abre Google Sheets.
2. Crea una hoja nueva.
3. Nombre recomendado:

```text
Boda RSVP - Yoojin y Alberto
```

4. Dentro de la hoja abre:

```text
Extensiones → Apps Script
```

5. Borra el código que aparezca.
6. Abre el archivo `apps-script.gs` de este proyecto.
7. Copia todo.
8. Pégalo en Apps Script.
9. Guarda.

---

# 8. Ejecutar setup()

En Apps Script:

1. Arriba hay un menú donde normalmente aparece el nombre de una función.
2. Selecciona:

```text
setup
```

3. Pulsa `Run / Ejecutar`.
4. Google pedirá permisos.
5. Autoriza el script.

Vuelve a la hoja de cálculo.

Debes ver una pestaña:

```text
RSVP
```

con estas columnas:

```text
Recibido
Nombre
Segunda persona
Asiste
Personas
Telefono
Restriccion
Aplica a
Mensaje
Idioma
```

---

# 9. Publicar Apps Script como Web App

En Apps Script:

1. `Deploy`
2. `New deployment`
3. En `Select type`, elige:
   `Web app`
4. Description:
   `Wedding RSVP`
5. Execute as:
   **Me**
6. Who has access:
   **Anyone**
7. `Deploy`
8. Autoriza si Google lo solicita.

Obtendrás una URL parecida a:

```text
https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec
```

Copia **la URL que termina en `/exec`**.

No uses la URL del editor de Apps Script.

---

# 10. Conectar el sitio con Apps Script

Abre:

```text
rsvp.js
```

Al inicio encontrarás:

```js
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```

Reemplázalo por tu URL:

```js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec";
```

Guarda `rsvp.js`.

---

# 11. Subir ese cambio a GitHub

En GitHub:

1. Abre `rsvp.js`.
2. Pulsa el icono del lápiz `Edit`.
3. Pega la URL correcta en `SCRIPT_URL`.
4. `Commit changes`.

GitHub Pages volverá a publicar automáticamente el sitio.

---

# 12. Probar el RSVP

Abre la página pública:

```text
https://datalbertw.github.io/civil-yoojin-alberto/
```

Haz una prueba:

1. Nombre: `PRUEBA`
2. Teléfono: tu número
3. Marca asistencia.
4. Envía.

Abre Google Sheets.

Debe aparecer una fila nueva.

Si aparece, la conexión funciona.

Borra después la fila de prueba.

---

# 13. Si actualizas el código de Apps Script

Si modificas `apps-script.gs` después de haberlo desplegado:

1. `Deploy`
2. `Manage deployments`
3. Edita el deployment existente.
4. Selecciona `New version`.
5. `Deploy`.

Usualmente la URL `/exec` permanece igual.

---

# 14. Actualizar el diseño

Los archivos visuales están separados del código:

```text
assets/invitation.png
assets/top-art.png
assets/bottom-art.png
assets/paper-texture.png
assets/favicon.png
```

Esto significa que puedes cambiar una imagen sin convertir `index.html` en un archivo gigante.

El sitio usa rutas relativas:

```text
assets/top-art.png
```

y no:

```text
/assets/top-art.png
```

Esto es importante porque las rutas relativas funcionan correctamente en un GitHub Project Page como:

```text
https://datalbertw.github.io/civil-yoojin-alberto/
```

---

# 15. HTTPS

Con la dirección gratuita `github.io`, GitHub sirve el sitio mediante HTTPS.

No necesitas:

- certificado SSL comprado
- Cloudflare
- DNS
- dominio externo

---

# 16. Qué archivos NO necesitas

No necesitas:

```text
CNAME
package.json
node_modules/
Dockerfile
server.js
```

Este proyecto es un sitio estático.

El backend vive en Google Apps Script.

---

# 17. Checklist final

Antes de compartir el enlace:

- [ ] El repositorio es público.
- [ ] `index.html` está en la raíz.
- [ ] `styles.css` está en la raíz.
- [ ] `rsvp.js` está en la raíz.
- [ ] Existe la carpeta `assets/`.
- [ ] Las cinco imágenes están dentro de `assets/`.
- [ ] `.nojekyll` está en la raíz.
- [ ] GitHub Pages usa `main` + `/(root)`.
- [ ] Custom domain está vacío.
- [ ] No existe archivo `CNAME`.
- [ ] Apps Script fue desplegado como Web app.
- [ ] Apps Script permite acceso `Anyone`.
- [ ] `SCRIPT_URL` contiene una URL que termina en `/exec`.
- [ ] Una respuesta de prueba aparece en Google Sheets.
- [ ] El sitio se ve bien en tu teléfono.

---

# URL final recomendada

Si el repo se llama:

```text
civil-yoojin-alberto
```

usa:

```text
https://datalbertw.github.io/civil-yoojin-alberto/
```

Es gratis, no requiere registrar un dominio y seguirá funcionando mientras el repositorio y GitHub Pages estén activos.
