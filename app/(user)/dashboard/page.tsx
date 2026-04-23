"use client";
import { FrontLayout, UserDashboardLayout } from "../../../components";

const Dashbaord = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800">Dashboard Saya</h1>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Kelas</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Sertifikat</p>
          <h2 className="text-2xl font-bold">5</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Progress</p>
          <h2 className="text-2xl font-bold">80%</h2>
        </div>
      </div>

      {/* Content tambahan */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <p className="text-gray-600">Selamat datang di dashboard Anda 👋</p>
      </div>
    </div>
  );
};
export default Dashbaord;
