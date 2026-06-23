"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Link2,
  CheckCircle2,
  Circle,
  Download,
  Play,
  ExternalLink,
  Calendar,
  Tag,
  Clock,
  ListChecks,
  Lock,
  GraduationCap,
  Award,
  User2,
  Loader2,
  Eye,
  FilesIcon,
  RectangleEllipsis,
  CheckCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useKelasBySlug } from "@/app/hooks/useKelasBySlug";
import GlobalLoading from "@/app/loading";
import { formatTanggal } from "@/lib/date";
import ImageViewer from "@/components/molecules/ImageViewer";
import { useSession } from "next-auth/react";
import { useActivity } from "@/app/hooks/useActivity";
import { useDetailActivity } from "@/app/hooks/useDetailActivity";
import getYoutubeEmbedUrl from "@/lib/youtube";
import { useFinishActivity } from "@/app/hooks/useFinishActivity";
import ActivityTextModal from "../../components/ActivityTextModal";
import QuizModal from "../../components/QuizModal";
import CertificateModal from "../../components/CertificateModal";

type ActivityListItem = {
  id: string;
  title: string;
  description?: string | null;
  type: string;
  type_label?: string;
  order?: number;
  is_required?: boolean;
  progress?: number;
  is_completed: boolean;
  completed_at?: string | null;
};

type ActivityDetail = ActivityListItem & {
  content?: {
    file_name?: string;
    file_url?: string;
    file_size?: number;
    file_type?: string;
    video_url?: string;
    url?: string;
    [key: string]: any;
  };
};

function formatFileSize(bytes?: number) {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i > 0 && size < 10 ? 1 : 0)} ${units[i]}`;
}

function getActivityVisual(type: string) {
  const t = type?.toLowerCase() || "";
  if (t.includes("file"))
    return { Icon: FilesIcon, action: "Unduh", ActionIcon: Download };
  if (t.includes("video"))
    return { Icon: Video, action: "Tonton", ActionIcon: Play };
  if (t.includes("quiz"))
    return { Icon: ListChecks, action: "Mulai Kuis", ActionIcon: Play };
  if (t.includes("text"))
    return { Icon: FileText, action: "Lihat Materi", ActionIcon: Eye };
  if (t.includes("survey"))
    return { Icon: RectangleEllipsis, action: "Isi Survey", ActionIcon: Play };
  if (t.includes("link"))
    return { Icon: Link2, action: "Buka", ActionIcon: ExternalLink };
  return { Icon: FileText, action: "Buka", ActionIcon: ExternalLink };
}

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const slug = params.slug as string;
  const { course, isLoading } = useKelasBySlug(slug);
  const finishMutation = useFinishActivity();
  const [selectedText, setSelectedText] = useState<ActivityDetail | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<ActivityListItem | null>(
    null,
  );
  const [selectedCertificate, setSelectedCertificate] =
    useState<boolean>(false);

  const [openActivityId, setOpenActivityId] = useState<string>();
  const [highlightId, setHighlightId] = useState<string | null>(null);
  // const [finalExam, setFinalExam] = useState<{
  //   completed: boolean;
  //   score: number | null;
  // }>({
  //   completed: false,
  //   score: null,
  // });

  const { data: activity } = useActivity({
    course_id: course?.id || "",
    token: session?.accessToken || "",
  });

  const { data: detailActivity, isLoading: isDetailLoading } =
    useDetailActivity({
      course_id: course?.id || "",
      activity_id: openActivityId || "",
      token: session?.accessToken || "",
    });

  if (isLoading) return <GlobalLoading />;

  console.log("activity", activity);

  const rawList: any = activity?.data;
  const activities: ActivityListItem[] = (
    Array.isArray(rawList)
      ? rawList
      : Array.isArray(rawList?.activities)
        ? rawList.activities
        : Array.isArray(rawList?.items)
          ? rawList.items
          : []
  )
    .slice()
    .sort(
      (a: ActivityListItem, b: ActivityListItem) =>
        (a.order ?? 0) - (b.order ?? 0),
    );

  const detailData = detailActivity?.data as any;
  const detail: ActivityDetail | undefined =
    detailData && !Array.isArray(detailData) ? detailData : undefined;

  const handleToggleActivity = (id: string) => {
    setOpenActivityId((prev) => (prev === id ? undefined : id));
  };

  const total = activities.length;
  const done = activities.filter((a) => a.is_completed).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const certUnlocked = activity?.course?.progress === 100;

  const continueLabel =
    done < total
      ? "Lanjutkan Belajar"
      : !certUnlocked
        ? "Mulai Ujian Akhir"
        : certUnlocked
          ? "Selesai"
          : "";

  const handleContinue = () => {
    const next = activities.find((a) => !a.is_completed);
    if (next) {
      setOpenActivityId(next.id);
      setHighlightId(next.id);
      setTimeout(() => {
        document
          .getElementById(`activity-${next.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      setTimeout(() => setHighlightId(null), 1400);
      return;
    }
    // const target =
    //   !finalExam.completed || (finalExam.score ?? 0) < 70
    //     ? "stage-exam"
    //     : "stage-cert";
    // setHighlightId(target === "stage-exam" ? "exam" : "cert");
    // setTimeout(
    //   () =>
    //     document
    //       .getElementById(target)
    //       ?.scrollIntoView({ behavior: "smooth", block: "center" }),
    //   50,
    // );
    setTimeout(() => setHighlightId(null), 1400);
  };

  const handleOpenContent = async (a: ActivityListItem, d?: ActivityDetail) => {
    if (a.type?.toLowerCase().includes("text")) {
      setSelectedText(d || null);
      return;
    }

    if (a.type?.toLowerCase().includes("quiz")) {
      setSelectedQuiz(a);
      return;
    }

    const url =
      d?.content?.file_url || d?.content?.video_url || d?.content?.url;
    if (url) window.open(url, "_blank");
  };

  const handleDownloadCertificate = () => {
    setSelectedCertificate(true);
  };

  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  const finishModule = (id: string) => {
    finishMutation.mutate(
      {
        courseId: course!.id,
        activityId: id,
      },
      {
        onSuccess: () => {
          // cari activity berikutnya
          const currentIndex = activities.findIndex((item) => item.id === id);

          const nextActivity = activities[currentIndex + 1];

          if (nextActivity) {
            setOpenActivityId(nextActivity.id);

            setTimeout(() => {
              document
                .getElementById(`activity-${nextActivity.id}`)
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }, 300);
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8 rounded-lg">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <button
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
          onClick={() => router.push("/kelas-saya")}
        >
          <ArrowLeft size={16} />
          Kelas Saya
        </button>

        {/* Header card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Enrolled
            </span>
            <span className="text-xs font-medium text-slate-400">
              {course?.type_label}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-4">
            {course?.title}
          </h1>
          <div className="w-full h-[350px] rounded-2xl relative">
            <ImageViewer
              src={course?.thumbnail || "/assets/img/no_image.png"}
              alt="course-image"
              className="w-full h-[350px]"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Tag size={15} /> {course?.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {formatTanggal(course?.start_date)} -{" "}
              {formatTanggal(course?.end_date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User2 size={15} /> {course?.access_type}
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity list */}
          <div className="space-y-3 lg:col-span-2">
            {activities.map((a, index) => {
              const prevActivity = activities[index - 1];

              const isLocked = index > 0 && !prevActivity?.is_completed;
              const isOpen = openActivityId === a.id;
              const { Icon, action, ActionIcon } = getActivityVisual(a.type);
              const showDetail =
                isOpen && !isDetailLoading && detail && detail.id === a.id;
              const isQuiz = a.type?.toLowerCase().includes("quiz");

              return (
                <div
                  id={`activity-${a.id}`}
                  key={a.id}
                  className={`
                      overflow-hidden rounded-2xl border transition
                      ${
                        isLocked
                          ? "border-slate-100 bg-slate-50 opacity-70"
                          : "border-slate-200 bg-white"
                      }
                    ${highlightId === a.id ? " ring-2 ring-teal-200" : ""}
                  `}
                >
                  <button
                    onClick={() => {
                      if (!isLocked) {
                        handleToggleActivity(a.id);
                      }
                    }}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span className="shrink-0">
                      {isLocked ? (
                        <Lock size={20} className="text-slate-400" />
                      ) : a.is_completed ? (
                        <CheckCircle2 size={20} className="text-slate-500" />
                      ) : (
                        <Circle size={20} className="text-slate-300" />
                      )}
                    </span>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-medium ${
                          a.is_completed
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {a.type_label}
                      </p>
                      {isLocked && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <Lock size={12} />
                          Selesaikan modul sebelumnya terlebih dahulu
                        </p>
                      )}
                    </div>

                    {isOpen ? (
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-slate-400"
                      />
                    ) : (
                      <ChevronRight
                        size={18}
                        className="shrink-0 text-slate-400"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 py-4">
                      {isDetailLoading && (
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Loader2 size={15} className="animate-spin" /> Memuat
                          konten...
                        </div>
                      )}
                      {showDetail && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-slate-800">
                            Judul Materi : {detail?.title}
                          </h3>
                          {detail?.description && (
                            <div
                              className="text-sm text-slate-600 text-justify"
                              dangerouslySetInnerHTML={{
                                __html: detail.description,
                              }}
                            />
                          )}
                          {detail?.content?.file_url && (
                            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                              <div className="flex items-center gap-2 text-sm text-slate-700">
                                <FileText size={16} className="text-teal-600" />
                                {a.title}
                                {detail.content.file_size && (
                                  <span className="text-xs text-slate-400">
                                    ({formatFileSize(detail.content.file_size)})
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenContent(a, detail)}
                                className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-teal-300 hover:text-teal-700"
                              >
                                <ActionIcon size={13} /> {action}
                              </button>
                            </div>
                          )}
                          {detail?.content?.video_url && (
                            <iframe
                              src={getYoutubeEmbedUrl(detail.content.video_url)}
                              title={detail.title}
                              className="w-full rounded-xl aspect-video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                          {!isQuiz &&
                            !detail?.content?.file_url &&
                            !detail?.content?.video_url && (
                              <button
                                onClick={() => handleOpenContent(a, detail)}
                                className="flex justify-end gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-teal-300 hover:text-teal-700"
                              >
                                <ActionIcon size={13} /> {action}
                              </button>
                            )}
                          {!a.is_completed && (
                            <div className="flex w-full justify-center mt-5">
                              {a.type?.toLowerCase().includes("quiz") ? (
                                <button
                                  onClick={() => handleOpenContent(a, detail)}
                                  className="w-full rounded-lg bg-teal-500 px-3 py-2 text-white hover:bg-teal-600"
                                >
                                  <span className="flex items-center justify-center gap-2">
                                    <Play size={16} />
                                    Mulai Kuis
                                  </span>
                                </button>
                              ) : (
                                <button
                                  disabled={finishMutation.isPending}
                                  onClick={() => finishModule(a.id)}
                                  className="w-full rounded-lg bg-teal-500 px-3 py-2 text-white hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {finishMutation.isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                      <Loader2
                                        className="animate-spin"
                                        size={16}
                                      />
                                      Menyimpan...
                                    </span>
                                  ) : (
                                    <span className="flex items-center justify-center gap-2">
                                      <CheckCircle size={16} />
                                      Selesaikan Modul Ini
                                    </span>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-center">
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle
                    cx="55"
                    cy="55"
                    r={r}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r={r}
                    fill="none"
                    stroke="#0D9488"
                    strokeWidth="10"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 55 55)"
                    style={{ transition: "stroke-dashoffset 0.4s ease" }}
                  />
                  <text
                    x="55"
                    y="61"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="700"
                    fill="#1E293B"
                  >
                    {percent}%
                  </text>
                </svg>
              </div>
              <p className="mt-2 text-center text-sm text-slate-500">
                {done} dari {total} aktivitas selesai
              </p>

              <button
                onClick={handleContinue}
                className="mt-5 w-full rounded-full bg-slate-600 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                {continueLabel}
              </button>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                {activities.map((a, index) => {
                  const prevActivity = activities[index - 1];
                  const isLocked = index > 0 && !prevActivity?.is_completed;

                  return (
                    <button
                      key={a.id}
                      disabled={isLocked}
                      onClick={() => {
                        if (!isLocked) {
                          setOpenActivityId(a.id);
                          document
                            .getElementById(`activity-${a.id}`)
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                        }
                      }}
                      className={`flex w-full items-center justify-between gap-2 text-left text-xs transition ${
                        isLocked
                          ? "cursor-not-allowed text-slate-300"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <span className="truncate">{a.title}</span>
                      {isLocked ? (
                        <Lock size={14} className="shrink-0 text-slate-300" />
                      ) : a.is_completed ? (
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-teal-600"
                        />
                      ) : (
                        <Circle size={14} className="shrink-0 text-slate-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Ujian Akhir & Sertifikat */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            {/* Ujian Akhir &amp; Sertifikat */}
            Sertifikat
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Lengkapi semua aktivitas untuk mendapatkan sertifikat
          </p>

          <div className="relative mt-6">
            <div className="absolute bottom-5 left-5 top-5 w-px bg-slate-200" />
            <div className="space-y-6">
              {/* Ujian Akhir */}
              {/* <div
                id="stage-exam"
                className={`flex items-start gap-4 rounded-xl p-2 transition ${
                  highlightId === "exam" ? "bg-teal-50" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    !examUnlocked
                      ? "bg-slate-100 text-slate-400"
                      : finalExam.completed
                        ? "bg-teal-600 text-white"
                        : "bg-teal-50 text-teal-600"
                  }`}
                >
                  {!examUnlocked ? (
                    <Lock size={17} />
                  ) : finalExam.completed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <GraduationCap size={18} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800">
                    Ujian Akhir: {course?.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {!examUnlocked
                      ? "Selesaikan semua aktivitas terlebih dahulu"
                      : finalExam.completed
                        ? `Skor ${finalExam.score}/100 · ${
                            (finalExam.score ?? 0) >= 70
                              ? "Lulus"
                              : "Belum lulus, silakan ulangi"
                          }`
                        : "30 soal · 60 menit"}
                  </p>
                </div>
                <button
                  onClick={() => examUnlocked && toggleExam()}
                  disabled={!examUnlocked}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    !examUnlocked
                      ? "cursor-not-allowed border-slate-200 text-slate-300"
                      : "border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700"
                  }`}
                >
                  {finalExam.completed ? "Lihat Hasil" : "Mulai Ujian"}
                </button>
              </div> */}

              {/* Sertifikat */}
              <div
                id="stage-cert"
                className={`flex items-start gap-4 rounded-xl p-2 transition ${
                  highlightId === "cert" ? "bg-teal-50" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    !certUnlocked
                      ? "bg-slate-100 text-slate-400"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {certUnlocked ? <Award size={18} /> : <Lock size={17} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800">
                    Sertifikat Kelulusan
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {certUnlocked
                      ? "Sertifikat siap diunduh"
                      : "Lengkapi semua aktivitas untuk mendapatkan sertifikat"}
                  </p>
                </div>
                <button
                  disabled={!certUnlocked}
                  onClick={handleDownloadCertificate}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5  font-semibold transition ${
                    certUnlocked
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "cursor-not-allowed border border-slate-200 text-slate-300"
                  }`}
                >
                  <Download size={13} /> Unduh Sertifikat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityTextModal
        open={!!selectedText}
        title={selectedText?.title}
        description={selectedText?.description}
        content={selectedText?.content?.content}
        onClose={() => setSelectedText(null)}
      />
      <QuizModal
        open={!!selectedQuiz}
        title={selectedQuiz?.title}
        onClose={() => setSelectedQuiz(null)}
        activityId={selectedQuiz?.id}
        courseId={course?.id}
        token={session?.accessToken}
      />
      <CertificateModal
        open={!!selectedCertificate}
        onClose={() => setSelectedCertificate(false)}
        courseId={course?.id || ""}
        token={session?.accessToken || ""}
      />
    </div>
  );
}
