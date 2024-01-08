import { nanoid } from '@packages/helpers';
import { useToastController } from '@tamagui/toast';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export type Asset = {
  id: string;
  uri: string;
  loading: boolean;
  failed: boolean;
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

    const baseImage = result.assets[0];
    const imageId = nanoid();

    setAssets((s) => [
      ...s,
      {
        id: imageId,
        uri: baseImage.uri,
        loading: true,
        failed: false,
      },
    ]);

    const image = await uploader(baseImage.base64);

    if (!image) {
      setAssets((s) => {
        const index = s.findIndex((a) => a.id === imageId);
        if (index < 0) return s;

        const newAssets = [...s];
        newAssets[index].loading = false;
        newAssets[index].failed = true;

        return newAssets;
      });

      return;
    }

    setAssets((s) => {
      const index = s.findIndex((a) => a.id === imageId);
      if (index < 0) return s;

      const newAssets = [...s];
      newAssets[index].loading = false;
      newAssets[index].uri = image;

      return newAssets;
    });
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
