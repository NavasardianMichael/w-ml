import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { Endpoint } from '../types'

export type QuizItemResponse = Pick<QuizItem, 'question' | 'options'> & {
  answerIndex: number
}

export type FetchQuizItemAPI = Endpoint<{
  payload: {
    language?: Language
    difficulty?: string
    startStage?: number
    endStage?: number
  }
  response: QuizItemResponse[]
  processed: QuizItem[]
}>
