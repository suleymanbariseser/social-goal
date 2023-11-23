type NetworkActivityAlike = {
  id: number;
  likes: number;
};

type ActivityCacheItem = {
  likes: number;
  comments: number;
  shares: number;
};

export class FeedCache {
  cache: Map<number, ActivityCacheItem>;

  constructor() {
    this.cache = new Map<number, ActivityCacheItem>();
  }

  getActivity = (activityId: number) => {
    return (
      this.cache.get(activityId) ?? {
        likes: 0,
        comments: 0,
        shares: 0,
      }
    );
  };

  sync = (activities: NetworkActivityAlike[]) => {
    activities.map((activity) => {
      this.update(activity);
    });
  };

  update = (activity: NetworkActivityAlike) => {
    const cache = this.getActivity(activity.id);

    this.cache.set(activity.id, {
      ...cache,
      likes: activity.likes,
    });
  };

  increment = (activityId: number, type: 'likes' | 'comments' | 'shares') => {
    const cache = this.getActivity(activityId);

    this.cache.set(activityId, {
      ...cache,
      [type]: cache[type] + 1,
    });

    return this.getActivity(activityId);
  };

  decrement = (activityId: number, type: 'likes' | 'comments' | 'shares') => {
    const cache = this.getActivity(activityId);

    this.cache.set(activityId, {
      ...cache,
      [type]: cache[type] - 1,
    });

    return this.getActivity(activityId);
  };
}
