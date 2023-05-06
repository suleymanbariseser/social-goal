import { useNavigation, useRouter, useSegments } from 'expo-router';
import * as React from 'react';

export default function AuthProvider(props: React.PropsWithChildren) {
  const rootSegment = useSegments()[0];
  const router = useRouter();

  const user = null;

  React.useEffect(() => {
    if (user === undefined) {
      return;
    }
    
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== '(auth)'
      ) {
      console.log('here');
      router.replace('/sign-up/name-surname');
    } else if (user && rootSegment !== '(app)') {
      router.replace('/');
    }
  }, [user, rootSegment]);

  return <>{props.children}</>;
}
