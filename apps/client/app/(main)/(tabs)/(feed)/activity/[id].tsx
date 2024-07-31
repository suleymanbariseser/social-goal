import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Stack } from 'tamagui';

import { ActivityCard, ActivityCommentInput, ActivityCommentList } from '@/components/activity';
import { ActivitySettingsModal } from '@/components/activity/activity-list/activity-settings';
import { AnimatedStack } from '@/components/ui/animated-layout';
import { Divider } from '@/components/ui/divider';
import { useLike } from '@/hooks/activity/use-like';
import { trpc } from '@/lib/trpc';

export default function Activity() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const likeActivity = useLike();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { data: activity } = trpc.activity.activityWithId.useQuery(
    { id: +id },
    {
      enabled: !!id,
    }
  );

  const handlePressAvatar = () => {
    router.push(`/profile/${activity?.creator.id}`);
  };

  if (!activity) return null;

  return (
    <AnimatedStack f={1} px="$2">
      <ActivityCommentList
        header={
          <Stack>
            <ActivityCard
              goal={{
                id: activity.goal.id,
                title: activity.goal.title,
              }}
              admin={{
                name: activity.creator.fullName,
                img: activity.creator.image,
              }}
              comments={activity.comments}
              content={activity.content}
              likes={activity.likes}
              createdAt={activity.createdAt}
              shares={3}
              assets={activity.assets}
              onPressAvatar={handlePressAvatar}
              onPressLike={() => likeActivity(+id)}
              likedByMe={activity.likedByMe}
              onPressSettings={() => setSettingsOpen(true)}
            />
            <Divider />
          </Stack>
        }
        activityId={+id}
      />
      <ActivitySettingsModal
        activityId={activity.id}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onDelete={() => {
          router.replace('/');
        }}
      />
      <ActivityCommentInput activityId={+id} />
    </AnimatedStack>
  );
}
