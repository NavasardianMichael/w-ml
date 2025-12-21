import { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import { IMAGES } from '@/constants/images'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

const LogoImage = IMAGES.logo

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='w-full flex-1 flex grow justify-center items-center'>
      {showLifeline ? (
        <View className='max-h-[30vh]'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='w-full max-h-[30vh]'>
          <LogoImage />
        </View>
      )}
    </View>
  )
})
