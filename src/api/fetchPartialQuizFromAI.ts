import { GoogleGenAI } from '@google/genai'
import { QuizItem } from '@/store/game/types'
import { Language } from '@/types/settings'

const ai = new GoogleGenAI({
  apiKey: '',
})

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
}: FetchQuizItemAPI['payload']): FetchQuizItemAPI['response'] => {
  try {
    const response = await ai.models.generateContent({
      config: {
        responseMimeType: 'application/json',
        temperature: 0.9,
        responseSchema: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              question: { type: 'STRING' },
              answerIndex: { type: 'NUMBER' },
              options: {
                type: 'ARRAY',
                items: { type: 'STRING' },
              },
            },
          },
        },
      },
      model: 'gemini-2.5-flash',
      contents: `We are playing "Who Wants to Be a Millionaire".
      You are the game's question creator.
      Create one question in ${language} language, the overall difficulty level of the question should be ${difficulty}. The question difficulty should be for stages ${stagesRange.start}-${stagesRange.end} out of 15. The question can be not only country or language-specific, but about a globally recognized topic as well (e.g., science, history, geography, arts, pop culture). Return a json, which has 3 properties: question (question text), options: (array of 4 string options), answerIndex: (index of the correct answer).
      The answers should be short, unambiguous and without explanation.
      Among the options there should be one correct and 3 wrong ones.`,
    })

    const jsonString = response?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!jsonString) {
      throw new Error('No content found in API response.')
    }

    const quizItem: FetchQuizItemAPI['response'] = JSON.parse(jsonString)
    return quizItem
  } catch (error) {
    console.error('Error generating word:', error)
  }
}
