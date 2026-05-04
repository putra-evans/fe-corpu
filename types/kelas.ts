export type KelasType = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  type: string;
  access_type: string;
  start_date: string;
  end_date: string;
  thumbnail: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  requirements?: Requirement[];
};

export type KategoriKelasType = {
  id: string;
  name: string;
};

export type DetailKelasType = {
  id: string;
  title: string;
  type: string;
  category: string;
  access_type: string;
  thumbnail: string;
  description: string;
  start_date: string;
  end_date: string;
  activity_summary?: ActivitySummary[];
  requirements?: Requirement[];
};

export interface Requirement {
  id: string;
  label: string;
  type: string;
  is_required: boolean;
}
export interface ActivitySummary {
  type: string;
  label: string;
  total: number;
}

export interface Kelas {
  enrollment_id: string;
  title: string;
  thumbnail?: string;
  status: string;
  category: string;
  registered_at: string;
  status_label: string;
  progress?: number;
}

export interface Meta {
  last_page: number;
}

export interface KelasResponse {
  data: Kelas[];
  meta: Meta;
}
