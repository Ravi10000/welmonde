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
  deleteDoc,
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

export const createUserProfile = async (auth, additionalData) => {
  const adminDocRef = doc(db, "users", auth.uid);
  const snapshot = await getDoc(adminDocRef);

  if (!snapshot.exists()) {
    const { email, uid } = auth;
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
  } else {
    return { error: "User already exists" };
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
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchUser = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addNewClient = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "clients"), clientData);
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export const updateClientDetails = async (userId, clientData) => {
  console.log({ userId, clientData });
  try {
    const snapshot = await getDoc(doc(db, "clients", userId));
    const existingData = snapshot.data();

    const docRef = await setDoc(doc(db, "clients", userId), {
      ...existingData,
      ...clientData,
    });
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export const updateUserDetails = async (userToEdit, userData) => {
  try {
    const docRef = await setDoc(doc(db, "users", userToEdit.uid), {
      ...userToEdit,
      ...userData,
    });
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export const EditClientDetails = async (clientToEdit, newData) => {
  console.log({ clientToEdit, newData });
  try {
    const docRef = await setDoc(doc(db, "clients", clientToEdit.id), {
      ...clientToEdit,
      ...newData,
    });
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const deleteUser = async (uid) => {
  console.log({ uid });
  try {
    const snapshot = await deleteDoc(doc(db, "users", uid));
    console.log({ snapshot });
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
