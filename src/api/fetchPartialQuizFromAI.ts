import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'
import { paramsToQueryString } from '@/helpers/commons'

export type FetchQuizItemAPI = {
  payload: {
    language: Language
    difficulty: string
    stagesRange: {
      start: number
      end: number
    }
  }
  response: Promise<
    | (Pick<QuizItem, 'question' | 'options'> & {
        answerIndex: number
      })
    | undefined
  >
}

export const fetchPartialQuizFromAI = async ({
  language,
  difficulty,
  stagesRange,
}: FetchQuizItemAPI['payload']): Promise<FetchQuizItemAPI['response']> => {
  try {
    const response = await fetch(
      `http://localhost:8080/genai/quiz-item?${paramsToQueryString({
        language,
        difficulty,
        stagesRange,
      })}`,
    )

    console.log({ response })
    const jsonString = await response.json()
    console.log({ jsonString })

    const quiz: FetchQuizItemAPI['response'] = JSON.parse(jsonString)
    console.log({ quiz })
    return quiz
  } catch (error) {
    console.error('Error generating word:', error)
  }
}
