import { SearchResult } from './search-result';

import { Overlay } from '@/components/ui/overlay';

type Props = {
  isFocused: boolean;
  // TODO avoid prop drilling, use context or something else
  q: string;
  handleSubmit: () => void;
};

export const DiscoverSearchOverlay = ({ isFocused, q, handleSubmit }: Props) => (
  <Overlay bg="$backgroundMain" open={isFocused}>
    <SearchResult q={q} handleSubmit={handleSubmit} />
  </Overlay>
);
