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
  const sizeClassName = useClassNameByOrientation('w-40 h-40', 'w-28 h-28')
  const imageClassName = useClassNameByOrientation('mb-md', 'mb-sm')
  const titleClassName = useClassNameByOrientation('text-xl', 'text-md')
  const isPortrait = useIsPortrait()

  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='flex-1'>
      {showLifeline ? (
        <View className='flex-1 max-h-[30vh] my-auto'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='w-full flex flex-col items-center my-auto'>
          <Image
            className={`${imageClassName} ${sizeClassName}`}
            source={require('../../../assets/images/logo.webp')}
          />
          {isPortrait || screen !== SCREENS.game ? (
            <AppText className={`text-center ${titleClassName}`}>
              {t('who-wants-to-be-a-millionaire')}
            </AppText>
          ) : null}
        </View>
      )}
    </View>
  )
})
