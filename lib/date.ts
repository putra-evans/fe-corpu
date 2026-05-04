// /src/lib/date.ts

export const formatTanggal = (date?: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getStatusPendaftaran = (start?: string, end?: string) => {
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
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
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
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    ),
    label: "Tutup",
  };
};
