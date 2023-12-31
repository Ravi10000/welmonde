import app, { db } from "./index";
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
        updatedAt: new Date(),
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

export const createClientProfile = async (uid, additionalData) => {
  try {
    const newClient = await setDoc(doc(db, "users", uid), {
      ...additionalData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newClient;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

// //
// export const fetchAllAdmins = async () => {
//   const q = query(collection(db, "users"), where("usertype", "==", "ADMIN"));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };
// //
// export const fetchAllEmployees = async () => {
//   const q = query(collection(db, "users"), where("usertype", "==", "EMPLOYEE"));
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

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

export const fetchClienDetails = async (uid) => {
  console.log({ uid });
  const docRef = doc(db, "clients", uid);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id };
};

export const addNewClient = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "clients"), {
      ...clientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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

    const docRef = await setDoc(
      doc(db, "clients", userId),
      {
        ...existingData,
        ...clientData,
        updatedAt: new Date(),
      },
      {
        merge: true,
      }
    );
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export const updateUserDetails = async (userToEdit, userData) => {
  try {
    const docRef = await setDoc(
      doc(db, "users", userToEdit.uid),
      { ...userData, updatedAt: new Date() },
      {
        merge: true,
      }
    );
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
export const EditClientDetails = async (clientToEdit, newData) => {
  try {
    const docRef = await setDoc(
      doc(db, "clients", clientToEdit.id),
      { ...newData, updatedAt: new Date() },
      {
        merge: true,
      }
    );
    return docRef;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const deleteUser = async (id) => {
  console.log({ uid: id });
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
export const deleteClient = async (id) => {
  try {
    await deleteDoc(doc(db, "clients", id));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};

export const fetchAllAgreements = async () => {
  const q = query(collection(db, "agreements"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchClientByPhone = async (mobile) => {
  if (!mobile) return console.log("no mobile");
  try {
    const q = query(collection(db, "clients"), where("mobile", "==", mobile));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
export const updateClientsUserId = async (clientId, uid) => {
  try {
    const q = query(doc(db, "clients", clientId));
    const updatedClient = await setDoc(q, { userId: uid }, { merge: true });
    return updatedClient;
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
export const fetchUserByPhone = async (phone) => {
  try {
    const q = query(collection(db, "users"), where("mobile", "==", phone));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
export const fetchUserByEmail = async (email) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
export const fetchClientByEmail = async (email) => {
  try {
    const q = query(collection(db, "clients"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.log({ err });
    return { error: err.message };
  }
};
