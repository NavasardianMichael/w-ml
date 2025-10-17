import { memo, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'
import { useIsPortrait } from '@/hooks/useIsPortrait'
import AppText from '@/components/ui/AppText'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const sizeClassName = useClassNameByOrientation('w-40 h-40', 'w-28 h-28')
  const className = useClassNameByOrientation('mb-8', 'mb-2')
  const { t } = useTranslation()

  const isPortrait = useIsPortrait()
  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])
  const Lifeline = showLifeline ? (
    <DisplayCurrentLifeline />
  ) : (
    <AppText className='text-xl text-center mt-sm'>
      {t('who-wants-to-be-a-millionaire')}
    </AppText>
  )

  if (isPortrait) {
    return (
      <View className='flex-1 flex flex-col mt-md'>
        <Image
          className={`mx-auto ${className} ${sizeClassName}`}
          source={require('../../../assets/images/logo.webp')}
        />
        {Lifeline}
      </View>
    )
  } else {
    return (
      <>
        : (
        <Image
          className={`mx-auto ${className} ${sizeClassName}`}
          source={require('../../../assets/images/logo.webp')}
        />
        ){Lifeline}
      </>
    )
  }
})
