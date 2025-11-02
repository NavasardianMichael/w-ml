import { paramsToQueryString } from '@/helpers/commons'
import { processQuiz } from './processors'
import { FetchQuizItemAPI } from './types'

export const fetchAIQuiz: FetchQuizItemAPI['api'] = async ({
  language,
  difficulty,
  startStage,
  endStage,
}) => {
  console.log('request sent!!!!!!!!!')

  try {
    const response = await fetch(
      `http://10.0.2.2:5111/GetAIQuiz?${paramsToQueryString({
        language,
        difficulty,
        startStage,
        endStage,
      })}`,
    )
    console.log({ response })

    const quizResponse = await response.json()
    console.log({ quizResponse })
    const processedQuiz = processQuiz(quizResponse)
    return processedQuiz
  } catch (error) {
    console.error({ error })
    return []
  }
}
