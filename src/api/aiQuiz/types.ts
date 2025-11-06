import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { Endpoint } from '../types'

export type AIQuizItemResponse = Pick<QuizItem, 'question' | 'options'> & {
  answerIndex: number
}

export type FetchAIQuizAPI = Endpoint<{
  payload: {
    language?: Language
    difficulty?: string
    startStage?: number
    endStage?: number
  }
  response: AIQuizItemResponse[]
  processed: QuizItem[]
}>
