import { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useLifelinesStore } from '@/store/lifelines/store'
import { useSettingsStore } from '@/store/settings/store'
import { LIFELINES } from '@/constants/game'
import { IMAGES } from '@/constants/images'
import CountDown from '@/components/game/Countdown/Countdown'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const { timer } = useSettingsStore()
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='flex-1 mt-md'>
      <View className='portrait:mb-md landscape:mb-sm max-h-[36vh]'>
        {showLifeline ? (
          <DisplayCurrentLifeline />
        ) : timer.enabled ? (
          <CountDown />
        ) : (
          <IMAGES.logo />
        )}
      </View>
    </View>
  )
})
