import { useEffect } from 'react'
import { useSoundStore } from '@/store/sound/store'

type UseSound = (
  trackId: string,
  options?: { loop?: boolean; playOnInit?: boolean },
) => void

export const useSound: UseSound = (trackId, options) => {
  const soundStore = useSoundStore()
  const { loop = false, playOnInit = false } = options || {}

  // Initialize TrackPlayer when first hook is used
  useEffect(() => {
    soundStore.initializeTrackPlayer()
  }, [soundStore])

  // Handle auto-play on initialization
  useEffect(() => {
    if (playOnInit) {
      soundStore.playSoundById(trackId, { loop })
    }
  }, [trackId, loop, playOnInit, soundStore])

  // No return value needed since we're using the global store
  // Components can access playback controls via useSoundStore
}
