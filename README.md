# 🚀 Sistema de Gestión de Usuarios

Un sistema completo de gestión de usuarios desarrollado con **Node.js**, **Express**, **TypeScript** y **MongoDB**, siguiendo el patrón **MVC** y con una interfaz moderna usando **Tailwind CSS**.

## ✨ Características

- **🔐 CRUD completo de usuarios** (Crear, Leer, Actualizar, Eliminar)
- **🔍 Búsqueda y filtrado** de usuarios por nombre o email
- **📄 Paginación** con límites configurables
- **👥 Roles de usuario** (Admin y Usuario)
- **✅ Gestión de estado** (Activo/Inactivo)
- **🔒 Encriptación de contraseñas** con bcrypt
- **📱 Diseño responsive** con Tailwind CSS
- **⚡ Validaciones** del lado del servidor y cliente
- **🎨 Interfaz moderna** y fácil de usar
- **📊 Mensajes flash** para feedback del usuario
- **🛡️ Manejo de errores** robusto

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MongoDB + Mongoose
- **Frontend**: EJS + Tailwind CSS
- **Autenticación**: bcryptjs para encriptación
- **Validación**: express-validator
- **Sesiones**: express-session + connect-mongo

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **MongoDB** (instalado y ejecutándose)
- **npm** o **yarn**

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd node-typescript-mongodb
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user_management
SESSION_SECRET=tu_secreto_super_seguro_aqui
NODE_ENV=development
```

### 4. Compilar TypeScript
```bash
npm run build
```

### 5. Iniciar la aplicación
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 🌐 Uso

Una vez iniciada la aplicación, puedes acceder a:

- **URL principal**: `http://localhost:3000`
- **Gestión de usuarios**: `http://localhost:3000/users`

## 📁 Estructura del Proyecto

```
src/
├── app.ts                 # Archivo principal de la aplicación
├── config/
│   └── database.ts       # Configuración de MongoDB
├── controllers/
│   └── userController.ts # Controlador de usuarios
├── models/
│   └── User.ts          # Modelo de usuario con Mongoose
├── routes/
│   └── userRoutes.ts    # Rutas de la API
└── views/
    ├── layouts/
    │   └── main.ejs     # Layout principal
    ├── users/
    │   ├── index.ejs    # Lista de usuarios
    │   ├── create.ejs   # Formulario de creación
    │   ├── edit.ejs     # Formulario de edición
    │   └── show.ejs     # Vista de detalles
    └── error.ejs        # Página de error
```

## 🔧 Scripts Disponibles

- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia la aplicación en modo producción
- `npm run dev` - Inicia la aplicación en modo desarrollo con nodemon
- `npm run watch` - Compila TypeScript en modo watch

## 📊 Funcionalidades del CRUD

### 👥 Crear Usuario
- Formulario con validaciones
- Encriptación automática de contraseña
- Selección de rol (Admin/Usuario)

### 📋 Listar Usuarios
- Vista paginada con búsqueda
- Filtros por nombre y email
- Límites configurables (10, 25, 50 usuarios por página)

### 👁️ Ver Usuario
- Vista detallada con toda la información
- Estadísticas del usuario
- Acciones rápidas (editar, cambiar estado, eliminar)

### ✏️ Editar Usuario
- Formulario pre-llenado con datos actuales
- Validaciones en tiempo real
- No se puede cambiar la contraseña (por seguridad)

### 🗑️ Eliminar Usuario
- Confirmación antes de eliminar
- Eliminación permanente de la base de datos

### 🔄 Cambiar Estado
- Activar/Desactivar usuarios
- Confirmación antes del cambio

## 🔒 Seguridad

- **Encriptación de contraseñas** con bcrypt (salt rounds: 12)
- **Validación de entrada** con express-validator
- **Sanitización de datos** para prevenir XSS
- **Sesiones seguras** con MongoDB como store
- **Validación del lado del cliente** para mejor UX

## 🎨 Interfaz de Usuario

- **Diseño responsive** que funciona en todos los dispositivos
- **Tailwind CSS** para estilos modernos y consistentes
- **Iconos SVG** para mejor experiencia visual
- **Mensajes flash** para feedback inmediato
- **Confirmaciones** para acciones destructivas
- **Estados de carga** y manejo de errores

## 🚨 Manejo de Errores

- **Middleware de errores** centralizado
- **Páginas de error** personalizadas
- **Logs detallados** en modo desarrollo
- **Mensajes de error** amigables para el usuario

## 📈 Características Avanzadas

- **Búsqueda en tiempo real** con filtros
- **Paginación inteligente** con navegación
- **Ordenamiento** por fecha de creación
- **Estados visuales** para roles y estado activo
- **Información contextual** en cada vista

## 🔧 Configuración de MongoDB

Asegúrate de que MongoDB esté ejecutándose en tu sistema:

```bash
# Iniciar MongoDB (Ubuntu/Debian)
sudo systemctl start mongod

# Iniciar MongoDB (macOS con Homebrew)
brew services start mongodb-community

# Iniciar MongoDB (Windows)
net start MongoDB
```

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/user_management` |
| `SESSION_SECRET` | Secreto para las sesiones | `default_secret` |
| `NODE_ENV` | Entorno de ejecución | `development` |

## 🚀 Despliegue

### Heroku
```bash
# Configurar variables de entorno
heroku config:set MONGODB_URI=tu_uri_de_mongodb
heroku config:set SESSION_SECRET=tu_secreto_seguro
heroku config:set NODE_ENV=production

# Desplegar
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🙏 Agradecimientos

- **Express.js** por el framework web
- **MongoDB** por la base de datos
- **Tailwind CSS** por los estilos
- **TypeScript** por el tipado estático
- **Mongoose** por el ODM de MongoDB

---

**¡Disfruta desarrollando con este sistema de gestión de usuarios! 🎉**
