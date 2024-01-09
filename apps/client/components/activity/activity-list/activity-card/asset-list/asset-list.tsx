import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Carousel, { CarouselRenderItem } from 'react-native-reanimated-carousel';
import { Image, Stack } from 'tamagui';

type Props = {
  assets: string[];
};

export const AssetList = ({ assets }: Props) => {
  const [width, setWidth] = useState(0);

  const renderItem: CarouselRenderItem<string> = ({ item }) => {
    return <Image w={width} h={200} source={{ uri: item }} br="$6" ov="hidden" />;
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <Stack w="100%" onLayout={handleLayout}>
      {width > 0 && (
        <Carousel loop={false} width={width} height={200} data={assets} renderItem={renderItem} />
      )}
    </Stack>
  );
};
