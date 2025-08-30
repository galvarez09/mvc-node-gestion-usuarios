import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import User, { IUser } from '../models/User';

// Tipos para extender Request
interface AuthRequest extends Request {
  session: any;
}

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    
    const skip = (page - 1) * limit;
    
    // Construir filtro de búsqueda
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    
    res.render('users/index', {
      title: 'Gestión de Usuarios',
      users,
      currentPage: page,
      totalPages,
      total,
      search,
      limit
    });
    
  } catch (error) {
    next(error);
  }
};

// Mostrar formulario para crear usuario
export const showCreateForm = (req: Request, res: Response): void => {
  res.render('users/create', {
    title: 'Crear Nuevo Usuario',
    user: {}
  });
};

// Crear nuevo usuario
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('users/create', {
        title: 'Crear Nuevo Usuario',
        user: req.body,
        errors: errors.array()
      });
    }
    
    const { name, email, password, role } = req.body;
    
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('users/create', {
        title: 'Crear Nuevo Usuario',
        user: req.body,
        errors: [{ msg: 'El email ya está registrado' }]
      });
    }
    
    // Crear nuevo usuario
    const user = new User({
      name,
      email,
      password,
      role: role || 'user'
    });
    
    await user.save();
    
    // @ts-ignore
    req.session.success = 'Usuario creado exitosamente';
    res.redirect('/users');
    
  } catch (error) {
    next(error);
  }
};

// Mostrar formulario para editar usuario
export const showEditForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      // @ts-ignore
      req.session.error = 'Usuario no encontrado';
      return res.redirect('/users');
    }
    
    res.render('users/edit', {
      title: 'Editar Usuario',
      user
    });
    
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const user = await User.findById(req.params.id).select('-password');
      return res.render('users/edit', {
        title: 'Editar Usuario',
        user: { ...user?.toObject(), ...req.body },
        errors: errors.array()
      });
    }
    
    const { name, email, role, isActive } = req.body;
    
    // Verificar si el email ya existe en otro usuario
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingUser) {
      const user = await User.findById(req.params.id).select('-password');
      return res.render('users/edit', {
        title: 'Editar Usuario',
        user: { ...user?.toObject(), ...req.body },
        errors: [{ msg: 'El email ya está registrado por otro usuario' }]
      });
    }
    
    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        role,
        isActive: isActive === 'true'
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      // @ts-ignore
      req.session.error = 'Usuario no encontrado';
      return res.redirect('/users');
    }
    
    // @ts-ignore
    req.session.success = 'Usuario actualizado exitosamente';
    res.redirect('/users');
    
  } catch (error) {
    next(error);
  }
};

// Mostrar detalles del usuario
export const showUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      // @ts-ignore
      req.session.error = 'Usuario no encontrado';
      return res.redirect('/users');
    }
    
    res.render('users/show', {
      title: 'Detalles del Usuario',
      user
    });
    
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      // @ts-ignore
      req.session.error = 'Usuario no encontrado';
      return res.redirect('/users');
    }
    
    // @ts-ignore
    req.session.success = 'Usuario eliminado exitosamente';
    res.redirect('/users');
    
  } catch (error) {
    next(error);
  }
};

// Cambiar estado activo/inactivo del usuario
export const toggleUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      // @ts-ignore
      req.session.error = 'Usuario no encontrado';
      return res.redirect('/users');
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    const status = user.isActive ? 'activado' : 'desactivado';
    // @ts-ignore
    req.session.success = `Usuario ${status} exitosamente`;
    res.redirect('/users');
    
  } catch (error) {
    next(error);
  }
};
