import React, { FC, memo, useMemo } from 'react'
import { View, ViewProps } from 'react-native'

type Props = Omit<ViewProps, 'children'>

const AppHorizontalRule: FC<Props> = ({ className, ...restProps }) => {
  const combinedClassName = useMemo(() => {
    return `h-[1px] w-full bg-secondary my-md xl:mt-2xl ${
      className ? ` ${className}` : ''
    }`
  }, [className])

  return <View className={combinedClassName} {...restProps} />
}

export default memo(AppHorizontalRule)
