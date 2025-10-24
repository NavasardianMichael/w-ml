import React, { FC, memo } from 'react'
import { View } from 'react-native'
import AppText from './AppText'
import AppTouchableOpacity from './AppTouchableOpacity'

type Props = {
  value: boolean
  onValueChange: (value: boolean) => void
  label: string
  options: string[]
}

const AppBinaryRadioButtonsGroup: FC<Props> = ({
  value,
  onValueChange,
  label,
  options,
}) => {
  return (
    <View className='flex flex-col'>
      <AppText className='font-bold mb-sm lg:mb-md'>{label}</AppText>
      <View className='flex flex-row'>
        <AppTouchableOpacity
          onPress={() => onValueChange(true)}
          className={`${value ? 'bg-secondary border-primary' : ''}`}
        >
          <AppText className={`text-center ${value ? 'text-primary' : ''}`}>
            {options[0]}
            <AppText className='text-primary'> ✓</AppText>
          </AppText>
        </AppTouchableOpacity>
        <AppTouchableOpacity
          onPress={() => onValueChange(false)}
          className={`ml-sm lg:ml-md ${
            !value ? 'bg-secondary text-primary border-secondary' : ' '
          }`}
        >
          <AppText
            className={`text-center ${
              !value ? 'text-primary' : 'text-secondary'
            }`}
          >
            {options[1]}
            <AppText className='text-primary'> ✓</AppText>
          </AppText>
        </AppTouchableOpacity>
      </View>
    </View>
  )
}

export default memo(AppBinaryRadioButtonsGroup)
