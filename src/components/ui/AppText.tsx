import React, { FC, memo, useMemo } from 'react'
import { Text, TextProps } from 'react-native'

type Props = TextProps & {
  disableDefaultFontSize?: boolean
}

// xs: '360px', // Small phones
// sm: '480px', // Regular phones
// md: '768px', // Tablets
// lg: '1024px', // Large tablets
// xl: '1280px', // Extra large tablets / laptops

const AppText: FC<Props> = ({
  children,
  className,
  disableDefaultFontSize = false,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `font-inter-medium text-secondary ${
      disableDefaultFontSize
        ? ''
        : ' text-base md:text-md lg:text-xl xl:text-2xl'
    }${className ? ` ${className}` : ''}`
  }, [className, disableDefaultFontSize])

  return (
    <Text className={combinedClassName} {...restProps}>
      {children}
    </Text>
  )
}

export default memo(AppText)
