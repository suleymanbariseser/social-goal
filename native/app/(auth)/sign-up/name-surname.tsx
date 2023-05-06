import { View } from 'react-native';
import Text from '../../../components/ui/Text';
import Row from '../../../components/ui/row';
import Input from '../../../components/ui/input';
import Column from '../../../components/ui/column';
import { Button } from '../../../components/ui/button';

export default function NameSurnameScreen() {
  return (
    <Column style={{ alignItems: 'center' }} gap='md'>
      <Text variant='headline1'>What is your name?</Text>
      <Input placeholder='Name' />
      <Input placeholder='Surname' />
      <Button variant='contained' color='background'>
        Next
      </Button>
    </Column>
  );
}
