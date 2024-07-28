import { useState } from 'react';
import { Control, Path } from 'react-hook-form';

import { Select, SelectItem } from '@/components/ui/form/select';
import { CATEGORY_ICONS } from '@/constants/category';
import { trpc } from '@/lib/trpc';

type CategoryIconProps = {
  name: string;
};

const CategoryIcon = ({ name }: CategoryIconProps) => {
  const Icon = CATEGORY_ICONS[name];

  if (!Icon) return;

  return <Icon />;
};

type Props<T, Context = any> = {
  name: Path<T>;
  control: Control<T, Context>;
  error?: boolean;
  helperText?: string;
};

export const CategorySelect = <T extends object, Context>({ control, name }: Props<T, Context>) => {
  const { data: categories = [] } = trpc.category.list.useQuery();
  const [open, setOpen] = useState(false);

  return (
    <Select
      items={categories.map(
        (c) =>
          ({
            name: c.name,
            value: c.id,
            left: <CategoryIcon name={c.name as string} />,
          } as SelectItem)
      )}
      multiple
      control={control}
      name={name}
      open={open}
      onOpenChange={setOpen}
      placeholder="Select a category"
    />
  );
};
