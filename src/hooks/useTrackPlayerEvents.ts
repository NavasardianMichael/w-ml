import { useEffect } from 'react'
// import TrackPlayer, {
//   Event,
//   State,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';
import { useSoundStore } from '@/store/sound/store'

export const useTrackPlayerSetup = () => {
  const soundStore = useSoundStore()

  // Commented out TrackPlayer events to avoid native module issues
  // useTrackPlayerEvents(
  //   [Event.PlaybackState, Event.PlaybackTrackChanged],
  //   async event => {
  //     if (event.type === Event.PlaybackState) {
  //       const isPlaying = event.state === State.Playing;
  //       soundStore.setSoundState({ isPlaying });
  //     }

  //     if (event.type === Event.PlaybackTrackChanged) {
  //       const currentTrack = await TrackPlayer.getActiveTrack();
  //       soundStore.setSoundState({
  //         currentTrackId: currentTrack?.id || null,
  //       });
  //     }
  //   },
  // );

  useEffect(() => {
    // Initialize TrackPlayer when the hook is first used
    soundStore.initializeTrackPlayer()
  }, [soundStore])
}
