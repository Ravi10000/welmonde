import { doc, getDoc } from "firebase/firestore";
import app, { db } from "./index";

export const fetchMyAgreements = async (agreementId) => {
  const q = doc(db, "agreements", agreementId);
  const snapshot = await getDoc(q);
  return snapshot.data();
};
