import app, { db } from "./index";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  where,
  query,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const fetchMyAgreements = async (uid) => {
  const q = query(collection(db, "agreements"), where("employeeId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addAgreement = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "agreements"), data);
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
