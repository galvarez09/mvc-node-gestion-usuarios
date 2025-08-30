# 🗄️ Configuración de la Base de Datos

## 📋 Requisitos Previos

1. **MongoDB instalado** en tu sistema
2. **MongoDB ejecutándose** en el puerto por defecto (27017)

## 🚀 Iniciar MongoDB

### Windows
```cmd
# Iniciar el servicio de MongoDB
net start MongoDB

# O iniciar manualmente
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

### macOS (con Homebrew)
```bash
# Iniciar MongoDB
brew services start mongodb-community

# Verificar estado
brew services list | grep mongodb
```

### Linux (Ubuntu/Debian)
```bash
# Iniciar MongoDB
sudo systemctl start mongod

# Verificar estado
sudo systemctl status mongod

# Habilitar inicio automático
sudo systemctl enable mongod
```

## 🔧 Verificar Conexión

Una vez que MongoDB esté ejecutándose, puedes verificar la conexión:

```bash
# Conectar a MongoDB
mongosh

# O con el cliente anterior
mongo
```

## 📊 Crear Base de Datos

```javascript
// Conectar a MongoDB
use user_management

// Verificar que la base de datos existe
show dbs
```

## 👥 Crear Usuario de Prueba

Puedes crear un usuario administrador directamente en MongoDB:

```javascript
use user_management

db.users.insertOne({
  name: "Administrador",
  email: "admin@ejemplo.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8K8J8K8", // "123456"
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🔍 Verificar Datos

```javascript
// Ver todos los usuarios
db.users.find()

// Ver usuarios activos
db.users.find({isActive: true})

// Ver usuarios por rol
db.users.find({role: "admin"})
```

## 🚨 Solución de Problemas

### Error: "MongoDB connection failed"
- Verifica que MongoDB esté ejecutándose
- Verifica el puerto (por defecto 27017)
- Verifica que no haya firewall bloqueando la conexión

### Error: "Authentication failed"
- Verifica que no tengas autenticación habilitada
- Si tienes autenticación, configura las credenciales en el archivo .env

### Error: "Database not found"
- La base de datos se crea automáticamente al insertar el primer documento
- No es necesario crearla manualmente

## 📝 Variables de Entorno

Asegúrate de que tu archivo `.env` contenga:

```env
MONGODB_URI=mongodb://localhost:27017/user_management
```

## 🎯 Próximos Pasos

1. **Inicia MongoDB** en tu sistema
2. **Verifica la conexión** con mongosh
3. **Inicia la aplicación** con `npm run dev`
4. **Accede a** `http://localhost:3000/users`
5. **Crea tu primer usuario** usando el formulario web

## 🔗 Recursos Adicionales

- [Documentación oficial de MongoDB](https://docs.mongodb.com/)
- [Guía de instalación de MongoDB](https://docs.mongodb.com/manual/installation/)
- [MongoDB Compass (GUI)](https://www.mongodb.com/products/compass)
