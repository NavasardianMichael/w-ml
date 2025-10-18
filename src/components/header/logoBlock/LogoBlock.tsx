import { memo, useMemo } from 'react'
import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLifelinesStore } from '@/store/lifelines/store'
import { LIFELINES } from '@/constants/game'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'
import AppText from '@/components/ui/AppText'
import DisplayCurrentLifeline from './DisplayCurrentLifeline'

export default memo(function LogoBlock() {
  const { currentLifeline } = useLifelinesStore()
  const sizeClassName = useClassNameByOrientation('w-40 h-40', 'w-28 h-28')
  const className = useClassNameByOrientation('mb-8', 'mb-2')
  const { t } = useTranslation()

  const showLifeline = useMemo(() => {
    return !(
      currentLifeline !== LIFELINES.askAudience &&
      currentLifeline !== LIFELINES.phoneAFriend
    )
  }, [currentLifeline])

  return (
    <View className='mt-md flex-1'>
      {showLifeline ? (
        <View className='flex-1 max-h-[30vh] my-auto'>
          <DisplayCurrentLifeline />
        </View>
      ) : (
        <View className='w-full flex flex-col gap-md items-center'>
          <Image
            className={`${className} ${sizeClassName}`}
            source={require('../../../assets/images/logo.webp')}
          />
          <AppText className='text-xl text-center mt-sm'>
            {t('who-wants-to-be-a-millionaire')}
          </AppText>
        </View>
      )}
    </View>
  )
})
