import { RelationShipListItem } from '@app/server/src/routes/user/relationship/types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';

import { RelationItem } from './relation-item/relation-item';

type Props = {
  users: RelationShipListItem[];
};

export const RelationList = ({ users }: Props) => {
  const renderItem = ({ item }: ListRenderItemInfo<RelationShipListItem>) => {
    return <RelationItem relation={item} />;
  };

  return (
    <FlashList
      data={users}
      renderItem={renderItem}
      estimatedItemSize={70}
      keyExtractor={(u) => `${u.id}`}
    />
  );
};
