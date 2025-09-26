import { useSoundStore } from '@/store/sound/store';
import { SoundAPI } from '@/store/sound/types';
import { useEffect, useMemo, useRef } from 'react';
import Sound from 'react-native-sound';

type UseSound = (
  uri: string,
  options?: { loop?: boolean; playOnInit?: boolean },
) => SoundAPI;

export const useSound: UseSound = (uri, options) => {
  const soundStore = useSoundStore();
  const { loop = false, playOnInit = false } = options || {};
  const soundRef = useRef<Sound | null>(null);
  const isLoadedRef = useRef(false);

  // Initialize sound object
  useEffect(() => {
    // Enable playback in silence mode (iOS)
    Sound.setCategory('Playback');

    // Create sound instance
    soundRef.current = new Sound(uri, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      // Success - sound is loaded
      isLoadedRef.current = true;

      // Set loop if specified
      if (loop && soundRef.current) {
        soundRef.current.setNumberOfLoops(-1); // -1 means infinite loop
      }

      // Play on init if specified
      if (playOnInit && soundRef.current) {
        soundRef.current.setVolume(soundStore.isMuted ? 0 : 1);
        soundRef.current.play();
        soundStore.setSoundState({
          activeSoundIdsStack: [...soundStore.activeSoundIdsStack, uri],
        });
      }
    });

    return () => {
      // Cleanup on unmount
      if (soundRef.current) {
        soundRef.current.release();
        soundRef.current = null;
        isLoadedRef.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri, loop, playOnInit]);

  const api: SoundAPI = useMemo(() => {
    const id = uri;
    const existingSound = soundStore.soundAPIById[id];
    if (existingSound) return existingSound;

    const result: SoundAPI = {
      id,
      play: async () => {
        return new Promise<void>((resolve, reject) => {
          if (!soundRef.current || !isLoadedRef.current) {
            reject(new Error('Sound not loaded'));
            return;
          }

          // Set volume based on muted state
          soundRef.current.setVolume(soundStore.isMuted ? 0 : 1);

          // Stop current playback and reset to beginning
          soundRef.current.stop(() => {
            if (soundRef.current) {
              soundRef.current.play(success => {
                if (success) {
                  soundStore.setSoundState({
                    activeSoundIdsStack: [
                      ...soundStore.activeSoundIdsStack,
                      id,
                    ],
                  });
                  resolve();
                } else {
                  reject(new Error('Playback failed'));
                }
              });
            }
          });
        });
      },

      pause: async () => {
        return new Promise<void>(resolve => {
          if (soundRef.current && isLoadedRef.current) {
            soundRef.current.pause(() => {
              // Remove from active sounds stack
              const newStack = soundStore.activeSoundIdsStack.filter(
                soundId => soundId !== id,
              );
              soundStore.setSoundState({
                activeSoundIdsStack: newStack,
              });
              resolve();
            });
          } else {
            resolve();
          }
        });
      },

      stop: async () => {
        return new Promise<void>(resolve => {
          if (soundRef.current && isLoadedRef.current) {
            soundRef.current.stop(() => {
              // Remove from active sounds stack
              const newStack = soundStore.activeSoundIdsStack.filter(
                soundId => soundId !== id,
              );
              soundStore.setSoundState({
                activeSoundIdsStack: newStack,
              });
              resolve();
            });
          } else {
            resolve();
          }
        });
      },

      setMutedStatus: async (isMuted: boolean) => {
        return new Promise<void>(resolve => {
          if (soundRef.current && isLoadedRef.current) {
            soundRef.current.setVolume(isMuted ? 0 : 1);
          }
          soundStore.setSoundState({ isMuted });
          resolve();
        });
      },
    };

    return result;
  }, [uri, soundStore]);

  useEffect(() => {
    // Register the sound API in the store
    if (!soundStore.soundAPIById[uri]) {
      soundStore.setSoundState({
        soundAPIById: { ...soundStore.soundAPIById, [uri]: api },
      });
    }
  }, [api, uri, soundStore]);

  return api;
};
