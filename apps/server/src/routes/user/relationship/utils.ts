export type UserSettings = {
  blockedBy: boolean;
  blocking: boolean;
  followedBy: boolean;
  following: boolean;
  protected: boolean;
};

export const isUserAllowedToGetRelationships = async (settings: UserSettings) => {
  if (settings.blockedBy) return false;
  if (settings.protected && !settings.following) return false;
};
