import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database
  const db = await initdb();

  // Add the content to the 'jate' object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add(content);

  // Wait for the transaction to complete
  await tx.complete;

  // Log that the content has been added successfully
  console.log('Content added to jate object store');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the database
  const db = await initdb();

  // Get all the content from the 'jate' object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = store.getAll();

  // Return a promise that resolves to the content
  return allContent;
};

initdb();
