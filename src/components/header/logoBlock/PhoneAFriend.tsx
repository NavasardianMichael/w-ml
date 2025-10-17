import { memo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLifelinesStore } from '@/store/lifelines/store'
import { HTML_CODES } from '@/constants/commons'
import { CHAR_CODES_BY_OPTION_SERIAL_NUMBER } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'
import AppText from '@/components/ui/AppText'

export default memo(function PhoneAFriend() {
  const { phoneAFriend, setLifelinesState } = useLifelinesStore()
  const { t } = useTranslation()

  const sizeClassName = useClassNameByOrientation(
    'w-40 h-40',
    'w-[90px] h-[90px]',
  )
  const className = useClassNameByOrientation('mb-8', 'mb-2')

  return (
    <View className='mx-auto relative max-w-52'>
      <View
        className={`mx-auto ${className} ${sizeClassName} flex items-center justify-center`}
      >
        <ICONS.phone />
      </View>
      {phoneAFriend?.suggestedOptionSerialNumber ? (
        <AppText className='text-center text-secondary text-lg'>
          I think the answer is{' '}
          <AppText className='font-bold'>
            {
              CHAR_CODES_BY_OPTION_SERIAL_NUMBER[
                phoneAFriend.suggestedOptionSerialNumber
              ]
            }
          </AppText>
        </AppText>
      ) : (
        <View className='flex flex-col gap-sm items-center'>
          <AppText className='text-secondary font-semibold text-center'>
            {t('please-wait')}
          </AppText>
          <AppText className='text-secondary font-semibold text-center'>
            {t('we-are-getting-in-with-your-friend')}
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
