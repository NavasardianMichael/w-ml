import { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import { IMAGES } from '@/constants/images'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='h-full flex-1 flex grow justify-center items-center'>
      {showLifeline ? (
        <View className='max-h-50vh'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='h-full grow flex flex-1'>
          <IMAGES.logo />
        </View>
      )}
    </View>
  )
})
