import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { Endpoint } from '../types'

export type SystemQuizItemResponse = Pick<QuizItem, 'question' | 'options'> & {
  id: string
  answerIndex: number
}

export type FetchSystemQuizAPI = Endpoint<{
  payload: {
    language: Language
    startStage: number
    endStage: number
  }
  response: SystemQuizItemResponse[]
  processed: QuizItem[]
}>

export type MarkQuizSeenAPI = Endpoint<{
  payload: {
    quizItemId: string
  }
  response: {
    success: boolean
  }
  processed: boolean
}>
