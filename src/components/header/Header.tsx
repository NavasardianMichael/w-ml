import VolumeOffIcon from '@/assets/icons/volume-off.svg'
import VolumeOnIcon from '@/assets/icons/volume-on.svg'
import { ICONS } from '@/constants/icons'
import { SOUNDS_URIS } from '@/constants/sound'
import { useSound } from '@/hooks/useSound'
import { useSoundStore } from '@/store/sound/store'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import SidebarTrigger from '../game/Sidebar/SidebarTrigger'
import ExitModal from './ExitModal'
import LanguagesDropdown from './LanguagesDropdown'
import LogoBlock from './logoBlock/LogoBlock'
import { useGameStore } from '@/store/game/store'
import { SCREENS } from '@/constants/game'

export default function Header() {
  const { screen } = useGameStore()
  const {
    playSoundById,
    toggleActiveSoundMuted,
    setIsActiveSoundMuted,
    isMuted,
    activeSoundIdsStack,
  } = useSoundStore()
  const [isExitModalVisible, setIsExitModalVisible] = useState(false)

  useSound(SOUNDS_URIS.mainTheme, { loop: true })
  useSound(SOUNDS_URIS.easy, { loop: true })

  const soundHandler = async () => {
    if (!activeSoundIdsStack.length && isMuted) {
      const soundId =
        screen === SCREENS.home ? SOUNDS_URIS.mainTheme : SOUNDS_URIS.easy
      playSoundById(soundId, { loop: true })
      setIsActiveSoundMuted(false)
      return
    }
    toggleActiveSoundMuted()
  }

  return (
    <>
      <View className='pt-8 flex flex-row items-center justify'>
        <TouchableOpacity onPress={soundHandler} className='h-6 w-6'>
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </TouchableOpacity>
        {screen === SCREENS.game ? (
          <TouchableOpacity
            key='header-exit-button'
            onPress={() => setIsExitModalVisible(true)}
            className='h-6 rotate-180'
          >
            <ICONS.exit />
          </TouchableOpacity>
        ) : null}
        {screen === SCREENS.home ? (
          <View className='ml-auto'>
            <LanguagesDropdown />
          </View>
        ) : null}
        {screen === SCREENS.game ? <SidebarTrigger /> : null}
      </View>

      <ExitModal
        isVisible={isExitModalVisible}
        onClose={() => setIsExitModalVisible(false)}
      />

      <LogoBlock />
    </>
  )
}
