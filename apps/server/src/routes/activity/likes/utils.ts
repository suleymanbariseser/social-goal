import { feedCache, feedEmitter } from '../utils';

export const incrementLikeCount = (activityId: number) => {
  const activity = feedCache.increment(activityId, 'likes');

  feedEmitter.emit({
    activityId,
    type: 'like',
    payload: activity.likes,
  });
};

export const decrementLikeCount = (activityId: number) => {
  const activity = feedCache.decrement(activityId, 'likes');

  feedEmitter.emit({
    activityId,
    type: 'like',
    payload: activity.likes,
  });
};
