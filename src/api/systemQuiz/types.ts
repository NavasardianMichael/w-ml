import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { Endpoint } from '../types'

export type SystemQuizItemResponse = Pick<QuizItem, 'question' | 'options'> & {
  answerIndex: number
}

export type FetchSystemQuizAPI = Endpoint<{
  payload: {
    language?: Language
    difficulty?: string
    startStage?: number
    endStage?: number
  }
  response: SystemQuizItemResponse[]
  processed: QuizItem[]
}>
