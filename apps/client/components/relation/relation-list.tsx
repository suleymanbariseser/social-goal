import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { Stack } from 'tamagui';

import { RelationItem } from './relation-item/relation-item';
import { RelationListEmpty } from './relation-list-empty';

type Props = {
  users: RelationShipListItem[];
  emptyText: string;
};

export const RelationList = ({ users, emptyText }: Props) => {
  const renderItem = ({ item }: ListRenderItemInfo<RelationShipListItem>) => {
    return <RelationItem relation={item} />;
  };

  return (
    <FlashList
      data={users}
      renderItem={renderItem}
      estimatedItemSize={70}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      keyExtractor={(u) => `${u.id}`}
      ListEmptyComponent={<RelationListEmpty text={emptyText} />}
    />
  );
};
