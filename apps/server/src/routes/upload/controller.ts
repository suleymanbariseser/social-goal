import { ProtectedInputOptions } from '@/types/trpc';
import { UploadImageInput } from './schema';
import { compressImage } from './utils/compress-image';
import { uploadImageToCloudinary } from './utils/upload-image-to-cloudinary';

export const uploadImage = async ({ ctx, input }: ProtectedInputOptions<UploadImageInput>) => {
  const base64 = await compressImage(input.data);
  const image = await uploadImageToCloudinary({
    base64,
    category: input.category,
    userId: ctx.user.id,
  });

  return image;
};
