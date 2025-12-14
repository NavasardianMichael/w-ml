import { useEffect, useMemo, useRef } from 'react'
import { TouchableWithoutFeedbackProps, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useSettingsStore } from '@/store/settings/store'
import { useSoundStore } from '@/store/sound/store'
import { SCREENS } from '@/constants/game'
import { SOUND_DURATION_BY_URI, SOUNDS_URIS } from '@/constants/sound'
import { useSound } from '@/hooks/useSound'
import AppText from '@/components/ui/AppText'
import AppTouchableOpacity from '@/components/ui/AppTouchableOpacity'
import { sleep } from '@/helpers/commons'

export default function Home() {
  const { playSoundById, stopAllTracks } = useSoundStore()
  const { language } = useSettingsStore()
  const { isPending, initQuiz, setScreen } = useGameStore()
  const { t } = useTranslation()
  const hasPlayedRef = useRef(false)

  // Only use useSound to initialize the sound, don't auto-play
  useSound(SOUNDS_URIS.mainTheme)

  // Play main theme only once when component mounts
  useEffect(() => {
    if (hasPlayedRef.current) return // Prevent multiple plays
    hasPlayedRef.current = true

    const playMainTheme = async () => {
      // Stop any existing sounds first
      await stopAllTracks()
      // Then play main theme
      playSoundById(SOUNDS_URIS.mainTheme, { loop: true })
    }
    playMainTheme()
  }, [playSoundById, stopAllTracks])

  useEffect(() => {
    initQuiz({ language })
  }, [language])

  const onStartGamePress: TouchableWithoutFeedbackProps['onPress'] =
    async e => {
      if (isPending) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      setScreen(SCREENS.game)
      playSoundById(SOUNDS_URIS.resign)
      await sleep(SOUND_DURATION_BY_URI[SOUNDS_URIS.resign])
      playSoundById(SOUNDS_URIS.easy, { loop: true })
    }

  const buttonClassName = useMemo(() => {
    return isPending ? 'opacity-50' : ''
  }, [isPending])

  return (
    <View className='flex-1'>
      <View className='flex my-auto flex-col justify-center items-center'>
        <AppTouchableOpacity
          disabled={isPending}
          className={`${buttonClassName} mb-lg`}
          onPress={onStartGamePress}
        >
          <AppText className='text-center'>{t('start-game')}</AppText>
        </AppTouchableOpacity>
      </View>
    </View>
  )
}
