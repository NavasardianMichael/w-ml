import React, { FC, memo, useMemo } from 'react'
import { Text, TextProps } from 'react-native'

type Props = TextProps

const AppText: FC<Props> = ({ children, className, ...restProps }) => {
  const combinedClassName = useMemo(() => {
    return `font-inter-medium text-secondary ${className}`
  }, [className])

  return (
    <Text className={combinedClassName} {...restProps}>
      {children}
    </Text>
  )
}

export default memo(AppText)
