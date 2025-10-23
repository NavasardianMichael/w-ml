import React, { FC, memo, useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

// xs: '360px', // Small phones
// sm: '480px', // Regular phones
// md: '768px', // Tablets
// lg: '1024px', // Large tablets
// xl: '1280px', // Extra large tablets / laptops

const AppTouchableOpacity: FC<Props> = ({
  children,
  className,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `min-w-[160px] box-border py-sm px-md text-center rounded-md text-secondary border border-secondary${
      className ? ` ${className}` : ''
    }`
  }, [className])

  return (
    <TouchableOpacity className={combinedClassName} {...restProps}>
      {children}
    </TouchableOpacity>
  )
}

export default memo(AppTouchableOpacity)
