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
  orderBy,
} from "firebase/firestore";

export const fetchMyAgreements = async (uid) => {
  let q = query(collection(db, "agreements"), orderBy("updatedAt", "desc"));
  if (uid)
    q = query(
      collection(db, "agreements"),
      orderBy("updatedAt", "desc"),
      where("employeeId", "==", uid),
    );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addAgreement = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "agreements"), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef;
  } catch (error) {
    console.log(error);
  }
};
export const upateAgreementDetails = async (agreementId, data) => {
  console.log({ agreementId, data });
  try {
    await setDoc(
      doc(db, "agreements", agreementId),
      { ...data, updatedAt: new Date() },
      {
        merge: true,
      }
    );
    return { status: "success" };
  } catch (err) {
    return { status: "error", error: err.message };
  }
};

export const updateAgreementStatus = async (agreementId, status) => {
  try {
    const docRef = await setDoc(
      doc(db, "agreements", agreementId),
      { status, updatedAt: new Date() },
      { merge: true }
    );
    return docRef;
  } catch (err) {
    console.log(err);
    return { error: err.message };
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
  console.log({ uid });
  let q = query(collection(db, "clients"), orderBy("updatedAt", "desc"));
  if (uid)
    q = query(
      collection(db, "clients"),
      where("createdBy", "==", uid),
      orderBy("updatedAt")
    );
  const snapshot = await getDocs(q);
  const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return clients;
};
export const fetchClientById = async (id) => {
  console.log({ id });
  const docRef = doc(db, "clients", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
