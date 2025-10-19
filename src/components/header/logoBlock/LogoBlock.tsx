import { memo, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES, SCREENS } from '@/constants/game'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'
import { useIsPortrait } from '@/hooks/useIsPortrait'
import AppText from '@/components/ui/AppText'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const { screen } = useGameStore()

  const { t } = useTranslation()
  const sizeClassName = useClassNameByOrientation(
    'h-full max-h-[36vh]',
    'h-full max-h-[36vh]',
  )
  const imageClassName = useClassNameByOrientation('mb-md ', 'mb-sm')
  const isPortrait = useIsPortrait()

  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])
  // screens: {
  //   xs: '360px', // Small phones
  //   sm: '480px', // Regular phones
  //   md: '768px', // Tablets
  //   lg: '1024px', // Large tablets
  //   xl: '1280px', // Extra large tablets / laptops
  //   tv: '1920px', // TVs and external displays
  // },
  return (
    <View className='flex-1'>
      {showLifeline ? (
        <View className='flex-1 max-h-[30vh] my-auto'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='w-full flex flex-1 flex-col items-center my-auto'>
          <Image
            className={`${imageClassName} ${sizeClassName}`}
            resizeMode='contain'
            source={require('../../../assets/images/logo.webp')}
          />
          {isPortrait || screen !== SCREENS.game ? (
            <AppText>{t('who-wants-to-be-a-millionaire')}</AppText>
          ) : null}
        </View>
      )}
    </View>
  )
})
