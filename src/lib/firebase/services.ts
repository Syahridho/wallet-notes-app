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
  updateDoc,
  where,
  runTransaction,
  setDoc,
} from "firebase/firestore";
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

export async function retrieveDataByIdTransaction(userId: string) {
  try {
    // Ambil data wallet
    const walletRef = doc(firestore, `users/${userId}/wallet/balance`);
    const walletSnap = await getDoc(walletRef);
    const walletData = walletSnap.data();

    // Ambil data transaksi
    const transactionsRef = collection(
      firestore,
      `transactions/${userId}/history`
    );
    const transactionsSnap = await getDocs(transactionsRef);

    const transactions: Array<{ id: string; [key: string]: any }> = [];
    transactionsSnap.forEach((doc) => {
      transactions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Gabungkan data wallet dan transaksi
    return {
      id: userId,
      balance: walletData?.balance || 0,
      transaction: transactions,
    };
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
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

export async function createTransaction(userId: string, transactionData: any) {
  try {
    if (!userId || !transactionData.amount) {
      throw new Error("Invalid transaction data");
    }

    const transactionRef = collection(
      firestore,
      "transactions",
      userId,
      "history"
    );
    const walletRef = doc(firestore, `users/${userId}/wallet/balance`); // Perbaiki path

    // Cek wallet terlebih dahulu
    const walletDoc = await getDoc(walletRef);

    // Jika wallet belum ada, buat dulu
    if (!walletDoc.exists()) {
      await setDoc(walletRef, {
        balance: 0,
        currency: "IDR",
        updatedAt: Date.now(),
      });
    }

    // Sekarang jalankan transaction
    const result = await runTransaction(firestore, async (transaction) => {
      const currentWallet = await transaction.get(walletRef);
      const currentBalance = currentWallet.data()?.balance || 0;

      // Hitung balance baru
      let newBalance = currentBalance;
      if (transactionData.type === "deposit") {
        newBalance += Number(transactionData.amount);
      } else if (transactionData.type === "withdraw") {
        newBalance -= Number(transactionData.amount);
      }

      // Buat transaksi baru
      const newTransaction = {
        amount: Number(transactionData.amount),
        type: transactionData.type || "deposit",
        description: transactionData.description || "",
        createdAt: Date.now(),
        referenceId: `TRX-${Date.now()}`,
      };

      // Simpan transaksi
      await addDoc(transactionRef, newTransaction);

      // Update wallet
      transaction.update(walletRef, {
        balance: newBalance,
        updatedAt: Date.now(),
      });

      return {
        balance: newBalance,
        transaction: newTransaction,
      };
    });

    return result;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  updatedData: any
) {
  try {
    const transactionRef = doc(
      firestore,
      `transactions/${userId}/history/${transactionId}`
    );
    const walletRef = doc(firestore, `users/${userId}/wallet/balance`);

    await runTransaction(firestore, async (transaction) => {
      const transactionDoc = await transaction.get(transactionRef);
      const walletDoc = await transaction.get(walletRef);

      if (!transactionDoc.exists() || !walletDoc.exists()) {
        throw new Error("Transaction or wallet does not exist.");
      }

      const currentTransaction = transactionDoc.data();
      const currentAmount = currentTransaction.amount;
      const newAmount = updatedData.amount;

      // Hitung selisih antara amount baru dan amount lama
      const amountDifference = newAmount - currentAmount;

      // Update saldo di wallet berdasarkan tipe transaksi
      const currentBalance = walletDoc.data()?.balance || 0;
      let updatedBalance = currentBalance;

      if (currentTransaction.type === "deposit") {
        updatedBalance += amountDifference;
      } else if (currentTransaction.type === "withdraw") {
        updatedBalance -= amountDifference;
      }

      // Update data transaksi dengan amount baru
      await transaction.update(transactionRef, updatedData);

      // Update saldo di wallet
      await transaction.update(walletRef, { balance: updatedBalance });
    });

    console.log("Transaction and wallet balance updated successfully!");
    return {
      success: true,
      message: "Transaction and wallet balance updated successfully!",
    };
  } catch (error) {
    console.error("Error updating transaction and balance:", error);
    throw error;
  }
}

export async function deleteTransactionById(
  userId: string,
  transactionId: string
) {
  try {
    const transactionRef = doc(
      firestore,
      "transactions",
      userId,
      "history",
      transactionId
    );
    const walletRef = doc(firestore, `users/${userId}/wallet/balance`);

    // Ambil data transaksi yang ingin dihapus
    const transactionDoc = await getDoc(transactionRef);
    if (!transactionDoc.exists()) {
      throw new Error("Transaction not found");
    }
    const transactionData = transactionDoc.data();

    // Jalankan transaksi untuk menghapus dan mengupdate balance
    await runTransaction(firestore, async (transaction) => {
      const walletDoc = await transaction.get(walletRef);
      const currentBalance = walletDoc.data()?.balance || 0;

      let newBalance = currentBalance;

      // Perbarui balance berdasarkan tipe transaksi
      if (transactionData.type === "deposit") {
        newBalance -= transactionData.amount;
      } else if (transactionData.type === "withdraw") {
        newBalance += transactionData.amount;
      }

      // Hapus transaksi
      transaction.delete(transactionRef);

      // Update balance di wallet
      transaction.update(walletRef, {
        balance: newBalance,
        updatedAt: Date.now(),
      });
    });

    return { message: "Transaction deleted and balance updated successfully" };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
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
