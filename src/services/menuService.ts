import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { MenuItem, MenuItemInput } from "../types";
import { COLLECTION_NAME } from "../constants/common";

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as MenuItem,
  );
};

export const addMenuItem = async (item: MenuItemInput): Promise<MenuItem> => {
  const ref = await addDoc(collection(db, COLLECTION_NAME), item);
  return { id: ref.id, ...item };
};

export const updateMenuItem = async (item: MenuItem): Promise<void> => {
  const { id, ...rest } = item;
  await updateDoc(doc(db, COLLECTION_NAME, id), rest);
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const seedMenuItems = async (items: MenuItem[]): Promise<void> => {
  for (const { id, ...rest } of items) {
    await setDoc(doc(db, COLLECTION_NAME, id), rest);
  }
};
