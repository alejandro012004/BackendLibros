# 📚 API de Gestión de Libros - Proyecto PSP

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

Este proyecto es una API REST profesional diseñada para gestionar un catálogo de libros, integrando **Firebase Firestore** como base de datos y utilizando **Docker** para garantizar la replicabilidad del entorno.

---

## 📋 Requisitos Previos

Para ejecutar este proyecto, necesitarás:
* **Node.js** (v18 o superior)
* **Docker Desktop** (para ejecución en contenedores)
* **Credenciales de Firebase**: Debes poseer el archivo `serviceAccountKey.json`.

---

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-enlace-de-github>
   cd <nombre-de-tu-carpeta>
Configurar Credenciales (OBLIGATORIO):
Para que la app conecte con la base de datos, coloca tu archivo de clave privada en la raíz del proyecto con el nombre:

serviceAccountKey.json
(Este archivo está excluido del repositorio por seguridad).

🗄️ Inicialización de Datos (Seeding)
He incluido un script de automatización que carga el catálogo inicial de libros directamente en tu instancia de Firebase.

Para poblar la base de datos, ejecuta:

Bash

npm install
npm run seed
⚙️ Modos de Ejecución
A. Docker (Recomendado para Evaluación)
Para levantar todo el entorno (API + Configuración) con un solo comando:

Bash

docker-compose up --build
La API estará disponible en: http://localhost:3000

B. Local (Desarrollo)
Bash

npm run dev
🚀 Puntos destacados para la Defensa
Automatización: Uso de un script de seeding para asegurar datos de prueba inmediatos.

Contenedorización: Configuración completa de Docker para asegurar que el proyecto sea replicable.

Seguridad: Gestión de credenciales mediante archivos externos protegidos.


---

### 2. `docker-compose.yml` (El orquestador)
Este archivo hace que el comando `docker-compose up` funcione.
```yaml
version: '3.8'

services:
  api:
    build: .
    container_name: api_libros_psp
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    restart: always
3. Dockerfile (La receta del contenedor)
Dockerfile

# Usamos una imagen ligera de Node
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código (incluyendo serviceAccountKey.json si existe)
COPY . .

# Exponemos el puerto de la API
EXPOSE 3000

# Comando para arrancar
CMD ["npm", "start"]
4. .gitignore (Seguridad ante todo)
¡Copia esto para no subir tus contraseñas a GitHub por accidente!

Plaintext

# Dependencias
node_modules/

# Seguridad (Credenciales Firebase)
serviceAccountKey.json

# Variables de entorno
.env

# Logs y otros
npm-debug.log*
.DS_Store
💡 Último paso en tu package.json
Asegúrate de que tus scripts se vean así para que los comandos del README funcionen:

JSON

"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "seed": "node import.js"
}
