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
export const upateAgreementDetails = async (agreementId, data) => {
  console.log({ agreementId, data });
  try {
    await setDoc(doc(db, "agreements", agreementId), data, {
      merge: true,
    });
    return { status: "success" };
  } catch (err) {
    return { status: "error", error: err.message };
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

export const deleteAgreement = async (agreementId) => {
  try {
    await deleteDoc(doc(db, "agreements", agreementId));
  } catch (err) {
    return { error: err.message };
  }
};

export const fetchMyClients = async (uid) => {
  let q = query(collection(db, "clients"));
  if (uid) q = query(collection(db, "clients"), where("createdBy", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const fetchClientById = async (id) => {
  console.log({ id });
  const docRef = doc(db, "clients", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
