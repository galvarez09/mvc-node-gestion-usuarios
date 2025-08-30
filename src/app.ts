import express from 'express';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

// Importar configuración de base de datos
import connectDB from './config/database';

// Importar rutas
import userRoutes from './routes/userRoutes';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para pasar variables globales a las vistas
app.use((req: any, res: any, next: any) => {
  // @ts-ignore
  res.locals.user = req.session.user || null;
  // @ts-ignore
  res.locals.success = req.session.success || null;
  // @ts-ignore
  res.locals.error = req.session.error || null;
  
  // Limpiar mensajes flash
  // @ts-ignore
  delete req.session.success;
  // @ts-ignore
  delete req.session.error;
  
  next();
});

// Configurar rutas
app.use('/users', userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Middleware de manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    message: 'Algo salió mal',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
