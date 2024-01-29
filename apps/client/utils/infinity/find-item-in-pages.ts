import { ObjectKeyPaths } from '@/types/object-key-paths';

function findValueByPath(obj: Record<string, any>, path: string) {
  // Split the path into individual keys
  const keys = path.split('.');

  // Start with the original object
  let currentObject = obj;

  // Iterate through the keys to navigate through the object
  for (const key of keys) {
    // Check if the current key exists in the current object
    if (currentObject.hasOwnProperty(key)) {
      // Move to the next level of the object
      currentObject = currentObject[key];
    } else {
      // If the key doesn't exist, return undefined
      return undefined;
    }
  }

  // Return the final value found at the end of the path
  return currentObject;
}

export const findItemInPages = <
  PageList extends { items: any[] }[],
  Key extends ObjectKeyPaths<PageList[0]['items'][0]>
>(
  pages: PageList,
  key: Key,
  // TODO support type
  value: any
): [number, number] => {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    for (let j = 0; j < page.items.length; j++) {
      const item = page.items[j];

      if (findValueByPath(item, key) === value) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
};
