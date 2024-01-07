import { UploadImageInput } from '@app/server/src/routes/upload/schema';
import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useUploadImage = () => {
  const toast = useToastController();
  const { data, mutateAsync } = trpc.upload.image.useMutation();

  const uploadImage = async (input: UploadImageInput) => {
    try {
      const result = await mutateAsync({
        data: input.data,
        category: input.category,
      });

      return result;
    } catch (err: any) {
      console.log('err', err);
      toast.show('Image upload failed', {
        variant: 'error',
      });
      return undefined;
    }
  };

  return {
    data,
    uploadImage,
  };
};
