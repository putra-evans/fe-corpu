"use client";

import {
  BookOpen,
  PlayCircle,
  CheckCircle2,
  CalendarClock,
  ChevronRight,
  Clock,
  User2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import GlobalLoading from "@/app/loading";
import ImageViewer from "@/components/molecules/ImageViewer";
import { formatTanggal } from "@/lib/date";
import { useDashboard } from "@/app/hooks/useDashboard";
import { CourseItem, DashboardData } from "@/types/dashboard";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// ─── Course Card (running) ────────────────────────────────────────────────────
function RunningCourseCard({
  course,
  onClick,
}: {
  course: CourseItem;
  onClick: () => void;
}) {
  const progress = course.progress ?? 0;
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="h-36 w-full overflow-hidden rounded-xl">
        <ImageViewer
          src={course.thumbnail || "/assets/img/no_image.png"}
          alt={course.title}
          className="h-36 w-full object-cover"
        />
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {course.type_label && (
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
              {course.type_label}
            </span>
          )}
          {course.category && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
              {course.category}
            </span>
          )}
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-800">
          {course.title}
        </h3>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span className="font-medium text-teal-600">{progress}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {(course.start_date || course.end_date) && (
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <Clock size={11} />
            {formatTanggal(course.start_date)} –{" "}
            {formatTanggal(course.end_date)}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Course Card (upcoming) ───────────────────────────────────────────────────
function UpcomingCourseCard({
  course,
  onClick,
}: {
  course: CourseItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <ImageViewer
          src={course.thumbnail || "/assets/img/no_image.png"}
          alt={course.title}
          className="h-16 w-16 object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        {course.type_label && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
            {course.type_label}
          </span>
        )}
        <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-800">
          {course.title}
        </p>
        {course.start_date && (
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <CalendarClock size={11} />
            Mulai {formatTanggal(course.start_date)}
          </p>
        )}
      </div>

      <ChevronRight size={16} className="shrink-0 text-slate-300" />
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-400">
      {label}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function KelasSayaDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const { data, isLoading } = useDashboard({
    token: session?.accessToken || "",
  });

  if (isLoading) return <GlobalLoading />;

  const dashboard: DashboardData | undefined = data?.data;
  const user = dashboard?.user;
  const summary = dashboard?.summary;
  const runningCourses = dashboard?.running_courses ?? [];
  const upcomingCourses = dashboard?.upcomingCourses ?? [];

  const stats = [
    {
      label: "Total Kelas",
      value: summary?.total_course ?? 0,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Sedang Berjalan",
      value: summary?.running_course ?? 0,
      icon: PlayCircle,
      color: "bg-teal-50 text-teal-600",
    },
    {
      label: "Selesai",
      value: summary?.completed_course ?? 0,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Akan Datang",
      value: summary?.upcoming_course ?? 0,
      icon: CalendarClock,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8 rounded-xl">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Summary stats */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Ringkasan
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Running courses */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Kelas Berjalan
            </h2>
            <button
              // onClick={() => router.push("/kelas-saya")}
              onClick={() => {}}
              className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:underline"
            >
              Lihat semua <ChevronRight size={13} />
            </button>
          </div>

          {runningCourses.length === 0 ? (
            <Empty label="Belum ada kelas yang sedang berjalan." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {runningCourses.map((c) => (
                <RunningCourseCard
                  key={c.id}
                  course={c}
                  // onClick={() => router.push(`/kelas-saya/${c.slug}`)}
                  onClick={() => {}}
                />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming courses */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Kelas Akan Datang
            </h2>
          </div>

          {upcomingCourses.length === 0 ? (
            <Empty label="Belum ada kelas yang akan datang." />
          ) : (
            <div className="space-y-3">
              {upcomingCourses.map((c) => (
                <UpcomingCourseCard
                  key={c.id}
                  course={c}
                  // onClick={() => router.push(`/kelas-saya/${c.slug}`)}
                  onClick={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
