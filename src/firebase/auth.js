import app from "./index";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";

const auth = getAuth();
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
// export async function sendOtp(phone) {
//   try {
//     const appVerifier = new RecaptchaVerifier(
//       "sign-in-button",
//       { size: "invisible" },
//       auth
//     );
//     // appVerifier.render();
//     return signInWithPhoneNumber(auth, phone, appVerifier);
//   } catch (error) {
//     return { error: error.message };
//   }
// }
