import { TRPCError } from '@trpc/server';
import cloudinary from 'cloudinary';
import { UploadImageInput } from '../schema';
import { generateImageName } from './generate-image-name';

type Options = {
  base64: string;
  category: UploadImageInput['category'];
  userId: number;
};

export const uploadImageToCloudinary = async ({ base64, userId, category }: Options) => {
  try {
    const imageName = generateImageName({ userId });

    const result = await cloudinary.v2.uploader.upload(base64, {
      folder: category,
      unique_filename: true,
      filename_override: imageName,
      transformation: [
        {
          width: 500,
          height: 500,
          crop: 'fill',
          quality: 90,
          fetch_format: 'auto',
          format: 'jpg',
        },
      ],
    });

    return result.url;
  } catch (err: any) {
    // if error is from api response
    if ('error' in err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: err,
        message: err.error.code,
      });
    }

    throw new TRPCError({
      code: 'BAD_REQUEST',
      cause: err,
    });
  }
};
