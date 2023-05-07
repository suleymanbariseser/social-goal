import Text from '@/components/ui/Text';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import Input from '@/components/ui/input';

export default function NameSurnameScreen() {
  return (
    <Column sx={{ alignItems: 'center' }} gap={4}>
      <Text variant='headline1'>What is your name?</Text>
      <Input placeholder='Name' />
      <Input placeholder='Surname' />
      <Button variant='contained' color='background'>
        Next
      </Button>
    </Column>
  );
}
