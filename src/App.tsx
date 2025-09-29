import { SCREENS } from './constants/game';
import Game from './screens/game';
import Home from './screens/home';
import Results from './screens/results';
import { useGameStore } from './store/game/store';
import { Screen } from './types/game';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function App() {
  // const safeAreaInsets = useSafeAreaInsets();
  const { screen } = useGameStore();

  const COMPONENT_BY_SCREEN: Record<Screen, React.FC> = {
    [SCREENS.game]: Game,
    [SCREENS.results]: Results,
    [SCREENS.home]: Home,
  };

  const ScreenComponent = COMPONENT_BY_SCREEN[screen];

  return (
    <View style={[styles.container]}>
      <ScreenComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
