export type RelationShipListItemUser = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  followedByMe: boolean;
};

export type RelationShipListItem = {
  id: number;
  user: RelationShipListItemUser;
};

export type RelationShipListResponse = {
  nextCursor: number | undefined;
  items: RelationShipListItem[];
};
