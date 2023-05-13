import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app, { db } from "./index";

export const fetchMyAgreements = async (agreementId) => {
  const q = doc(db, "agreements", agreementId);
  const snapshot = await getDoc(q);
  return snapshot.data();
};

export const fetchAgreementsByClientId = async (clientId) => {
  console.log({ clientId });
  const q = query(
    collection(db, "agreements"),
    where("clientId", "==", clientId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
