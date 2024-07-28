import {
  Banknote,
  Book,
  Construction,
  File,
  GraduationCap,
  Heart,
  Music,
  Plane,
  Sailboat,
} from '@tamagui/lucide-icons';

export const CATEGORY_ICONS = {
  skills: GraduationCap,
  travel: Plane,
  finance: Banknote,
  health: Heart,
  work: Construction,
  study: Book,
  productivity: File,
  sports: Sailboat,
  music: Music,
} as const satisfies Record<string, React.NamedExoticComponent<any>>;
