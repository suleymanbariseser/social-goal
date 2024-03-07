import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

type Props = {
  id: number;
};

export const GoalHeaderTitle = ({ id }: Props) => {
  const { data } = trpc.goal.summary.useQuery({ id });

  return (
    <Text ta="center" variant="subtitle1">
      {data?.title}
    </Text>
  );
};
