import { nanoid } from '@packages/helpers';
import { useToastController } from '@tamagui/toast';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

type Asset = {
  id: string;
  uri: string;
};

type Options = {
  uploader: (base64: string) => Promise<string>;
};

export const useImagePicker = ({ uploader }: Options) => {
  const toast = useToastController();
  const [assets, setAssets] = useState<Asset[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
      selectionLimit: 1,
      exif: false,
      base64: true,
    });

    if (result.canceled) {
      toast.show('Image picker canceled', {
        variant: 'error',
      });

      return;
    }

    const image = await uploader(result.assets[0].base64);

    if (!image) return;

    setAssets((s) => [
      ...s,
      {
        id: nanoid(),
        uri: image,
      },
    ]);
  };

  const removeAsset = (id: string) => {
    setAssets((s) => s.filter((a) => a.id !== id));
  };

  return {
    pickImage,
    assets,
    removeAsset,
  };
};
