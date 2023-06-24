import { storageAtom } from '@/lib/storage';

export const authTokenState = storageAtom<string>('auth_token', true);
