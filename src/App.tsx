import { StatusBar, View } from 'react-native'
import { useMemo } from 'react'
import {
  Edge,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context'
import SidebarContent from './components/game/Sidebar/SidebarContent'
import SidebarOverlay from './components/game/Sidebar/SidebarOverlay'
import Header from './components/header/Header'
import { SCREENS } from './constants/game'
import Game from './screens/game'
import Home from './screens/home'
import Results from './screens/results'
import YourQuestionScreen from './screens/yourQuestion'
import { useGameStore } from './store/game/store'
import { Screen } from './types/game'
import LogoBlock from './components/header/logoBlock/LogoBlock'

const COMPONENT_BY_SCREEN: Record<Screen, React.FC> = {
  [SCREENS.game]: Game,
  [SCREENS.results]: Results,
  [SCREENS.home]: Home,
  [SCREENS.yourQuestion]: YourQuestionScreen,
}

function App() {
  const { screen } = useGameStore()

  const CurrentScreen = useMemo(() => {
    return COMPONENT_BY_SCREEN[screen]
  }, [screen])

  const safeAreaEdges: Edge[] = useMemo(() => ['top', 'left', 'right'], [])

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView className='flex-1 bg-primary' edges={safeAreaEdges}> */}
      <View className='flex-1 bg-primary p-md md:p-lg'>
        <StatusBar hidden />
        <Header />
        <View className='flex flex-1 items-center justify-center'>
          <LogoBlock />
        </View>
        <View className='mt-auto'>
          <CurrentScreen />
        </View>
        <SidebarOverlay />
        {screen === SCREENS.game && <SidebarContent />}
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  )
}

export default App
