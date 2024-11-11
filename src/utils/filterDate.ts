// Tanggal sekarang untuk referensi
const now = new Date();

// Tanggal awal minggu ini (Senin)
const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - now.getDay() + 1);

// Tanggal awal bulan ini
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

// Tanggal awal dan akhir bulan lalu
const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

export const getTodayIncomeTransactions = (transactions) => {
  // Pastikan transactions adalah array
  if (!Array.isArray(transactions)) {
    return [];
  }

  const today = new Date();

  return transactions.filter((item) => {
    const itemDate = new Date(item.createdAt);

    return (
      itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
    );
  });
};

// Arrow function untuk filter minggu ini
export const getThisWeekDeposits = (transactions) =>
  transactions.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startOfWeek && itemDate <= now;
  });

// Arrow function untuk filter bulan ini
export const getThisMonthDeposits = (transactions) =>
  transactions.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startOfMonth && itemDate <= now;
  });

// Arrow function untuk filter bulan lalu
export const getLastMonthDeposits = (transactions) =>
  transactions.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
  });
