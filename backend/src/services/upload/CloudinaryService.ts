import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../config/env';

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

interface UploadResult {
  url: string;
  publicId: string;
}

export class CloudinaryService {
  async upload(filePath: string): Promise<UploadResult> {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'dona-decor',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  async remove(publicId: string) {
    await cloudinary.uploader.destroy(publicId)

  }
}
