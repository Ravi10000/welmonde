import app from "./index";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
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
} from "firebase/firestore";

export const auth = getAuth();
export const db = getFirestore();

export async function signInAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

export async function sendOtp(phone) {
  try {
    const appVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
    appVerifier.render();
    return signInWithPhoneNumber(auth, phone, appVerifier);
  } catch (error) {
    return { error: error.message };
  }
}

export const createAdminProfileDocument = async (adminAuth, additionalData) => {
  const adminDocRef = doc(db, "users", adminAuth.uid);
  const snapshot = await getDoc(adminDocRef);
  console.log({ adminAuth });
  console.log(snapshot.data(), snapshot.exists());

  if (!snapshot.exists()) {
    const { email, uid } = adminAuth;
    try {
      await setDoc(adminDocRef, {
        email,
        uid,
        createdAt: new Date(),
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating admin", err.message);
    }
  }

  return adminDocRef;
};

export const fetchAllAdmins = async () => {
  const q = query(collection(db, "users"), where("usertype", "==", "ADMIN"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};
export const fetchAllEmployees = async () => {
  const q = query(collection(db, "users"), where("usertype", "==", "EMPLOYEE"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

export const fetchAllClients = async () => {
  const q = query(collection(db, "clients"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

export const fetchUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addClient = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "clients"), clientData);
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

