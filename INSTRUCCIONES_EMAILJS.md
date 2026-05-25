# Guía de Configuración: Integración con EmailJS

Esta guía detalla los pasos para conectar el formulario de cotización de tu portafolio personal con tu cuenta de **EmailJS** para que las cotizaciones lleguen directamente a tu correo (`antuansabe@gmail.com`) con el formato estructurado **CLAUDE.md**.

---

## Paso 1: Crear una Cuenta en EmailJS
1. Dirígete a [https://www.emailjs.com/](https://www.emailjs.com/) y crea una cuenta gratuita.
2. Inicia sesión en tu panel de control (Dashboard).

---

## Paso 2: Configurar el Servicio de Correo (Email Service)
1. En el menú lateral izquierdo, haz clic en **"Email Services"**.
2. Haz clic en el botón **"Add New Service"**.
3. Selecciona tu proveedor de correo de preferencia (por ejemplo, **Gmail** o el que uses para `antuansabe@gmail.com`).
4. Conecta tu cuenta siguiendo los pasos de autorización de Google u otro proveedor.
5. Una vez creado, copia el **"Service ID"** (ej: `service_abc123`). Lo necesitarás para tu archivo `.env.local`.

---

## Paso 3: Crear la Plantilla de Correo (Email Template)
1. En el menú lateral izquierdo, haz clic en **"Email Templates"**.
2. Haz clic en **"Create New Template"**.
3. Configura la plantilla con los siguientes campos:

### Configuración de la Cabecera (Campos a la derecha o arriba):
- **To Email:** `antuansabe@gmail.com` (Tu correo de destino).
- **Subject:** `{{subject}}`
- **From Name:** `{{client_name}}`
- **Reply-To:** `{{client_email}}`

### Cuerpo del Mensaje (Content editor):
Pega exactamente el siguiente código de plantilla en el cuerpo del correo de EmailJS. Este cuerpo utiliza la variable dinámica `{{message}}` que es autogenerada en el formulario en formato Markdown estructurado:

```text
{{message}}
```

4. Haz clic en **"Save"** en la esquina superior derecha.
5. Copia el **"Template ID"** (ej: `template_xyz456`). Lo necesitarás para tu archivo `.env.local`.

---

## Paso 4: Obtener tu Clave Pública (Public Key)
1. En el menú lateral izquierdo, haz clic en **"Account"** (o "Integration" dependiendo de la versión de la interfaz).
2. Ve a la pestaña **"API Keys"** o busca la sección **"Public Key"**.
3. Copia tu **"Public Key"** (ej: `user_789xyz...`). Lo necesitarás para tu archivo `.env.local`.

---

## Paso 5: Configurar las Variables de Entorno Locales
1. Crea un archivo llamado `.env.local` en la raíz del proyecto (este archivo está listado en `.gitignore` para proteger tus claves).
2. Añade tus credenciales copiadas de la siguiente manera:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aquí
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aquí
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aquí
```

3. Guarda el archivo y reinicia tu servidor de desarrollo (`npm run dev`).

---

## ¿Cómo funciona el Fallback de Seguridad?
Si alguna de las variables anteriores está vacía o si ocurre un fallo de red/API al enviar los datos, la aplicación activará automáticamente una **pantalla de error inteligente**:
- Mostrará un mensaje amigable indicando que no se pudo procesar el envío automático.
- Renderizará un cuadro con todo el código **CLAUDE.md** pre-formateado y listo para copiar en un solo clic.
- Habilitará un botón azul premium **"Enviar por Email Directo"** que abre el cliente de correo predeterminado del usuario con tu email (`antuansabe@gmail.com`), el asunto adecuado y el brief completo pre-cargado.
