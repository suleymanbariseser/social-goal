import { TRPCError } from '@trpc/server';
import sharp from 'sharp';

export const compressImage = async (base64: string) => {
  try {
    const imgBuffer = Buffer.from(base64, 'base64');

    const image = await sharp(imgBuffer)
      .resize({
        fit: sharp.fit.cover,
        width: 512,
        height: 512,
      })
      .toBuffer();

    return 'data:image/jpeg;base64,' + image.toString('base64');
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      cause: err,
      message: err.message ?? 'UNKNOWN',
    });
  }
};

export const compressImages = (base64arr: string[]) => {
  return Promise.all(base64arr.map(compressImage));
};
