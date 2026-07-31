import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import { authRoutes } from './authRoutes';
import { catalogoRoutes } from './catalogoRoutes';
import { categoriaRoutes } from './categoriaRoutes';
import { produtoRoutes } from './produtoRoutes';
import { bannerRoutes } from './bannerRoutes';
import { configuracaoRoutes } from './configuracaoRoutes';
import { clienteRoutes } from './clienteRoutes';
import { pedidoRoutes } from './pedidoRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { uploadRoutes } from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/catalog', catalogoRoutes);

router.use('/categories', authMiddleware, categoriaRoutes);
router.use('/products', authMiddleware, produtoRoutes);
router.use('/banners', authMiddleware, bannerRoutes);
router.use('/settings', authMiddleware, configuracaoRoutes);
router.use('/clients', authMiddleware, clienteRoutes);
router.use('/orders', authMiddleware, pedidoRoutes);
router.use('/dashboard', authMiddleware, dashboardRoutes);
router.use('/uploads', uploadRoutes);

export { router };
