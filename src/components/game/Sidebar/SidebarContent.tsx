import { useMemo } from 'react'
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { SingleLifelineActionPayload } from '@/store/lifelines/types'
import { useSoundStore } from '@/store/sound/store'
import { Lifeline } from '@/types/game'
import { sleep } from '@/helpers/commons'
import { getBgSoundIdByQuestionStage } from '@/helpers/game'
import { HTML_CODES } from '@/constants/commons'
import { LIFELINES, QUESTION_STAGES } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { SOUND_DURATION_BY_URI, SOUND_ID_BY_LIFELINE } from '@/constants/sound'
import { useCurrentQuizItem } from '@/hooks/useCurrentQuizItem'
import { useSound } from '@/hooks/useSound'
import AppText from '@/components/ui/AppText'
import LIFELINES_TEMPLATE from './lifelinesTemplate'

export default function SidebarContent() {
  const {
    currentQuestionStage,
    setIsSidebarOpen,
    isSidebarOpen,
    toggleIsSidebarOpen,
  } = useGameStore()
  const { playSoundById } = useSoundStore()
  const lifelinesStore = useLifelinesStore()
  const {
    lifelinesDisabled,
    setFiftyFiftyLifeline,
    setAskAudienceLifeline,
    setPhoneAFriendLifeline,
    setSwitchQuestionLifeline,
    setLifelinesState,
  } = lifelinesStore

  const currentQuizItem = useCurrentQuizItem()
  const { t } = useTranslation()

  useSound(SOUND_ID_BY_LIFELINE.fiftyFifty)
  useSound(SOUND_ID_BY_LIFELINE.askAudience)
  useSound(SOUND_ID_BY_LIFELINE.phoneAFriend)

  const isAnswerPending = useMemo(() => {
    return !currentQuizItem || !!currentQuizItem.answeredOptionSerialNumber
  }, [currentQuizItem])

  const lifelineActions: Record<
    Exclude<Lifeline, 'switchQuestion'>,
    (payload: SingleLifelineActionPayload) => void
  > = useMemo(() => {
    return {
      fiftyFifty: setFiftyFiftyLifeline,
      askAudience: setAskAudienceLifeline,
      phoneAFriend: setPhoneAFriendLifeline,
    }
  }, [setAskAudienceLifeline, setFiftyFiftyLifeline, setPhoneAFriendLifeline])

  const onLifelinePress = async (lifeline: Lifeline) => {
    const lifelineSoundId = SOUND_ID_BY_LIFELINE[lifeline]

    if (lifeline === LIFELINES.switchQuestion) {
      setIsSidebarOpen(false)
      playSoundById(lifelineSoundId)
      setSwitchQuestionLifeline({ waitingToSwitchQuizItem: true })
      await sleep(800)
      return
    }

    setLifelinesState({ currentLifeline: lifeline, lifelinesDisabled: true })

    setIsSidebarOpen(false)
    playSoundById(lifelineSoundId)
    if (lifeline === LIFELINES.fiftyFifty) {
      await sleep(800) // to make it feel snappier
    } else {
      await sleep(SOUND_DURATION_BY_URI[lifelineSoundId])
    }

    lifelineActions[lifeline as Exclude<Lifeline, 'switchQuestion'>]({
      correctOptionSerialNumber: currentQuizItem.correctOptionSerialNumber,
      currentQuestionStage,
    })

    await sleep(3000)
    const safeHavenSoundId = getBgSoundIdByQuestionStage(currentQuestionStage)
    playSoundById(safeHavenSoundId, { loop: true })
    setLifelinesState({ lifelinesDisabled: false })
  }

  return (
    <>
      <View
        className={`absolute flex-1 w-80 -bottom-lg -top-lg z-10 p-lg transition ${
          !isSidebarOpen ? '-right-full' : '-right-lg'
        } bg-indigo-700 border-l border-l-secondary`}
      >
        <View className='absolute top-lg right-lg z-20 rotate-180'>
          <TouchableOpacity
            className='w-6 h-6'
            onPress={() => toggleIsSidebarOpen()}
          >
            <ICONS.sidebar />
          </TouchableOpacity>
        </View>
        <View className='h-full'>
          <View className='flex-row gap-sm'>
            {LIFELINES_TEMPLATE.map(({ id, icon }) => {
              const isDisabled =
                isAnswerPending || lifelinesDisabled || !!lifelinesStore[id]

              const sizingByLifeline =
                id === LIFELINES.fiftyFifty ? 'h-8 w-8' : 'h-6 w-6'

              return (
                <TouchableHighlight
                  key={id}
                  className='relative flex justify-center items-center border border-secondary w-12 h-12 rounded-full '
                  disabled={isDisabled}
                  onPress={() => onLifelinePress(id)}
                >
                  <View
                    className={`${sizingByLifeline} flex justify-center items-center`}
                  >
                    <View
                      className={`w-full ${
                        isDisabled ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      {icon}
                    </View>
                    {lifelinesStore[id] ? (
                      <View className='absolute left-50 top-50 -translate-x-1/2 -translate-y-1/2'>
                        <AppText className='text-red-500 text-2xl '>
                          {HTML_CODES.close}
                        </AppText>
                      </View>
                    ) : null}
                  </View>
                </TouchableHighlight>
              )
            })}
          </View>

          <View className='flex flex-col-reverse my-auto pt-md'>
            {QUESTION_STAGES.map(stage => {
              return (
                <View
                  key={stage}
                  className={`flex-row p-0.05 back ${
                    stage === currentQuestionStage
                      ? 'bg-dark-orange rounded-sm'
                      : ''
                  }`}
                >
                  <>
                    <Text className='transition text-md font-semibold text-right w-6 color-secondary'>
                      {stage}.{' '}
                    </Text>
                    <Text className='text-tertiary w-1'>
                      {stage < currentQuestionStage ? '◆' : ''}
                    </Text>
                    <Text className='text-md color-secondary ml-md'>
                      {t(`currency-symbol`)}
                      {t(`stage-${stage}-money-amount`)}
                    </Text>
                  </>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </>
  )
}
