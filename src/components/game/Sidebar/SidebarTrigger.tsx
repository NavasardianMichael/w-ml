import { View } from 'react-native'
import { useGameStore } from '@/store/game/store'
import { ICONS } from '@/constants/icons'
import AppIconButtonSmall from '@/components/ui/AppIconButtonSmall'

export default function SidebarTrigger() {
  const { toggleIsSidebarOpen } = useGameStore()

  return (
    <View className={`ml-auto`}>
      <AppIconButtonSmall onPress={toggleIsSidebarOpen}>
        <ICONS.sidebar />
      </AppIconButtonSmall>
    </View>
  )
}
