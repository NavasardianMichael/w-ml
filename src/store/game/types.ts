import { GetQuizAPI } from '@/api/getQuiz';
import { OptionSerialNumber, QuestionStage, Screen } from '@/types/game';
import { Language } from '@/types/settings';

export type GameState = {
  screen: Screen;
  isPending: boolean;
  currentQuestionStage: QuestionStage;
  quiz: QuizItem[];
  isSidebarOpen: boolean;
};

export type QuizItem = {
  id: string;
  question: string;
  options: string[];
  answeredOptionSerialNumber: OptionSerialNumber | null;
  correctOptionSerialNumber: OptionSerialNumber;
};

export type GameStateActions = {
  setGameState: (state: Partial<GameState>) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setScreen: (screen: Screen) => void;
  toggleIsSidebarOpen: () => void;
  setAnsweredOptionSerialNumber: (
    serialNumber: OptionSerialNumber | null,
  ) => void;
  initQuiz: (payload: GetQuizAPI['payload']) => Promise<GameState['quiz']>;
  initNewQuizItemByLanguageAndSafeHavenNumber: (payload: {
    language: Language;
    quizItemId: string;
  }) => Promise<void>;
};
