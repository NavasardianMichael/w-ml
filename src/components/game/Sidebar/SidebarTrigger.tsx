import { View } from 'react-native'
import { useGameStore } from '@/store/game/store'
import { ICONS } from '@/constants/icons'
import AppSmallIconButton from '@/components/ui/AppSmallIconButton'

export default function SidebarTrigger() {
  const { toggleIsSidebarOpen } = useGameStore()

  return (
    <View className={`ml-auto`}>
      <AppSmallIconButton onPress={toggleIsSidebarOpen}>
        <ICONS.sidebar />
      </AppSmallIconButton>
    </View>
  )
}
