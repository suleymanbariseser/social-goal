export type UserItem = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  followedByMe: boolean;
};

export type RelationShipListItem = {
  id: number;
  user: UserItem;
};

export type RelationShipListResponse = {
  nextCursor: number | undefined;
  items: RelationShipListItem[];
};
