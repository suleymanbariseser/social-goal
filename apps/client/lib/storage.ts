import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStorage from 'expo-secure-store';
import { useSyncExternalStore } from 'react';

export const StorageUtil = {
  get: async <T>(name: string, secure?: boolean): Promise<T | null> => {
    let value: string;

    if (secure) value = await SecureStorage.getItemAsync(name);
    else value = await AsyncStorage.getItem(name);

    return JSON.parse(value);
  },
  set: async <T>(name: string, value: T, secure?: boolean) => {
    if (secure) return SecureStorage.setItemAsync(name, JSON.stringify(value));
    return AsyncStorage.setItem(name, JSON.stringify(value));
  },
  reset: async (name: string, secure?: boolean) => {
    if (secure) return SecureStorage.deleteItemAsync(name);
    return AsyncStorage.removeItem(name);
  },
};

type StorageListener<T> = (value: T) => void;

type StorageAtom<T> = {
  get: () => T | null;
  set: (value: T) => void;
  reset: () => void;
  subscribe: (listener: (value: T) => void) => () => void;
};

export const storageAtom = <T>(name: string, secure?: boolean): StorageAtom<T> => {
  let value: T = null;
  const listeners = new Set<StorageListener<T>>();

  const updateListeners = () => {
    listeners.forEach((listener) => listener(value));
  };

  // in first load sync value with storage value
  StorageUtil.get<T>(name, secure).then((v) => {
    value = v;
    updateListeners();
  });

  return {
    get: () => value,
    set: (newValue: T) => {
      value = newValue;
      StorageUtil.set<T>(name, value, secure).then(updateListeners);
    },
    reset: () => {
      value = null;
      StorageUtil.reset(name, secure).then(updateListeners);
    },
    subscribe: (listener: StorageListener<T>) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const useStorageItem = <T>(storage: StorageAtom<T>): [T | null, (value: T) => void] => {
  return [useSyncExternalStore(storage.subscribe, storage.get), storage.set];
};

export const useStorageItemValue = <T>(storage: StorageAtom<T>) => {
  return useSyncExternalStore(storage.subscribe, storage.get);
};

export const useSetStorageItem = <T>(storage: StorageAtom<T>) => {
  return storage.set;
};

export const useResetStorageItem = <T>(storage: StorageAtom<T>) => {
  return storage.reset;
};
