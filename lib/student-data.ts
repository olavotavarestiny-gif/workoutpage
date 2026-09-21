import { modules, type CourseModule } from './config';

export type TrainingCategory =
  | 'Força'
  | 'Cardio'
  | 'Pernas'
  | 'Abdómen'
  | 'Mobilidade';
export const libraryFilters = [
  'Todos',
  'Força',
  'Cardio',
  'Pernas',
  'Abdómen',
  'Mobilidade',
] as const;
export type LibraryFilter = (typeof libraryFilters)[number];
export type WorkoutProgram = CourseModule & {
  categories: TrainingCategory[];
  lessonCount: number;
  lessonMinutes: number;
  level: string;
  progress: number;
};
export type StudentProfile = {
  name: string;
  avatar: string;
  currentWorkout: string;
  currentLesson: {
    number: number;
    durationSeconds: number;
    elapsedSeconds: number;
    url: string | null;
  };
  progress: number;
  trainingStreak: number;
  minutesTrained: number;
  completedWorkouts: number;
  workoutsThisWeek: number;
};
export type PartnerAd = {
  id: string;
  brand: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
  link: string | null;
  cta: string;
  placement: 'spotlight' | 'card';
};

// All illustrative student, programme and campaign content lives here.
// Cademi module URLs and supplied assets remain in their existing configuration.
export const studentDemo = {
  isDemo: true,
  user: {
    name: 'João',
    avatar: '',
    currentWorkout: 'cross-training',
    currentLesson: {
      number: 4,
      durationSeconds: 1260,
      elapsedSeconds: 1122,
      url: null,
    },
    progress: 35,
    trainingStreak: 5,
    minutesTrained: 260,
    completedWorkouts: 12,
    workoutsThisWeek: 3,
  } satisfies StudentProfile,
  newUser: {
    name: 'João',
    avatar: '',
    currentWorkout: 'cross-training',
    currentLesson: {
      number: 1,
      durationSeconds: 1260,
      elapsedSeconds: 0,
      url: null,
    },
    progress: 0,
    trainingStreak: 0,
    minutesTrained: 0,
    completedWorkouts: 0,
    workoutsThisWeek: 0,
  } satisfies StudentProfile,
  programmes: {
    'cross-training': {
      categories: ['Força', 'Cardio'],
      lessonCount: 4,
      lessonMinutes: 21,
      level: 'Intermédio',
      progress: 35,
    },
    'pernas-top': {
      categories: ['Pernas', 'Força'],
      lessonCount: 2,
      lessonMinutes: 21,
      level: 'Intermédio',
      progress: 0,
    },
    'fight-kombat': {
      categories: ['Cardio'],
      lessonCount: 3,
      lessonMinutes: 20,
      level: 'Intermédio',
      progress: 60,
    },
    'barriga-zero': {
      categories: ['Abdómen'],
      lessonCount: 4,
      lessonMinutes: 21,
      level: 'Todos os níveis',
      progress: 0,
    },
    tabata: {
      categories: ['Cardio', 'Força'],
      lessonCount: 4,
      lessonMinutes: 21,
      level: 'Intermédio',
      progress: 0,
    },
  } satisfies Record<string, Omit<WorkoutProgram, keyof CourseModule>>,
  ads: [
    {
      id: 'unitel-spotlight',
      brand: 'unitel',
      title: 'Treina. Evolui.\nMantém-te ligado.',
      description: 'O teu ritmo vai contigo. Dentro e fora do treino.',
      image: '/images/bruno-fit90-hero.jpg',
      imageAlt: 'Bruno Samora com a sua garrafa de treino',
      link: null,
      cta: 'Descobrir',
      placement: 'spotlight',
    },
    {
      id: 'pumangol-card',
      brand: 'pumangol',
      title: 'Energia para ir mais longe.',
      description: 'Uma marca presente no teu caminho.',
      image: null,
      imageAlt: 'Pumangol',
      link: null,
      cta: 'Conhecer a marca',
      placement: 'card',
    },
    {
      id: 'mfm-card',
      brand: 'mfm',
      title: 'Encontra o teu ritmo.',
      description: 'Uma companhia para os teus dias em movimento.',
      image: null,
      imageAlt: 'Rádio MFM',
      link: null,
      cta: 'Descobrir',
      placement: 'card',
    },
  ] satisfies PartnerAd[],
};

export function getStudentDemo(isNew = false): {
  user: StudentProfile;
  programmes: WorkoutProgram[];
} {
  const user = isNew ? studentDemo.newUser : studentDemo.user;
  return {
    user,
    programmes: modules.map((module) => ({
      ...module,
      ...studentDemo.programmes[
        module.slug as keyof typeof studentDemo.programmes
      ],
      progress: isNew
        ? 0
        : studentDemo.programmes[
            module.slug as keyof typeof studentDemo.programmes
          ].progress,
    })),
  };
}

export function filterProgrammes(
  programmes: WorkoutProgram[],
  category: LibraryFilter,
  onlyStarted = false,
) {
  return programmes.filter(
    (programme) =>
      (!onlyStarted || programme.progress > 0) &&
      (category === 'Todos' || programme.categories.includes(category)),
  );
}
export function formatPlayback(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)
    .toString()
    .padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')}`;
}
export function formatTrainingTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes} min`;
}
