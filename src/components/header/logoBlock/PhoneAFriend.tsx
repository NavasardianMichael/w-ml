import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLifelinesStore } from '@/store/lifelines/store'
import { HTML_CODES } from '@/constants/commons'
import { ICONS } from '@/constants/icons'
import { useOptionNames } from '@/hooks/useOptionNames'
import AppText from '@/components/ui/AppText'

export default memo(function PhoneAFriend() {
  const { phoneAFriend, setLifelinesState } = useLifelinesStore()
  const { t } = useTranslation()
  const optionNames = useOptionNames()

  return (
    <View className='mx-auto relative max-w-52'>
      <View className='mx-auto portrait:mb-8 landscape:mb-2 portrait:w-40 portrait:h-40 landscape:w-[90px] landscape:h-[90px] flex items-center justify-center'>
        <ICONS.callAFriend />
      </View>
      {phoneAFriend?.suggestedOptionSerialNumber ? (
        <AppText className='text-center text-secondary text-md'>
          {t('i-think-the-answer-is')}{' '}
          <AppText className='font-bold text-lg'>
            {optionNames[phoneAFriend.suggestedOptionSerialNumber]}
          </AppText>
        </AppText>
      ) : (
        <View className='flex flex-col gap-sm items-center'>
          <AppText className='text-secondary font-semibold text-center'>
            {t('we-are-getting-in-with-your-friend')}
          </AppText>
          <AppText className='text-secondary font-semibold text-center'>
            {t('please-wait')}
          </AppText>
        </View>
      )}
      {phoneAFriend ? (
        <TouchableOpacity
          className={`w-9 h-9 z-10 absolute -top-4 -right-4 bg-primary border border-secondary rounded-full flex items-center justify-center ${
            !phoneAFriend ? 'opacity-50' : 'opacity-100'
          }`}
          onPress={() => {
            setLifelinesState({ currentLifeline: null })
          }}
        >
          <AppText className='text-lg text-secondary '>
            {HTML_CODES.close}
          </AppText>
        </TouchableOpacity>
      ) : null}
    </View>
  )
})
