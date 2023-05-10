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
  let q = query(collection(db, "agreements"));
  if (uid)
    q = query(collection(db, "agreements"), where("employeeId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addAgreement = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "agreements"), data);
    return docRef;
  } catch (error) {
    console.log(error);
  }
};

export const updateAgreementStatus = async (agreementId, status) => {
  try {
    const docRef = await setDoc(
      doc(db, "agreements", agreementId),
      { status, updatedAt: new Date().toISOString() },
      { merge: true }
    );
    return docRef;
  } catch (err) {
    return { error: err.message };
    console.log(err);
  }
};

export const fetchMyClients = async (uid) => {
  let q = query(collection(db, "clients"));
  if (uid) q = query(collection(db, "clients"), where("createdBy", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
