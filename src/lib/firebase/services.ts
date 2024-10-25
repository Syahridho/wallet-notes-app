import app from "./init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDatabase, ref, remove } from "firebase/database";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
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
    balance?: number;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
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
    userData.balance = 0;
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register Success" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}

export async function signInWithGoogle(userData: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    userData.role = data[0].role;
    userData.balance = 0;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
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
    await addDoc(collection(firestore, "users"), userData)
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

export async function retrieveData(collectionName: string) {
  const snapShot = await getDocs(collection(firestore, collectionName));
  const data = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapShot = await getDoc(doc(firestore, collectionName, id));
  const data = snapShot.data();
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(error);
    });
}

export async function addDataById(
  collectionName: string,
  data: any,
  callback: Function
) {
  try {
    const docRef = doc(firestore, collectionName, data.idUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      const updatedTransaction = existingData.transaction || [];

      // Menambahkan transaksi baru
      updatedTransaction.push({
        id: data.id,
        name: data.name,
        total: data.total,
        date: data.date,
        status: data.status,
      });

      // Buat objek updatedData terlebih dahulu
      const updatedData: any = {
        transaction: updatedTransaction,
        balance: existingData.balance || 0, // Menggunakan balance yang sudah ada
      };

      // Update balance berdasarkan status
      if (data.status) {
        updatedData.balance += Number(data.total); // Pastikan total dalam bentuk number
      } else {
        updatedData.balance -= Number(data.total);
      }

      // Simpan data yang sudah diupdate
      await setDoc(docRef, updatedData);
      callback(true, updatedData);
    } else {
      // Untuk dokumen baru
      const initialBalance = data.status
        ? Number(data.total)
        : -Number(data.total);
      const newData = {
        transaction: [
          {
            id: data.id,
            name: data.name,
            total: data.total,
            date: data.date,
            status: data.status,
          },
        ],
        balance: initialBalance,
      };

      await setDoc(docRef, newData);
      callback(true, newData);
    }
  } catch (error) {
    callback(error);
  }
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteTransactionById(
  idTransaction: any,
  idUser: any,
  callback: Function
) {
  try {
    const db = getDatabase();
    const transactionRef = ref(
      db,
      `transaction/${idUser}/transaction/${idTransaction}`
    );

    await remove(transactionRef);

    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
}
