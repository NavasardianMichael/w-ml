import React, { FC, memo, PropsWithChildren, useMemo } from 'react'
import { TextInput, TextInputProps } from 'react-native'

type Props = TextInputProps

const AppTextInput: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `border border-secondary text-secondary p-sm lg:p-md rounded-md min-w-[300px] ${
      className ? ` ${className}` : ''
    }`
  }, [className])

  return (
    <TextInput
      placeholderTextColor='#fff'
      className={combinedClassName}
      {...restProps}
    >
      {children}
    </TextInput>
  )
}

export default memo(AppTextInput)
