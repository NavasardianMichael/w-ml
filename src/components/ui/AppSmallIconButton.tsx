import React, { FC, memo, PropsWithChildren, useMemo } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

const AppSmallIconButton: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...restProps
}) => {
  const combinedClassName = useMemo(() => {
    return `h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:w-10 xl:h-10 ${
      className ? ` ${className}` : ''
    }`
  }, [className])

  return (
    <TouchableOpacity className={combinedClassName} {...restProps}>
      {children}
    </TouchableOpacity>
  )
}

export default memo(AppSmallIconButton)
