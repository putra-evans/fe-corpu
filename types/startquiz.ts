export interface StartQuizPayload {
  courseId: string;
  activityId: string;
  token: string;
}

interface QuizOption {
  id: string;
  option_text: string;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: "multiple_choice";
  weight: number;
  options: QuizOption[];
}

export interface StartQuizResponse {
  status: boolean;
  message: string;
  data: {
    course_id: string;
    activity_id: string;
    attempt_id: string;
    attempt_no: number;
    started_at: string;
    time_limit: number;
    passing_grade: number;
    total_questions: number;
    questions: QuizQuestion[];
  };
}
