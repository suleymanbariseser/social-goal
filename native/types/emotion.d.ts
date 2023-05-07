import '@emotion/react'
import type { Theme as ExistingTheme } from '@/lib/theme'

declare module '@emotion/react' {
  export interface Theme extends ExistingTheme {}
}