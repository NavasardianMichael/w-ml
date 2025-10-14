import { memo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useLifelinesStore } from '@/store/lifelines/store'
import { HTML_CODES } from '@/constants/commons'
import { CHAR_CODES_BY_OPTION_SERIAL_NUMBER } from '@/constants/game'
import { ICONS } from '@/constants/icons'
import { useClassNameByOrientation } from '@/hooks/useClassNameByOrientation'

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
        <Text className='text-center text-secondary text-lg'>
          I think the answer is{' '}
          <Text className='font-bold'>
            {
              CHAR_CODES_BY_OPTION_SERIAL_NUMBER[
                phoneAFriend.suggestedOptionSerialNumber
              ]
            }
          </Text>
        </Text>
      ) : (
        <View className='flex flex-col gap-sm items-center'>
          <Text className='text-secondary font-semibold text-center'>
            {t('please-wait')}
          </Text>
          <Text className='text-secondary font-semibold text-center'>
            {t('we-are-getting-in-with-your-friend')}
          </Text>
        </View>
      )}
      {phoneAFriend ? (
        <TouchableOpacity
          className={`p-md z-10 absolute -top-4 -right-4 rounded-full bg-primary ${
            !phoneAFriend ? 'opacity-50' : 'opacity-100'
          }`}
          onPress={() => {
            setLifelinesState({ currentLifeline: null })
          }}
        >
          <Text className='text-lg text-secondary border border-secondary rounded'>
            {HTML_CODES.close}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
})
