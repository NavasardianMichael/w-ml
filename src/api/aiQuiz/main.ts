import { paramsToQueryString } from '@/helpers/commons'
import { processQuiz } from './processors'
import { FetchQuizItemAPI } from './types'

export const fetchAIQuiz: FetchQuizItemAPI['api'] = async ({
  language,
  difficulty,
  stagesRange,
}) => {
  const response = await fetch(
    `http://localhost:5111/GetAIQuiz?${paramsToQueryString({
      language,
      difficulty,
      stagesRange,
    })}`,
  )
  const jsonString = await response.json()
  const quizResponse = JSON.parse(jsonString)
  console.log({ quizResponse })

  const processedQuiz = processQuiz(quizResponse)
  return processedQuiz
}
