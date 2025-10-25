import { useMemo } from 'react'
import { TouchableHighlight, View } from 'react-native'
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
import AppButton from '@/components/ui/AppButton'
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

    setLifelinesState({ currentLifeline: lifeline, lifelinesDisabled: true })
    setIsSidebarOpen(false)
    if (lifeline === LIFELINES.switchQuestion) {
      playSoundById(lifelineSoundId)
      setSwitchQuestionLifeline({ waitingToSwitchQuizItem: true })
      return
    }
    console.log({ lifelineSoundId })

    playSoundById(lifelineSoundId)
    await sleep(
      lifeline === LIFELINES.fiftyFifty
        ? 800
        : SOUND_DURATION_BY_URI[lifelineSoundId],
    )

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
        className={`absolute flex-1 min-w-80 bottom-0 top-0 z-10 p-md md:p-xl transition ${
          !isSidebarOpen ? '-right-full' : '-right-0'
        } bg-primary-contrast border-l border-l-secondary`}
      >
        <View className='flex flex-row items-start gap-lg'>
          <View className='flex-row'>
            {LIFELINES_TEMPLATE.map(({ id, icon }, index) => {
              const isDisabled =
                isAnswerPending || lifelinesDisabled || !!lifelinesStore[id]

              const sizingByLifeline =
                id === LIFELINES.fiftyFifty
                  ? 'h-8 w-8 lg:h-10 lg:w-10'
                  : 'h-6 w-6 lg:h-8 lg:w-8'

              return (
                <TouchableHighlight
                  key={id}
                  className={`relative flex justify-center items-center border border-secondary rounded-full w-12 h-12 lg:w-16 lg:h-16 ${
                    index !== 0 ? 'ml-sm' : ''
                  }`}
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
                      <View className='absolute left-50 top-50 -translate-x-[0] -translate-y-[3px]'>
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
          <View className='rotate-180'>
            <AppButton onPress={() => toggleIsSidebarOpen()}>
              <ICONS.sidebar />
            </AppButton>
          </View>
        </View>
        <View className='h-full pt-xs lg:pt-md'>
          <View className='flex flex-col-reverse portrait:gap-[2px] landscape:pt-xs'>
            {QUESTION_STAGES.map(stage => {
              return (
                <View
                  key={stage}
                  className={`flex-row back ${
                    stage === currentQuestionStage
                      ? 'bg-tertiary rounded-sm'
                      : ''
                  }`}
                >
                  <>
                    <AppText className='transition font-semibold text-sm lg:text-lg text-right w-6 color-secondary'>
                      {stage}.{' '}
                    </AppText>
                    <AppText className='text-tertiary w-md lg:w-lg text-sm lg:text-lg'>
                      {stage < currentQuestionStage ? '◆' : ''}
                    </AppText>
                    <AppText className='color-secondary ml-sm text-sm lg:text-lg'>
                      {t(`currency-symbol`)}
                      {t(`stage-${stage}-money-amount`)}
                    </AppText>
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
