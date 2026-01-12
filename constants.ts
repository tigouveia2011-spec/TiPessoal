import { ClassSession, Test, StudySession } from "./types";

export const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export const INITIAL_CLASSES: ClassSession[] = [
  // --- ESCOLA (Segunda-feira) ---
  { id: 'seg-1', dayOfWeek: 'Segunda', startTime: '08:00', endTime: '09:00', subject: 'Ciências Naturais', room: 'A218', color: 'bg-teal-100 border-teal-300 text-teal-800' },
  { id: 'seg-2', dayOfWeek: 'Segunda', startTime: '09:05', endTime: '10:05', subject: 'Matemática', room: 'A218', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { id: 'seg-3', dayOfWeek: 'Segunda', startTime: '10:25', endTime: '11:25', subject: 'Português', room: 'A218', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { id: 'seg-4', dayOfWeek: 'Segunda', startTime: '11:35', endTime: '12:35', subject: 'Inglês', room: 'A218', color: 'bg-pink-100 border-pink-300 text-pink-800' },
  { id: 'seg-5', dayOfWeek: 'Segunda', startTime: '12:40', endTime: '13:40', subject: 'Cidadania', room: 'A218', color: 'bg-lime-100 border-lime-300 text-lime-800' },
  // Atividade Extra: Treino
  { id: 'seg-ext-1', dayOfWeek: 'Segunda', startTime: '19:30', endTime: '21:00', subject: 'Treino (Sub-18)', room: 'Almada', color: 'bg-slate-800 border-slate-600 text-slate-100' },

  // --- ESCOLA (Terça-feira) ---
  { id: 'ter-1', dayOfWeek: 'Terça', startTime: '08:00', endTime: '09:00', subject: 'Matemática', room: 'A218', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { id: 'ter-2', dayOfWeek: 'Terça', startTime: '09:05', endTime: '10:05', subject: 'Educação Física', room: 'Ginásio', color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { id: 'ter-3', dayOfWeek: 'Terça', startTime: '10:25', endTime: '11:25', subject: 'Físico-Química', room: 'A218', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { id: 'ter-4', dayOfWeek: 'Terça', startTime: '11:35', endTime: '12:35', subject: 'Português', room: 'A218', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { id: 'ter-5', dayOfWeek: 'Terça', startTime: '12:40', endTime: '13:40', subject: 'TIC', room: 'C106', color: 'bg-gray-100 border-gray-300 text-gray-800' },
  // Atividade Extra: Treino
  { id: 'ter-ext-1', dayOfWeek: 'Terça', startTime: '19:00', endTime: '20:30', subject: 'Treino (Sub-16)', room: 'Alfazina', color: 'bg-slate-800 border-slate-600 text-slate-100' },

  // --- ESCOLA (Quarta-feira) ---
  { id: 'qua-1', dayOfWeek: 'Quarta', startTime: '08:00', endTime: '09:00', subject: 'História', room: 'A218', color: 'bg-red-100 border-red-300 text-red-800' },
  { id: 'qua-2', dayOfWeek: 'Quarta', startTime: '09:05', endTime: '10:05', subject: 'Geografia', room: 'A218', color: 'bg-green-100 border-green-300 text-green-800' },
  { id: 'qua-3', dayOfWeek: 'Quarta', startTime: '10:25', endTime: '11:25', subject: 'Físico-Química', room: 'A218', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { id: 'qua-4', dayOfWeek: 'Quarta', startTime: '11:35', endTime: '12:35', subject: 'Matemática', room: 'A218', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { id: 'qua-5', dayOfWeek: 'Quarta', startTime: '12:40', endTime: '13:40', subject: 'Francês', room: 'A218', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  // Atividade Extra: Treino
  { id: 'qua-ext-1', dayOfWeek: 'Quarta', startTime: '18:30', endTime: '21:00', subject: 'Treino (Sub-16 + Sub-18)', room: 'Almada', color: 'bg-slate-800 border-slate-600 text-slate-100' },

  // --- ESCOLA (Quinta-feira) --- (Dia livre de treinos)
  { id: 'qui-1', dayOfWeek: 'Quinta', startTime: '08:00', endTime: '09:00', subject: 'Inglês', room: 'A218', color: 'bg-pink-100 border-pink-300 text-pink-800' },
  { id: 'qui-2', dayOfWeek: 'Quinta', startTime: '09:05', endTime: '10:05', subject: 'Português', room: 'A218', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { id: 'qui-3', dayOfWeek: 'Quinta', startTime: '10:25', endTime: '11:25', subject: 'Educação Física', room: 'Ginásio', color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { id: 'qui-4', dayOfWeek: 'Quinta', startTime: '11:35', endTime: '12:35', subject: 'Físico-Química', room: 'C108', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { id: 'qui-5', dayOfWeek: 'Quinta', startTime: '12:40', endTime: '13:40', subject: 'Ciências Naturais', room: 'C114', color: 'bg-teal-100 border-teal-300 text-teal-800' },

  // --- ESCOLA (Sexta-feira) ---
  { id: 'sex-1', dayOfWeek: 'Sexta', startTime: '08:00', endTime: '09:00', subject: 'Matemática', room: 'A218', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { id: 'sex-2', dayOfWeek: 'Sexta', startTime: '09:05', endTime: '10:05', subject: 'Geografia', room: 'A218', color: 'bg-green-100 border-green-300 text-green-800' },
  { id: 'sex-3', dayOfWeek: 'Sexta', startTime: '10:25', endTime: '11:25', subject: 'Educação Visual', room: 'A016', color: 'bg-rose-100 border-rose-300 text-rose-800' },
  { id: 'sex-4', dayOfWeek: 'Sexta', startTime: '11:35', endTime: '12:35', subject: 'Educação Visual', room: 'A016', color: 'bg-rose-100 border-rose-300 text-rose-800' },
  { id: 'sex-5', dayOfWeek: 'Sexta', startTime: '14:55', endTime: '15:55', subject: 'Francês', room: 'A216', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  { id: 'sex-6', dayOfWeek: 'Sexta', startTime: '16:15', endTime: '17:15', subject: 'História', room: 'A216', color: 'bg-red-100 border-red-300 text-red-800' },
  // Atividade Extra: Treino
  { id: 'sex-ext-1', dayOfWeek: 'Sexta', startTime: '19:30', endTime: '21:00', subject: 'Treino (Sub-16)', room: 'Almada', color: 'bg-slate-800 border-slate-600 text-slate-100' },

  // --- FIM DE SEMANA ---
  // Sábado: Explicação
  { id: 'sab-ext-1', dayOfWeek: 'Sábado', startTime: '10:30', endTime: '12:00', subject: 'Explicação Inglês', room: 'Centro', color: 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-800' },
  
  // --- JOGOS 2026 ---
  
  // ALMADA VS ALVERCA (JÁ REALIZADO - COM STATS)
  { 
    id: 'game-alverca-2026', 
    dayOfWeek: 'Domingo', 
    date: '2026-01-11', 
    startTime: '15:00', 
    endTime: '16:30', 
    subject: 'JOGO: Almada vs Alverca', 
    room: 'Adelino Moura', 
    color: 'bg-slate-900 border-teal-500 text-white',
    stats: { goals: 3, exclusions: 0 }
  }
];

export const INITIAL_TESTS: Test[] = [
  { 
    id: 't-fr-2026-05', 
    subject: 'Francês', 
    topic: 'Teste (Prof. Fernanda Paula)', 
    date: '2026-05-20', 
    startTime: '10:00',
    difficulty: 'Médio' 
  },
  { 
    id: 't-pt-2026-05', 
    subject: 'Português', 
    topic: 'Teste (Prof. Diana Ferreira)', 
    date: '2026-05-07', 
    startTime: '10:00',
    difficulty: 'Médio' 
  },
  { 
    id: 'v-pt-2026-04', 
    subject: 'Português', 
    topic: 'Visita de Estudo: Os Lusíadas em Belém', 
    date: '2026-04-22', 
    startTime: '09:00',
    difficulty: 'Fácil' 
  },
  { 
    id: 't-pt-2026-03', 
    subject: 'Português', 
    topic: 'Teste (Prof. Diana Ferreira)', 
    date: '2026-03-26', 
    startTime: '10:00',
    difficulty: 'Médio' 
  },
  { 
    id: 't-fr-2026-03', 
    subject: 'Francês', 
    topic: 'Teste (Prof. Fernanda Paula)', 
    date: '2026-03-18', 
    startTime: '10:25',
    difficulty: 'Médio' 
  },
  { 
    id: 't-cn-2026-01', 
    subject: 'Ciências Naturais', 
    topic: 'Teste (Prof. Beatriz Mangucci)', 
    date: '2026-01-19', 
    startTime: '08:00',
    difficulty: 'Médio' 
  },
  { 
    id: 't-mat-2026-01', 
    subject: 'Matemática', 
    topic: 'Teste (Prof. Tiago Ribeiro)', 
    date: '2026-01-16', 
    startTime: '08:00',
    difficulty: 'Difícil' 
  },
  { 
    id: 't-ing-2026-01', 
    subject: 'Inglês', 
    topic: 'Teste (Prof. Maria José)', 
    date: '2026-01-15', 
    startTime: '08:00',
    difficulty: 'Médio' 
  },
  { 
    id: 't-fr-2026-01', 
    subject: 'Francês', 
    topic: 'Teste (Prof. Fernanda Paula)', 
    date: '2026-01-14', 
    startTime: '12:40',
    difficulty: 'Médio' 
  },
];

export const INITIAL_STUDY_SESSIONS: StudySession[] = [
  // Estudo para Francês (14 Jan)
  { id: 's-fr-1', testId: 't-fr-2026-01', date: '2026-01-10', startTime: '17:30', focusTopic: 'Vocabulário e Verbos', durationMinutes: 45, completed: false },
  { id: 's-fr-2', testId: 't-fr-2026-01', date: '2026-01-12', startTime: '18:00', focusTopic: 'Compreensão de Texto', durationMinutes: 60, completed: false },

  // Estudo para Inglês (15 Jan)
  { id: 's-ing-1', testId: 't-ing-2026-01', date: '2026-01-11', startTime: '11:00', focusTopic: 'Grammar Review', durationMinutes: 45, completed: false },
  { id: 's-ing-2', testId: 't-ing-2026-01', date: '2026-01-13', startTime: '17:30', focusTopic: 'Writing Exercises', durationMinutes: 45, completed: false },

  // Estudo para Ciências (19 Jan)
  { id: 's-cn-1', testId: 't-cn-2026-01', date: '2026-01-15', startTime: '17:30', focusTopic: 'Sistemas do Corpo Humano', durationMinutes: 45, completed: false },
  { id: 's-cn-2', testId: 't-cn-2026-01', date: '2026-01-17', startTime: '14:00', focusTopic: 'Ecossistemas e Sustentabilidade', durationMinutes: 60, completed: false },

  // Estudo para Francês (18 Mar)
  { id: 's-fr-mar-1', testId: 't-fr-2026-03', date: '2026-03-14', startTime: '15:00', focusTopic: 'Revisão Gramática', durationMinutes: 60, completed: false },
  { id: 's-fr-mar-2', testId: 't-fr-2026-03', date: '2026-03-16', startTime: '18:00', focusTopic: 'Exercícios de Escrita', durationMinutes: 45, completed: false },

  // Estudo para Português (26 Mar)
  { id: 's-pt-mar-1', testId: 't-pt-2026-03', date: '2026-03-22', startTime: '11:00', focusTopic: 'Gramática: Verbos e Orações', durationMinutes: 45, completed: false },
  { id: 's-pt-mar-2', testId: 't-pt-2026-03', date: '2026-03-24', startTime: '18:00', focusTopic: 'Interpretação de Poemas', durationMinutes: 60, completed: false },

  // Estudo para Português (07 Mai)
  { id: 's-pt-mai-1', testId: 't-pt-2026-05', date: '2026-05-02', startTime: '10:30', focusTopic: 'Leitura de "Os Lusíadas"', durationMinutes: 60, completed: false },
  { id: 's-pt-mai-2', testId: 't-pt-2026-05', date: '2026-05-05', startTime: '18:00', focusTopic: 'Análise de Estrofes', durationMinutes: 60, completed: false },

  // Estudo para Francês (20 Mai)
  { id: 's-fr-mai-1', testId: 't-fr-2026-05', date: '2026-05-16', startTime: '16:00', focusTopic: 'Revisão Oral', durationMinutes: 30, completed: false },
  { id: 's-fr-mai-2', testId: 't-fr-2026-05', date: '2026-05-18', startTime: '17:30', focusTopic: 'Produção Escrita', durationMinutes: 45, completed: false },
];