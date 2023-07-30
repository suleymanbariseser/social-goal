import * as toast from '@tamagui/toast';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '@tamagui/toast' {
  interface CustomData {
    variant: 'error' | 'success' | 'warning';
  }
}
