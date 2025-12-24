import { useMemo, useState, useEffect } from 'react'
import { TouchableHighlight, View, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { SingleLifelineActionPayload } from '@/store/lifelines/types'
import { useSettingsStore } from '@/store/settings/store'
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
import AppSmallIconButton from '@/components/ui/AppSmallIconButton'
import AppText from '@/components/ui/AppText'
import LIFELINES_TEMPLATE from './lifelinesTemplate'
import {
  loadRewardedAd,
  showRewardedAd,
  isRewardedAdLoaded,
} from '@/services/admob/admobService'

export default function SidebarContent() {
  const {
    currentQuestionStage,
    setIsSidebarOpen,
    isSidebarOpen,
    toggleIsSidebarOpen,
    switchCurrentQuestion,
  } = useGameStore()
  const { playSoundById } = useSoundStore()
  const { language } = useSettingsStore()
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
  const [isLoadingAd, setIsLoadingAd] = useState(false)

  useSound(SOUND_ID_BY_LIFELINE.fiftyFifty)
  useSound(SOUND_ID_BY_LIFELINE.askAudience)
  useSound(SOUND_ID_BY_LIFELINE.phoneAFriend)

  const isAnswerPending = useMemo(() => {
    return !currentQuizItem || !!currentQuizItem.answeredOptionSerialNumber
  }, [currentQuizItem])

  // Load rewarded ad when switch question has been used for free
  useEffect(() => {
    const switchQuestionState = lifelinesStore.switchQuestion
    if (
      switchQuestionState?.hasUsedFree &&
      !switchQuestionState.waitingToSwitchQuizItem &&
      !isRewardedAdLoaded()
    ) {
      setIsLoadingAd(true)
      loadRewardedAd()
        .then(() => {
          setIsLoadingAd(false)
        })
        .catch(error => {
          console.error('Failed to load rewarded ad:', error)
          setIsLoadingAd(false)
        })
    }
  }, [
    lifelinesStore.switchQuestion?.hasUsedFree,
    lifelinesStore.switchQuestion?.waitingToSwitchQuizItem,
  ])

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
      const switchQuestionState = lifelinesStore.switchQuestion

      // If already used for free, show ad
      if (switchQuestionState?.hasUsedFree) {
        try {
          // Load ad if not already loaded
          if (!isRewardedAdLoaded()) {
            setIsLoadingAd(true)
            await loadRewardedAd()
            setIsLoadingAd(false)
          }

          // Show the rewarded ad
          await showRewardedAd()

          // After ad is watched, proceed with switching question
          playSoundById(lifelineSoundId)

          // Fetch a new question for the current stage
          await switchCurrentQuestion({ language })

          // Mark the lifeline as waiting to switch
          setSwitchQuestionLifeline({
            waitingToSwitchQuizItem: true,
            wouldAnswer: null,
          })

          // Re-enable other lifelines after switching
          await sleep(1000)
          const safeHavenSoundId = getBgSoundIdByQuestionStage(
            currentQuestionStage,
          )
          playSoundById(safeHavenSoundId, { loop: true })
          setLifelinesState({ lifelinesDisabled: false })

          // Reload ad for next time
          setIsLoadingAd(true)
          loadRewardedAd()
            .then(() => {
              setIsLoadingAd(false)
            })
            .catch(error => {
              console.error('Failed to reload rewarded ad:', error)
              setIsLoadingAd(false)
            })
        } catch (error) {
          console.error('Error showing rewarded ad:', error)
          Alert.alert(
            'Error',
            'Failed to load ad. Please try again later.',
            [{ text: 'OK' }],
          )
          setLifelinesState({ lifelinesDisabled: false })
        }
        return
      }

      // First time use (free)
      playSoundById(lifelineSoundId)

      // Fetch a new question for the current stage
      await switchCurrentQuestion({ language })

      // Mark the lifeline as used (first time free)
      setSwitchQuestionLifeline({
        waitingToSwitchQuizItem: true,
        wouldAnswer: null,
        hasUsedFree: true,
      })

      // Re-enable other lifelines after switching
      await sleep(1000)
      const safeHavenSoundId = getBgSoundIdByQuestionStage(currentQuestionStage)
      playSoundById(safeHavenSoundId, { loop: true })
      setLifelinesState({ lifelinesDisabled: false })
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
        className={`absolute flex-1 min-w-80 bottom-0 top-0 z-10 p-md md:p-lg transition ${
          !isSidebarOpen ? '-right-full' : '-right-0'
        } bg-primary-contrast border-l border-l-secondary`}
      >
        <View className='flex flex-row items-start gap-lg'>
          <View className='flex-row'>
            {LIFELINES_TEMPLATE.map(({ id, icon }, index) => {
              const switchQuestionState = lifelinesStore.switchQuestion
              const isSwitchQuestionUsed =
                id === LIFELINES.switchQuestion &&
                switchQuestionState?.hasUsedFree &&
                !switchQuestionState.waitingToSwitchQuizItem

              // For switch question: disable only if answer is pending, lifelines are disabled, or waiting to switch
              // For other lifelines: disable if answer is pending, lifelines are disabled, or lifeline is used
              const isDisabled =
                id === LIFELINES.switchQuestion
                  ? isAnswerPending ||
                    lifelinesDisabled ||
                    !!switchQuestionState?.waitingToSwitchQuizItem ||
                    isLoadingAd
                  : isAnswerPending || lifelinesDisabled || !!lifelinesStore[id]

              const sizingByLifeline =
                id === LIFELINES.fiftyFifty
                  ? 'xs:h-3 w-3 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
                  : 'xs:h-3 w-3 sm:h-6 sm:w-6 lg:h-8 lg:w-8'

              return (
                <TouchableHighlight
                  key={id}
                  className={`relative flex justify-center items-center border border-secondary rounded-full w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ${
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
                    {/* Show X for used lifelines (except switch question when it shows play icon) */}
                    {lifelinesStore[id] &&
                    !(id === LIFELINES.switchQuestion && isSwitchQuestionUsed) ? (
                      <View className='absolute left-50 top-50 -translate-x-[0] -translate-y-[3px]'>
                        <AppText className='text-red-500 text-2xl '>
                          {HTML_CODES.close}
                        </AppText>
                      </View>
                    ) : null}
                    {/* Show play icon for switch question after free use */}
                    {id === LIFELINES.switchQuestion && isSwitchQuestionUsed ? (
                      <View className='absolute top-0 right-0'>
                        <AppText className='text-green-500 text-lg font-bold'>
                          &#9658;
                        </AppText>
                      </View>
                    ) : null}
                  </View>
                </TouchableHighlight>
              )
            })}
          </View>
          <View className='rotate-180'>
            <AppSmallIconButton onPress={() => toggleIsSidebarOpen()}>
              <ICONS.sidebar />
            </AppSmallIconButton>
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
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </>
  )
}
