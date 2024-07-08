import { SearchResult } from './search-result';

import { Overlay } from '@/components/ui/overlay';

type Props = {
  isFocused: boolean;
  q: string;
};

export const DiscoverSearchOverlay = ({ isFocused, q }: Props) => {
  return (
    <Overlay bg="$backgroundMain" open={isFocused}>
      <SearchResult q={q} />
    </Overlay>
  );
};
