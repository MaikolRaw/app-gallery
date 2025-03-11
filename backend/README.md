README - Proyecto Ionic/Angular con Galería de Fotos y Autenticación JWT

Este proyecto consiste en una aplicación desarrollada con Ionic y Angular (en modo standalone), que muestra una galería de fotos. Para capturar fotografías se utiliza la cámara (vía Capacitor). Además, incluye un backend en Node.js/Express con autenticación JWT para que cada usuario solo pueda ver y subir sus propias fotos.

Requisitos Previos
Node.js (versión 14 o superior).
NPM (generalmente se instala junto con Node.js).
Ionic CLI instalado de manera global (opcional, pero recomendable).


npm install -g @ionic/cli
Capacitor CLI (si no se instaló junto con Ionic).


npm install -g @capacitor/cli
Android Studio (para compilar y emular en Android) o Xcode (para iOS), según la plataforma deseada.
MongoDB instalado o un servicio en la nube (Mongo Atlas).
Se debe contar con una URI de conexión en la variable MONGO_URI dentro de un archivo .env en el backend.
Estructura del Proyecto
frontend/
Contiene el proyecto Ionic/Angular en modo standalone.
backend/
Contiene el proyecto Node.js con Express, configuraciones, controladores, modelos, etc.
La estructura puede variar si uniste el backend y frontend en una misma carpeta. Ajusta según tu caso.

Instrucciones de Instalación
1. Clonar el repositorio


git clone <URL_DEL_REPOSITORIO>
cd <carpeta_del_proyecto>
2. Configurar el Backend
Ve a la carpeta del backend:


cd backend
Instala dependencias:


npm install
Crea un archivo .env (o ajusta el existente) con las siguientes variables (ejemplo):
ini

PORT=4000
MONGO_URI=mongodb://localhost:27017/miapp
JWT_SECRET="ClaveSuperSecreta"
Inicia el servidor:


npm start
El servidor se iniciará en http://localhost:4000 (por defecto).
Confirma que tu base de datos MongoDB está corriendo.
3. Configurar el Frontend (Ionic/Angular)
Regresa a la carpeta del proyecto frontend:


cd ../frontend
Instala las dependencias:


npm install
Asegúrate de que en tus servicios (auth.service.ts, photo.service.ts, etc.) las URLs apunten a tu backend. Por ejemplo, si estás probando en web, podrías usar:
ts

private apiUrl = 'http://localhost:4000/api/...';
Y si deseas probar en un emulador Android (Capacitor) usando el simulador de Android Studio, la IP por defecto del “host” suele ser 10.0.2.2. Entonces se podría configurar algo así:
ts

// Para emulador Android
private apiUrl = 'http://10.0.2.2:4000/api/...';
Ajusta según tu entorno.
4. Correr la App en el Navegador
Para probar rápidamente en un navegador:



ionic serve
O, si no tienes Ionic CLI instalado de manera global, puedes usar:



npm run start
(Si tu script en package.json está configurado para ello.)

5. Compilar y Probar en Android
Construir el proyecto Angular:



npm run build
(o ionic build, dependiendo de tu configuración).

Agregar la plataforma Android (solo la primera vez):



npx cap add android
Si ya existe la carpeta android/, no es necesario volver a hacerlo (aunque puedes eliminarla y re-agregarla si deseas).

 los archivos web compilados a la carpeta nativa:



npx cap copy android
npx cap sync android
Abrir Android Studio:



npx cap open android
Una vez abierto en Android Studio, selecciona un emulador o dispositivo real para correr la app.

Nota: Para que el backend sea accesible desde el emulador, verifica tu URL en los servicios Angular con http://10.0.2.2:4000 en lugar de http://localhost:4000.

6. Uso de Scripts (Ejemplo)
En tu package.json podrías tener scripts como:

json

{
  "scripts": {
    "start": "ionic serve",
    "build": "ng build",
    "build:android": "ng build && npx cap add android && npx cap copy android && npx cap sync android",
    "run:android": "npx cap open android"
  }
}
npm run build:android: Construye el proyecto, añade la plataforma Android (si no existe) y hace la copia/sincronización de archivos web.
npm run run:android: Abre Android Studio para que puedas compilar y ejecutar en el emulador/dispositivo.
Flujo de la Aplicación
Registro de Usuario: En la pantalla de Registro (/register) se ingresa username y password. Se envían al backend para crear el usuario en la base de datos.
Login: En la pantalla de Login (/login), se ingresa username y password. El backend responde con un token JWT que se almacena en localStorage.
Galería:
Al ingresar a la galería (/gallery), se llama al endpoint /api/photos con el token adjuntado en la cabecera (Authorization: Bearer <token>).
El backend filtra las fotos por el userId decodificado en el token, retornando únicamente las del usuario autenticado.
Subir Foto:
Al presionar Añadir Foto, se abre la cámara (Capacitor Camera) y se obtiene la imagen en Base64.
Se envía la imagen en Base64 al backend, junto con el token.
El backend crea un documento en la base de datos con el imageBase64 y el userId.
Cerrar Sesión:
Se elimina el token de localStorage.
Se redirige al login o la pantalla principal.
Observaciones
Si se quiere probar la cámara en el navegador, se debe usar Ionic PWA Elements (se importan los componentes para el uso de la cámara en web).
Para iOS, se siguen pasos similares, pero se usaría:


npx cap add ios
npx cap copy ios
npx cap sync ios
npx cap open ios
Asegúrate de habilitar la cámara en las configuraciones de tu emulador o dispositivo.
Troubleshooting (Problemas Comunes)
Error de CORS:
Verifica que tu backend tenga cors() configurado y que la URL (origin) sea la correcta.
No se ve el CSS en Android:
Asegúrate de compilar correctamente y hacer npx cap copy android && npx cap sync android.
Revisa que no haya overrides en el styles.xml del proyecto nativo.
Token inválido:
Revisa que la hora del emulador/dispositivo coincida con la del PC (a veces la expiración del token se adelanta).
Imposible conectar al backend:
Reemplaza localhost por 10.0.2.2 en el emulador Android.
Asegúrate de que el puerto 4000 esté abierto.
Licencia
Este proyecto se distribuye con fines educativos. Se puede adaptar y reutilizar de acuerdo a las necesidades.

