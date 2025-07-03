import { openDB } from "idb";
const DB_NAME = "sedna-user-db";
const DB_VERSION = 1;
openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
    }
  }
});
