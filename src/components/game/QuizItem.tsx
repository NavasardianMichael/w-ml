import { useCallback, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { useSettingsStore } from '@/store/settings/store'
import { useSoundStore } from '@/store/sound/store'
import { setLastQuestionNumberBySafeHavenNumberByLanguage } from '@/services/localStorage/api'
import { OptionSerialNumber, QuestionStage } from '@/types/game'
import { sleep } from '@/helpers/commons'
import { getBgSoundIdByQuestionStage } from '@/helpers/game'
import { SCREENS } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { SOUND_DURATION_BY_URI, SOUNDS_URIS } from '@/constants/sound'

import { useCurrentQuizItem } from '@/hooks/useCurrentQuizItem'
import { useIsPortrait } from '@/hooks/useIsPortrait'
import AppText from '@/components/ui/AppText'

const QuizItem = () => {
  const {
    currentQuestionStage,
    setGameState,
    setIsSidebarOpen,
    setAnsweredOptionSerialNumber,
    initNewQuizItemByLanguageAndSafeHavenNumber,
  } = useGameStore()
  const { playSoundById, stopAllTracks } = useSoundStore()
  const {
    setLifelinesState,
    currentLifeline,
    fiftyFifty,
    switchQuestion,
    setSwitchQuestionLifeline,
  } = useLifelinesStore()
  const { language } = useSettingsStore()
  const { t } = useTranslation()
  const isPortrait = useIsPortrait()

  const currentQuizItem = useCurrentQuizItem()

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)

  const onOptionPress = async (option: string, serialNumber: number) => {
    setLifelinesState({ lifelinesDisabled: true })
    const isSwitchQuestionMode = switchQuestion?.waitingToSwitchQuizItem
    if (isSwitchQuestionMode) {
      setSwitchQuestionLifeline({
        wouldAnswer: serialNumber as OptionSerialNumber,
      })
    }

    setAnsweredOptionSerialNumber(serialNumber as OptionSerialNumber)
    if (!isSwitchQuestionMode) {
      playSoundById(SOUNDS_URIS.finalAnswer)
    }
    await sleep(2000)
    setShowCorrectAnswer(true)
    const isAnswerCorrect =
      serialNumber === currentQuizItem.correctOptionSerialNumber
    if (!isSwitchQuestionMode) {
      playSoundById(
        isAnswerCorrect ? SOUNDS_URIS.correctAnswer : SOUNDS_URIS.wrongAnswer,
      )
    }
    await sleep(2000)

    const asyncStorageSetPayload = {
      language,
      quizItemId: currentQuizItem.id,
    }

    if (isAnswerCorrect) {
      if (!isSwitchQuestionMode) setIsSidebarOpen(true)
      setShowCorrectAnswer(false)
      await sleep(1000)

      if (!isSwitchQuestionMode) {
        setGameState({
          currentQuestionStage: (currentQuestionStage + 1) as QuestionStage,
        })
      }

      setLifelinesState({ currentLifeline: null })
      await sleep(3000)

      setAnsweredOptionSerialNumber(null)
      if (!isSwitchQuestionMode) {
        setIsSidebarOpen(false)
        playSoundById(SOUNDS_URIS.next)
        await sleep(SOUND_DURATION_BY_URI[SOUNDS_URIS.next])
        const safeHavenSoundId =
          getBgSoundIdByQuestionStage(currentQuestionStage)
        playSoundById(safeHavenSoundId, { loop: true })
      }
      setLastQuestionNumberBySafeHavenNumberByLanguage(asyncStorageSetPayload)
    } else {
      setLastQuestionNumberBySafeHavenNumberByLanguage(asyncStorageSetPayload)
      setLifelinesState({ currentLifeline: null })
      await stopAllTracks()
      if (!isSwitchQuestionMode) {
        playSoundById(SOUNDS_URIS.mainTheme, { loop: true })
        setGameState({ screen: SCREENS.home })
      }
    }

    if (isSwitchQuestionMode) {
      initNewQuizItemByLanguageAndSafeHavenNumber({
        language,
        quizItemId: currentQuizItem.id,
      })
      setSwitchQuestionLifeline({ waitingToSwitchQuizItem: false })
    }
    setLifelinesState({ lifelinesDisabled: false })
  }

  const getOptionClassNameByStatus = useCallback(
    (serialNumber: OptionSerialNumber) => {
      if (showCorrectAnswer) {
        const isAnswerCorrect =
          serialNumber === currentQuizItem.correctOptionSerialNumber
        if (isAnswerCorrect) {
          return 'bg-green-500'
        } else if (
          serialNumber === currentQuizItem.answeredOptionSerialNumber
        ) {
          return 'bg-red-500'
        }
      }
      return currentQuizItem.answeredOptionSerialNumber === serialNumber
        ? 'bg-tertiary'
        : ''
    },
    [currentQuizItem, showCorrectAnswer],
  )
  console.log({ currentQuizItem1: currentQuizItem })

  if (!currentQuizItem) return null

  return (
    <View className='bg-primary' key={currentQuizItem.id}>
      <View className='flex flex-col gap-lg mt-auto'>
        <View>
          <AppText className='border-secondary border px-md py-sm box-border rounded-lg text-center'>
            {currentQuizItem.question}
          </AppText>
        </View>
        <View
          className={`flex relative portrait:flex-col landscape:flex-row landscape:flex-wrap`}
        >
          {currentQuizItem.options.map((option, index) => {
            const optionClassNameByStatus = getOptionClassNameByStatus(
              (index + 1) as OptionSerialNumber,
            )
            const isRemovedByFiftyFifty =
              !!currentLifeline &&
              fiftyFifty?.[(index + 1) as OptionSerialNumber]
            return (
              <View
                key={option}
                className={`portrait:w-full landscape:w-[49%] mb-md ${
                  !isPortrait && index % 2 === 1 ? 'ml-[2%]' : ''
                }`}
              >
                <TouchableOpacity
                  disabled={
                    !!currentQuizItem.answeredOptionSerialNumber ||
                    isRemovedByFiftyFifty
                  }
                  className={`border border-secondary rounded-md ${optionClassNameByStatus}`}
                  onPress={() => onOptionPress(option, index + 1)}
                >
                  <View className='flex-row items-center px-md my-sm'>
                    {
                      <View
                        className={`flex flex-row gap-sm items-center ${
                          isRemovedByFiftyFifty ? 'opacity-0' : ''
                        }`}
                      >
                        <AppText
                          className={`text-${
                            optionClassNameByStatus ? 'secondary' : 'tertiary'
                          } font-semibold`}
                        >
                          {t(`option-${String.fromCharCode(97 + index)}`)}.{' '}
                        </AppText>
                        <AppText className='text-secondary'>{option}</AppText>
                      </View>
                    }
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}

          <View
            className={`absolute left-1/2 top-1/2 transform -translate-x-5 -translate-y-7 w-10 h-10 ${
              !switchQuestion?.waitingToSwitchQuizItem ? 'scale-0' : ''
            } transition-transform duration-300 bg-secondary rounded-full p-sm border border-primary`}
          >
            <ICONS.switchDark />
          </View>
        </View>
      </View>
    </View>
  )
}

export default QuizItem
