import { View } from 'react-native'
import { ICONS } from '@/constants/icons'
import { LANGUAGE_NAMES } from '@/constants/settings'
import AppText from '../ui/AppText'

const LANGUAGE_DROPDOWN_OPTIONS = [
  {
    label: (
      <View className='flex flex-row items-center gap-sm h-8'>
        <ICONS.en className='h-full border border-primary' />
        <AppText>{LANGUAGE_NAMES.en}</AppText>
      </View>
    ),
    value: 'en',
  },
  {
    label: (
      <View className='flex flex-row items-center gap-sm h-8'>
        <ICONS.ru className='h-full border border-primary' />
        <AppText>{LANGUAGE_NAMES.ru}</AppText>
      </View>
    ),
    value: 'ru',
  },
  {
    label: (
      <View className='flex flex-row items-center gap-sm h-8'>
        <ICONS.am className='h-full border border-primary' />
        <AppText>{LANGUAGE_NAMES.am}</AppText>
      </View>
    ),
    value: 'am',
  },
]
export default LANGUAGE_DROPDOWN_OPTIONS
