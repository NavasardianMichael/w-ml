import { FC, memo, ReactNode, useCallback, useMemo, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import AppText from './AppText'

type AppDropdownOption = {
  id: string
  label: string
}

export type AppDropdownProps = {
  selectedOptionId: AppDropdownOption['id']
  options: AppDropdownOption[]
  onSelect: (option: AppDropdownOption) => void
  renderOptionNode?: (
    option: AppDropdownOption,
    index?: number,
    arr?: AppDropdownOption[],
  ) => ReactNode
}

const AppDropdown: FC<AppDropdownProps> = ({
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
    (selectedOption: AppDropdownOption) => {
      setIsDropdownOpen(false)
      onSelect(selectedOption)
    },
    [setIsDropdownOpen, onSelect],
  )

  const selectedOption: AppDropdownOption = useMemo(
    () => options.find(option => option.id === selectedOptionId),
    [options, selectedOptionId],
  )!

  const selectedOptionNode = useMemo(() => {
    return renderOptionNode
      ? renderOptionNode(selectedOption, 0, options)
      : selectedOption.label
  }, [renderOptionNode, selectedOption, options])

  return (
    <View className={`relative!`}>
      <Pressable
        accessibilityIgnoresInvertColors
        onPress={toggleDropdown}
        className={`bg-primary border border-secondary rounded-lg p-sm lg:p-md flex-row justify-between items-center ${
          isDropdownOpen ? 'rounded-b-none' : ''
        }`}
      >
        <View className={`flex-row items-center`}>{selectedOptionNode}</View>
        <AppText
          className={`text-secondary text-xs transition ml-sm ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        >
          {'▼'}
        </AppText>
        {/* Dropdown List */}
      </Pressable>
      {isDropdownOpen ? (
        <View className='absolute z-10 left-0 right-0 top-full bg-primary border border-t-0  border-secondary rounded-b-lg overflow-hidden'>
          <ScrollView>
            {options.map((option, index, arr) => {
              const optionNode = renderOptionNode
                ? renderOptionNode(option, index, arr)
                : option.label
              return (
                <Pressable
                  key={option.id}
                  onPress={() => onOptionPress(option)}
                  className={`flex-row items-center   ${
                    option.id === selectedOptionId
                      ? 'bg-secondary'
                      : 'bg-blue-100'
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
  )
}

export default memo(AppDropdown)
