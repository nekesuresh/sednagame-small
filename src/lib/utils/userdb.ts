import { openDB } from 'idb';

const DB_NAME = 'sedna-user-db';
const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    }
  }
});

export async function saveUserInfo({ name, painPoint, occupation }: { name: string, painPoint: string, occupation: string }) {
  const db = await dbPromise;
  await db.add('users', { name, painPoint, occupation, timestamp: Date.now() });
}

export async function getAllUsers() {
  const db = await dbPromise;
  return db.getAll('users');
}

export async function updateUserField(id: number, field: 'name' | 'painPoint' | 'occupation', value: string) {
  const db = await dbPromise;
  const user = await db.get('users', id);
  if (user) {
    user[field] = value;
    await db.put('users', user);
  }
}

export async function getUserById(id: number) {
  const db = await dbPromise;
  return db.get('users', id);
}

export async function deleteUserById(id: number) {
  const db = await dbPromise;
  await db.delete('users', id);
}

export async function deleteUsersByIds(ids: number[]) {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  for (const id of ids) {
    tx.store.delete(id);
  }
  await tx.done;
} 