import { db } from "./index";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const sendOtpViaEmail = async (email, otp) => {
  try {
    await addDoc(collection(db, "mail"), {
      to: [email],
      message: {
        subject: "Contracts Verification OTP",
        text: `Your OTP for contract verification is: ${otp}`,
      },
    });
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};
export const sendAgreementViaEmail = async (email, link) => {
  try {
    await addDoc(collection(db, "mail"), {
      to: [email],
      message: {
        subject: "Contracts",
        text: "see your contracts: " + link,
      },
    });
    return { status: "success" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};
