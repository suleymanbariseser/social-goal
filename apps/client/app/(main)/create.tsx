import { ScrollView } from 'tamagui';

import CreateActivityForm from '@/components/create/create-activity-form';
import CreateTools from '@/components/create/create-tools';

const Create = () => {
  return (
    <ScrollView>
      <CreateActivityForm />
      <CreateTools />
    </ScrollView>
  );
};

export default Create;
