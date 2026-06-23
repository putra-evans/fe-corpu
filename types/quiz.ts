export type course = {
  id: string;
  title: string;
};

export type activity = {
  id: string;
  title: string;
};

export type IntroQuizResponse = {
  course: course[];
  activity: activity[];
  data: {
    quiz_id: string;
    passing_grade: number;
    attempt_limit: number;
    attempt_used: number;
    attempt_remaining: number;
    time_limit: number;
    shuffle_questions: boolean;
    total_questions: number;
    best_score: number;
    is_passed: number | null;
    can_start: boolean;
    last_attempt: string | null;
  };
};
