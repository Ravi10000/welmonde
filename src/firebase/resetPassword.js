import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./auth";
export async function resetPassword(auth, email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: "success" };
  } catch (err) {
    console.log({ err });
    return { error: err?.message, code: err?.code };
  }
}
