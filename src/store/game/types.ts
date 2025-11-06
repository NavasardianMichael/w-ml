import { OptionSerialNumber, QuestionStage, Screen } from '@/types/game'
import { DifficultyKey, Language } from '@/types/settings'

export type GameState = {
  screen: Screen
  isPending: boolean
  currentQuestionStage: QuestionStage
  quiz: QuizItem[]
  isSidebarOpen: boolean
}

export type QuizItem = {
  id: string
  question: string
  options: string[]
  answeredOptionSerialNumber: OptionSerialNumber | null
  correctOptionSerialNumber: OptionSerialNumber
}

export type GameStateActions = {
  setGameState: (state: Partial<GameState>) => void
  setIsSidebarOpen: (isOpen: boolean) => void
  setScreen: (screen: Screen) => void
  toggleIsSidebarOpen: () => void
  setAnsweredOptionSerialNumber: (
    serialNumber: OptionSerialNumber | null,
  ) => void
  initQuiz: (payload: {
    language?: Language
    difficulty?: DifficultyKey
    startStage?: number
    endStage?: number
    replaceLastQuizItem?: boolean
  }) => Promise<GameState['quiz']>
}
