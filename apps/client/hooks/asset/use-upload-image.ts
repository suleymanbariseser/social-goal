import { UploadImageInput } from '@app/server/src/routes/upload/schema';
import { useToastController } from '@tamagui/toast';

import { trpc } from '@/lib/trpc';

export const useUploadImage = () => {
  const toast = useToastController();
  const { data, mutateAsync } = trpc.upload.image.useMutation();

  const uploadImage = async (input: UploadImageInput) => {
    const result = await mutateAsync({
      data: input.data,
      category: input.category,
    });

    if (!result) {
      toast.show('Image uploaded', {
        variant: 'success',
      });

      return undefined;
    }

    return result;
  };

  return {
    data,
    uploadImage,
  };
};
