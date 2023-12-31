import app, { db } from "./index";

import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  where,
  query,
  addDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

export const fetchAllAdmins = async () => {
  const q = query(
    collection(db, "users"),
    where("usertype", "==", "ADMIN"),
    orderBy("updatedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchAllEmployees = async () => {
  const q = query(
    collection(db, "users"),
    where("usertype", "==", "EMPLOYEE"),
    orderBy("updatedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
