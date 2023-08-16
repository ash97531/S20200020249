// import { register } from '../controllers/auth';
// import { Router } from 'express';
const { register, login } = require('../controllers/auth');
const { Router } = require('express');

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/signin', login);

// export default authRoutes;
module.exports = authRoutes;
