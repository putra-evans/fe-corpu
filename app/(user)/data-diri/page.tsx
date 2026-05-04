"use client";
import { FrontLayout } from "../../../components";
import { Icon } from "@iconify/react";
import { useUserQuery } from "@/app/hooks/useUserQuery";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DataDiri = () => {
  const { data: session, status } = useSession();

  const username = session?.user?.username ?? undefined;

  const { data: user, isLoading } = useUserQuery(username ?? undefined);

  if (status === "loading") return <div>Loading session...</div>;
  if (isLoading) return <div>Loading user...</div>;

  return (
    <div className="space-y-6">
      {/* 🔹 Title */}
      <h1 className="text-xl font-semibold text-gray-800">Data Diri</h1>

      {/* 🔹 Detail Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-5">
          <Icon
            icon="mdi:account-circle-outline"
            width="20"
            className="text-primary"
          />
          <h3 className="text-sm font-semibold text-gray-600">
            Informasi Pribadi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          {/* Nama */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:account"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Nama Lengkap</p>
              <p className="font-medium text-gray-800 uppercase">
                {user?.nama_pns}
              </p>
            </div>
          </div>

          {/* Username */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:card-account-details-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">NIP</p>
              <p className="font-medium text-gray-800">{user?.nip}</p>
            </div>
          </div>

          {/* Tempat, tanggal lahir */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:map-marker-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Tempat, Tanggal Lahir</p>
              <p className="font-medium text-gray-800">
                {user?.tmpt_lahir
                  ? user.tmpt_lahir
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())
                  : "-"}

                {user?.tgl_lahir
                  ? new Date(user.tgl_lahir).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>

          {/* Jenis Kelamin */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:gender-male-female"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Jenis Kelamin</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.gender_nm}
              </p>
            </div>
          </div>
          {/* Agama */}
          <div className="flex items-start gap-3">
            <Icon icon="mdi:mosque" width="18" className="text-gray-400 mt-1" />
            <div>
              <p className="text-gray-400 text-xs">Agama</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.agama_nm}
              </p>
            </div>
          </div>
          {/* Agama */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:badge-account-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">status</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.cpns_pns_nm}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 🔹 Info Jabatan dan Dinas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-5">
          <Icon
            icon="mdi:office-building-outline"
            width="20"
            className="text-primary"
          />
          <h3 className="text-sm font-semibold text-gray-600">
            Informasi Dinas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          {/* Nama */}
          <div className="flex items-start gap-3">
            <Icon icon="mdi:domain" width="18" className="text-gray-400 mt-1" />
            <div>
              <p className="text-gray-400 text-xs">Nama Dinas</p>
              <p className="font-medium text-gray-800 uppercase">
                {user?.opd_nm}
              </p>
            </div>
          </div>

          {/* Bidang */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:folder-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Bidang</p>
              <p className="font-medium text-gray-800">{user?.sub_opd_nm}</p>
            </div>
          </div>

          {/* Jenis Jabatan */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:briefcase-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Jenis Jabatan</p>

              <p className="font-medium text-gray-800">{user?.jns_jbtn_nm}</p>
            </div>
          </div>

          {/* Nama Jabatan */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:account-tie-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Nama Jabatan</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.jabatan_nm}
              </p>
            </div>
          </div>
          {/* Agama */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:star-circle-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">Golongan</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.golru_nm}
              </p>
            </div>
          </div>
          {/* Agama */}
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:badge-account-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="text-gray-400 text-xs">status</p>
              <p className="font-medium text-gray-800 capitalize">
                {user?.status_pns_nm}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Security */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-5">
          <Icon icon="mdi:lock-outline" width="20" className="text-primary" />
          <h3 className="text-sm font-semibold text-gray-600">Keamanan</h3>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-start gap-3">
            <Icon
              icon="mdi:key-outline"
              width="18"
              className="text-gray-400 mt-1"
            />
            <div>
              <p className="font-medium text-gray-800">Password</p>
              <p className="text-xs text-gray-400">
                Terakhir diubah 2 bulan lalu
              </p>
            </div>
          </div>

          <button className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-sm transition">
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default DataDiri;
