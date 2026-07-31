import { Request, Response } from 'express';
import { CloudinaryService } from '../services/upload/CloudinaryService';

const cloudinaryService = new CloudinaryService();

export class UploadController {

  async uploadImages(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem enviada.',
      });
    }

    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    const maxSize = 5 * 1024 * 1024;

    for (const file of files) {
      if (!allowedMimes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: `Arquivo ${file.originalname} possui formato inválido.`,
        });
      }

      if (file.size > maxSize) {
        return res.status(400).json({
          success: false,
          message: `Arquivo ${file.originalname} excede 5MB.`,
        });
      }
    }

    const uploadedImages = await Promise.all(
      files.map((file) => cloudinaryService.upload(file.path))
    );

    return res.status(200).json({
      success: true,
      data: uploadedImages.map((image) => ({
        url: image.url,
        publicId: image.publicId,
      })),
    });
  }
}