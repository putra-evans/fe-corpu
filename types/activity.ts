export type ListActivityType = {
  id: string;
  title: string;
  type_label: string;
  type: string;
  category: string;
  access_type: string;
  thumbnail: string;
  description: string;
  start_date: string;
  end_date: string;
};

export type CourseType = {
  id: string;
  title: string;
  progress: number;
};

export type ActivityResponse = {
  course: CourseType[];
  data: ListActivityType[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total_data: number;
  };
};

export type DetailActivityType = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  type_label: string;
  order: number;
  is_required: boolean;
  start_date: string;
  end_date: string;
  progress: number;
  is_completed: boolean;
  completed_at: string | null;
  content: Content[];
};

export type DetailActivityResponse = {
  data: DetailActivityType[];
};

export type Content = {
  file_name: string;
  file_url: string;
  file_type: string;
};
