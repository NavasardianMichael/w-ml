import { FC, memo, useCallback, useMemo, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { AppDropdownType } from '@/types/ui'
import AppText from './AppText'

const AppDropdown: FC<AppDropdownType['props']> = ({
  label,
  options,
  onSelect,
  selectedOptionId,
  renderOptionNode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const onOptionPress = useCallback(
    (selectedOption: AppDropdownType['option']) => {
      setIsDropdownOpen(false)
      onSelect(selectedOption)
    },
    [setIsDropdownOpen, onSelect],
  )
  console.log({ options })

  const selectedOption: AppDropdownType['option'] = useMemo(
    () => options.find(option => option.id === selectedOptionId),
    [options, selectedOptionId],
  )!
  console.log({ selectedOption })

  const selectedOptionNode = useMemo(() => {
    return renderOptionNode ? (
      renderOptionNode(selectedOption, 0, options)
    ) : (
      <AppText>{selectedOption?.label || ''}</AppText>
    )
  }, [renderOptionNode, selectedOption, options])

  return (
    <View>
      <AppText className='font-bold mb-sm lg:mb-md'>{label}</AppText>
      <View className='relative max-w-sm'>
        <Pressable
          accessibilityIgnoresInvertColors
          onPress={toggleDropdown}
          className={`bg-primary border border-secondary rounded-lg p-sm lg:p-md flex-row justify-between items-center ${
            isDropdownOpen ? 'rounded-b-none' : ''
          }`}
        >
          <View>{selectedOptionNode}</View>
          <AppText
            className={`text-secondary transition ml-sm ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          >
            {'▼'}
          </AppText>
          {/* Dropdown List */}
        </Pressable>
        {isDropdownOpen ? (
          <View className='absolute z-10 left-0 right-0 top-full bg-secondary border border-t-0  border-secondary rounded-b-lg overflow-hidden'>
            <ScrollView>
              {options.map((option, index, arr) => {
                const isSelected = option.id === selectedOptionId
                const optionNode = renderOptionNode ? (
                  renderOptionNode(option, index, arr)
                ) : (
                  <AppText className='text-primary'>
                    {option?.label ?? ''}
                  </AppText>
                )
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => onOptionPress(option)}
                    className={`p-sm lg:p-md flex-row items-center border-b border-primary ${
                      isSelected ? 'bg-blue-100' : ''
                    } `}
                  >
                    {optionNode}
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default memo(AppDropdown)
