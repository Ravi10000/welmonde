import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./index";
import { fetchClientById } from "./employee";
import { fetchClientByPhone } from "./auth";

export const fetchMyAgreements = async (agreementId) => {
  const q = doc(db, "agreements", agreementId);
  const snapshot = await getDoc(q);
  return snapshot.data();
};

export const fetchAgreementsByPhone = async (phone) => {
  // console.log({ clientId });
  const clients = await fetchClientByPhone(phone);
  console.log({ client: clients?.[0]?.id });
  if (clients.length === 0) return [];
  const q = query(
    collection(db, "agreements"),
    where("clientId", "==", clients[0]?.id)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
