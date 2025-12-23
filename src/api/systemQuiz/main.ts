import { getDeviceId } from '@/services/localStorage/api'
import { paramsToQueryString } from '@/helpers/commons'
import { ENV_VARS } from '@/constants/environment'
import { API_ENDPOINTS } from '../config'
import { API_LANGUAGE_MAPPINGS } from './constants'
import { processSystemQuiz, processMarkQuizSeen } from './processors'
import { FetchSystemQuizAPI, MarkQuizSeenAPI } from './types'

export const fetchSystemQuiz: FetchSystemQuizAPI['api'] = async ({
  language,
  startStage,
  endStage,
}) => {
  try {
    const deviceId = await getDeviceId()

    const url = `${ENV_VARS.apiURL}${
      API_ENDPOINTS.getSystemQuiz
    }?${paramsToQueryString({
      language: API_LANGUAGE_MAPPINGS[language],
      startStage,
      endStage,
      deviceId,
    })}`

    console.log('Fetching system quiz:', {
      url,
      baseURL: ENV_VARS.apiURL,
      endpoint: API_ENDPOINTS.getSystemQuiz,
      language: API_LANGUAGE_MAPPINGS[language],
      startStage,
      endStage,
      deviceId,
    })

    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response
        .text()
        .catch(() => 'Unable to read error response')
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url,
        errorText,
      })
      throw new Error(`HTTP error! status: ${response.status}, url: ${url}`)
    }
    console.log('Response:', response)
    const quizResponse = await response.json()
    console.log('Quiz response:', quizResponse)

    const processedQuiz = processSystemQuiz(quizResponse)
    console.log('Processed quiz:', processedQuiz)
    return processedQuiz
  } catch (error) {
    console.error('Error fetching system quiz:', error)
    return []
  }
}

export const markQuizSeen: MarkQuizSeenAPI['api'] = async ({ quizItemId }) => {
  try {
    const deviceId = await getDeviceId()

    const url = `${ENV_VARS.apiURL}${API_ENDPOINTS.markQuizSeen}`

    console.log('Marking quiz as seen:', { quizItemId, deviceId })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId,
        quizItemId,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Mark quiz seen result:', result)

    return processMarkQuizSeen(result)
  } catch (error) {
    console.error('Error marking quiz as seen:', error)
    return false
  }
}
