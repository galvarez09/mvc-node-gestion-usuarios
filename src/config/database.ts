import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado exitosamente');
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
    console.log(`🔌 URI: ${mongoURI}`);
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

// Manejo de señales de terminación
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔄 Conexión a MongoDB cerrada por terminación de la aplicación');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cerrando conexión:', error);
    process.exit(1);
  }
});

export default connectDB;
