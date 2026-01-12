export interface ClassSession {
  id: string;
  dayOfWeek?: string; // Mapeado para day_of_week no DB
  startTime: string;  // Mapeado para start_time
  endTime: string;    // Mapeado para end_time
  subject: string;
  room?: string;
  color: string;
  date?: string; 
  stats?: {
    goals: number;
    exclusions: number;
  };
}

export interface Test {
  id: string;
  subject: string;
  topic: string;
  date: string;
  startTime: string; // start_time
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export interface StudySession {
  id: string;
  testId: string; // test_id
  date: string;
  startTime: string; // start_time
  focusTopic: string; // focus_topic
  durationMinutes: number; // duration_minutes
  completed: boolean;
}

export type ViewState = 'home' | 'schedule' | 'tests' | 'add-test' | 'add-event' | 'handball';