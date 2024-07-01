import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback } from 'react';

import { Text } from '@/components/ui/text';

export default function ProfileEdit() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Edit',
      });
    }, [])
  );

  return <Text>ProfileEdit</Text>;
}
