import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers/UploadController';
import { authMiddleware } from '../middlewares';

const router = Router();
const controller = new UploadController();

const upload = multer({ dest: 'uploads/' });

router.post('/images', authMiddleware, upload.array('images', 10), (req: any, res: any) =>
  controller.uploadImages(req, res),
);

export { router as uploadRoutes };
