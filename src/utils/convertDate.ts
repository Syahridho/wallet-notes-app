export const convertDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  const hariIndonesia = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = hariIndonesia[date.getDay()];
  const tanggal = date.getDate();
  const bulan = bulanIndonesia[date.getMonth()];
  const tahun = date.getFullYear();

  return `${hari}, ${tanggal} ${bulan} ${tahun}`;
};

export const convertHour = (timestamp: number): string => {
  const date = new Date(timestamp);

  // Mendapatkan jam, menit, dan detik
  const jam = date.getHours().toString().padStart(2, "0");
  const menit = date.getMinutes().toString().padStart(2, "0");
  //   const detik = date.getSeconds().toString().padStart(2, "0");

  return `${jam}:${menit}`;
};
