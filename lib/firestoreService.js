import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';

export const addItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, 'pantry'), item);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, 'pantry', id));
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    await updateDoc(doc(db, 'pantry', id), updatedItem);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const getItems = (searchTerm = '', callback) => {
  const q = searchTerm
    ? query(collection(db, 'pantry'), where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'))
    : collection(db, 'pantry');

  // Set up a real-time listener
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    callback(items);
  });

  // Return the unsubscribe function
  return unsubscribe;
};
