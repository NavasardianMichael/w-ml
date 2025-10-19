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
// tv: '1920px', // TVs and external displays

const AppText: FC<Props> = ({
  children,
  className,
  disableDefaultFontSize = false,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `font-inter-medium text-secondary ${className}${
      disableDefaultFontSize
        ? ''
        : ' text-xs md:text-base text-md-md lg:text-lg xl:text-xl tv:text-2xl'
    }`
  }, [className, disableDefaultFontSize])

  return (
    <Text className={combinedClassName} {...restProps}>
      {children}
    </Text>
  )
}

export default memo(AppText)
