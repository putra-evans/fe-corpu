export type CourseItem = {
  id: string;
  slug: string;
  title: string;
  thumbnail?: string;
  category?: string;
  access_type?: string;
  type_label?: string;
  start_date?: string;
  end_date?: string;
  progress?: number; // 0–100, may not exist on upcoming
};

export type DashboardData = {
  user: { nip: string; name: string };
  summary: {
    total_course: number;
    running_course: number;
    completed_course: number;
    upcoming_course: number;
  };
  running_courses: CourseItem[];
  upcomingCourses: CourseItem[];
};

export type DashboardResponse = {
  status: number;
  message: string;
  data: DashboardData;
};
