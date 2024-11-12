// Tanggal sekarang untuk referensi
const now = new Date();
now.setHours(23, 59, 59, 999); // Set ke akhir hari

// Tanggal awal minggu ini (Senin)
const startOfWeek = new Date(now);
startOfWeek.setDate(
  now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
);
startOfWeek.setHours(0, 0, 0, 0); // Set ke awal hari

// Tanggal awal bulan ini
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
startOfMonth.setHours(0, 0, 0, 0); // Set ke awal hari

// Tanggal awal dan akhir bulan lalu
const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
startOfLastMonth.setHours(0, 0, 0, 0); // Set ke awal hari

const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
endOfLastMonth.setHours(23, 59, 59, 999); // Set ke akhir hari

// Fungsi filter transaksi hari ini dengan sorting
export const getTodayIncomeTransactions = (transactions, type?) => {
  if (!Array.isArray(transactions)) {
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set ke awal hari

  return transactions
    .filter((item) => {
      const itemDate = new Date(Number(item.createdAt));
      itemDate.setHours(0, 0, 0, 0); // Normalisasi waktu ke awal hari

      const typeMatches = type ? item.type === type : true;
      const dateMatches = itemDate.getTime() === today.getTime();

      return typeMatches && dateMatches;
    })
    .sort((a, b) => {
      const dateA = Number(a.createdAt);
      const dateB = Number(b.createdAt);
      return dateA === dateB ? a.id.localeCompare(b.id) : dateA - dateB;
    });
};

// Arrow function untuk filter minggu ini dengan sorting
export const getThisWeekDeposits = (transactions) =>
  transactions
    .filter((item) => {
      const itemDate = new Date(Number(item.createdAt));
      return (
        itemDate.getTime() >= startOfWeek.getTime() &&
        itemDate.getTime() <= now.getTime()
      );
    })
    .sort((a, b) => {
      const dateA = Number(a.createdAt);
      const dateB = Number(b.createdAt);
      return dateA === dateB ? a.id.localeCompare(b.id) : dateA - dateB;
    });

// Arrow function untuk filter bulan ini dengan sorting
export const getThisMonthDeposits = (transactions) =>
  transactions
    .filter((item) => {
      const itemDate = new Date(Number(item.createdAt));
      return (
        itemDate.getTime() >= startOfMonth.getTime() &&
        itemDate.getTime() <= now.getTime()
      );
    })
    .sort((a, b) => {
      const dateA = Number(a.createdAt);
      const dateB = Number(b.createdAt);
      return dateA === dateB ? a.id.localeCompare(b.id) : dateA - dateB;
    });

// Arrow function untuk filter bulan lalu dengan sorting
export const getLastMonthDeposits = (transactions) =>
  transactions
    .filter((item) => {
      const itemDate = new Date(Number(item.createdAt));
      return (
        itemDate.getTime() >= startOfLastMonth.getTime() &&
        itemDate.getTime() <= endOfLastMonth.getTime()
      );
    })
    .sort((a, b) => {
      const dateA = Number(a.createdAt);
      const dateB = Number(b.createdAt);
      return dateA === dateB ? a.id.localeCompare(b.id) : dateA - dateB;
    });
