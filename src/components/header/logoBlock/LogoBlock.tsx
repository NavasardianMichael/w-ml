import { memo, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'
import { useIsPortrait } from '@/hooks/useIsPortrait'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const sizeClassName = useClassNameByOrientation('w-40 h-40', 'w-28 h-28')
  const className = useClassNameByOrientation('mb-8', 'mb-2')

  const isPortrait = useIsPortrait()
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  if (isPortrait) {
    return (
      <View className='flex-1 flex flex-col gap-md mx-auto mt-md'>
        <Image
          className={`${className} ${sizeClassName}`}
          source={require('../../../assets/images/logo.webp')}
        />

        {showLifeline ? <DisplayCurrentLifeline /> : null}
      </View>
    )
  } else {
    return (
      <>
        {showLifeline ? (
          <DisplayCurrentLifeline />
        ) : (
          <Image
            className={`mx-auto ${className} ${sizeClassName}`}
            source={require('../../../assets/images/logo.webp')}
          />
        )}
      </>
    )
  }
})
