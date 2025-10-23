import React, { FC, memo, PropsWithChildren, useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

const AppIconButtonSmall: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `h-6 w-6 md:h-7 md:w-7 lg:h-10 lg:w-10 xl:w-12 xl:h-12 ${
      className ? ` ${className}` : ''
    }`
  }, [className])

  return (
    <TouchableOpacity className={combinedClassName} {...restProps}>
      {children}
    </TouchableOpacity>
  )
}

export default memo(AppIconButtonSmall)
