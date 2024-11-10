type StorageActionType = {
  get: (key: string) => string | null;
  set: (key: string, value: any) => void;
};

export const storageActions: StorageActionType = {
  get: (key) => {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      return globalThis.localStorage.getItem(key);
    }
    return null;
  },
  set: (key, value) => {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      globalThis.localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
