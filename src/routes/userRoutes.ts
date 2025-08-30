import express from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  showUser,
  deleteUser,
  toggleUserStatus
} from '../controllers/userController';

const router = express.Router();

// Validaciones para crear/editar usuario
const userValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .escape(),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Por favor ingresa un email válido'),
  
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('El rol debe ser admin o user')
];

// Rutas para usuarios
router.get('/', getAllUsers);

// Crear usuario
router.get('/create', showCreateForm);
router.post('/', userValidation, createUser);

// Ver usuario
router.get('/:id', showUser);

// Editar usuario
router.get('/:id/edit', showEditForm);
router.put('/:id', userValidation, updateUser);

// Eliminar usuario
router.delete('/:id', deleteUser);

// Cambiar estado del usuario
router.patch('/:id/toggle-status', toggleUserStatus);

export default router;
