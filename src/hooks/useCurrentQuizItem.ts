import { useMemo } from 'react'
import { useGameStore } from '@/store/game/store'
import { QuizItem } from '@/store/game/types'

/**
 * Returns the current quiz item.
 * @returns {QuizItem} The current quiz item.
 *
 * @example
 * const currentQuizItem = useCurrentQuizItem()
 * return <View>{currentQuizItem.question}</View>
 */

export const useCurrentQuizItem = (): QuizItem => {
  const { quiz, currentQuestionStage } = useGameStore()

  return useMemo(() => {
    return quiz[currentQuestionStage - 1]
  }, [quiz, currentQuestionStage])
}
