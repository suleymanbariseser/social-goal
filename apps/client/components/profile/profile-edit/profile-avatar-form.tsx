import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';

type Props = {
  src: string;
};

export const ProfileAvatarForm = ({ src }: Props) => {
  const [image, setImage] = useState(src);

  const handlePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
      selectionLimit: 1,
      exif: false,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const baseImage = result.assets[0];

    // send baseImage.base64 to the server
    setImage(baseImage.uri);
  };

  return <Avatar size={100} src={image} onPress={handlePress} />;
};
