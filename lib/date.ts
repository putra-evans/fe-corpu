// /src/lib/date.ts

export const formatTanggal = (date?: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getStatusPembelajaran = (start?: string, end?: string) => {
  if (!start || !end) return null;

  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) {
    return {
      status: "Akan Dibuka",
      color: "bg-gray-400",
      text: "text-gray-500",
      diff: Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      ),
      label: "Dibuka",
    };
  }

  if (now > endDate) {
    return {
      status: "Ditutup",
      color: "bg-red-500",
      text: "text-red-500",
      diff: 0,
      label: "Ditutup",
    };
  }

  return {
    status: "Buka",
    color: "bg-green-500",
    text: "text-red-500",
    diff: Math.ceil(
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    ),
    label: "Tutup",
  };
};

// export const getStatusPendaftaran = (start?: string) => {
//   if (!start) return null;

//   const now = new Date();
//   const startDate = new Date(start);

//   console.log(now, startDate, "now startDate");

//   if (now <= startDate) {
//     return {
//       status: "Buka",
//       color: "bg-green-500",
//       text: "text-green-500",
//       diff: Math.ceil(
//         (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
//       ),
//       label: "Hari Lagi",
//     };
//   }

//   return {
//     status: "Ditutup",
//     color: "bg-red-500",
//     text: "text-red-500",
//     diff: 0,
//     label: "Ditutup",
//   };
// };

export const getStatusPendaftaran = (start?: string) => {
  if (!start) return null;

  const now = new Date();
  const startDate = new Date(start);

  // Abaikan waktu (jam, menit, detik)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const startOnlyDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );

  if (today <= startOnlyDate) {
    return {
      status: "Buka",
      color: "bg-green-500",
      text: "text-green-500",
      diff: Math.ceil(
        (startOnlyDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      ),
      label: "Hari Lagi",
    };
  }

  return {
    status: "Ditutup",
    color: "bg-red-500",
    text: "text-red-500",
    diff: 0,
    label: "Ditutup",
  };
};
