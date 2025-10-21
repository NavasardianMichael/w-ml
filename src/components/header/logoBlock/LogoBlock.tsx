import { memo, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useGameStore } from '@/store/game/store'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES, SCREENS } from '@/constants/game'
import { useIsPortrait } from '@/hooks/useIsPortrait'
import AppText from '@/components/ui/AppText'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const { screen } = useGameStore()

  const { t } = useTranslation()
  const isPortrait = useIsPortrait()

  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='flex-1 mt-md'>
      {showLifeline ? (
        <View className='flex-1 max-h-[30vh] my-auto'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='flex flex-1 flex-col items-center my-auto'>
          <Image
            className='portrait:mb-md landscape:mb-sm h-full max-h-[32vh]'
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
