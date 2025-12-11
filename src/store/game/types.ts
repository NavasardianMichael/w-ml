import { OptionSerialNumber, QuestionStage, Screen } from '@/types/game'
import { Language } from '@/types/settings'

export type GameState = {
  screen: Screen
  isPending: boolean
  currentQuestionStage: QuestionStage
  quiz: QuizItem[]
  isSidebarOpen: boolean
  isPrefetching: boolean
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
  initQuiz: (payload: { language: Language }) => Promise<GameState['quiz']>
  fetchNextBatch: (payload: {
    language: Language
    startStage: number
    endStage: number
  }) => Promise<void>
  markCurrentQuizSeen: () => Promise<void>
  goToNextQuestion: () => void
  switchCurrentQuestion: (payload: { language: Language }) => Promise<void>
}
