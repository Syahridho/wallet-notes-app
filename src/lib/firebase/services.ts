import app from "./init";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "account"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  const q = query(
    collection(firestore, "account"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "account"), userData)
      .then(() => {
        callback({ status: true, message: "Register Success" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export async function signInWithGoogle(userData: any, callback: Function) {
  const q = query(
    collection(firestore, "account"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "account", data[0].id), userData)
      .then(() => {
        callback({
          status: true,
          message: "sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, messege: "sign in with google failed" });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "account"), userData)
      .then(() => {
        callback({
          status: true,
          message: "sign in with google success",
          data: userData,
        });
      })
      .catch(() => {
        callback({ status: false, message: "sign in with google failed" });
      });
  }
}
