import React, { FC, memo } from 'react'
import { View } from 'react-native'
import AppText from './AppText'
import AppTouchableOpacity from './AppTouchableOpacity'

type Props = {
  value: number
  onValueChange: (value: number) => void
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
        {options.map((option, idx) => (
          <AppTouchableOpacity
            key={idx}
            onPress={() => onValueChange(idx + 1)}
            className={`grow ${idx !== 0 ? 'ml-sm lg:ml-md' : ''} ${
              value === idx + 1 ? 'bg-secondary border-primary' : ''
            }`}
          >
            <AppText
              className={`w-full text-ellipsis whitespace-nowrap overflow-hidden text-center text-secondary ${
                value === idx + 1 ? 'text-primary' : ''
              }`}
            >
              {option}
              {value === idx + 1 && <AppText className='text-primary'> ✓</AppText>}
            </AppText>
          </AppTouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default memo(AppBinaryRadioButtonsGroup)
