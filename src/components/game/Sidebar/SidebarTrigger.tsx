import { ICONS } from '@/constants/icons';
import { useGameStore } from '@/store/game/store';
import { Image, TouchableOpacity, View } from 'react-native';

export default function SidebarTrigger() {
  const { toggleIsSidebarOpen } = useGameStore();

  return (
    <View className={`ml-auto`}>
      <TouchableOpacity className="w-6 h-6" onPress={toggleIsSidebarOpen}>
        <Image
          source={require('../../../assets/icons/sidebar.svg')}
          className={`w-full h-full mx-auto`}
        />
      </TouchableOpacity>
    </View>
  );
}
