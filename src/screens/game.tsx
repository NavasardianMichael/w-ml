import { useEffect } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { SOUNDS_URIS } from '@/constants/sound'

import { useCurrentQuizItem } from '@/hooks/useCurrentQuizItem'
import { useSound } from '@/hooks/useSound'
import QuizItem from '@/components/game/QuizItem'
import AppText from '@/components/ui/AppText'

const Game = () => {
  const { setGameState } = useGameStore()
  const { setLifelinesState, switchQuestion } = useLifelinesStore()
  const { t } = useTranslation()

  useSound(SOUNDS_URIS.resign)
  useSound(SOUNDS_URIS.finalAnswer)
  useSound(SOUNDS_URIS.correctAnswer)
  useSound(SOUNDS_URIS.wrongAnswer)
  useSound(SOUNDS_URIS.next)
  useSound(SOUNDS_URIS.easy, { loop: true })
  useSound(SOUNDS_URIS.medium, { loop: true })
  useSound(SOUNDS_URIS.hard, { loop: true })

  const currentQuizItem = useCurrentQuizItem()

  useEffect(() => {
    return () => {
      setGameState({
        currentQuestionStage: 1,
        isSidebarOpen: false,
        quiz: [],
      })
      setLifelinesState({
        currentLifeline: null,
        askAudience: null,
        phoneAFriend: null,
        fiftyFifty: null,
        switchQuestion: null,
        lifelinesPending: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log({ currentQuizItem })

  if (!currentQuizItem) return null

  return (
    <View key={currentQuizItem.id} className='mt-auto'>
      {switchQuestion?.waitingToSwitchQuizItem ? (
        <AppText className='text-center font-semibold mb-sm'>
          {t('which-option-do-you-think-is-correct')}
        </AppText>
      ) : null}
      <QuizItem />
    </View>
  )
}

export default Game
