import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { SoundState, SoundStateActions } from './types';
import { reactNativeSoundService } from '@/services/reactNativeSound/soundService';
// import { mockTrackPlayerService } from '@/services/mockTrackPlayer/mockTrackPlayerService';

// Use React Native Sound service
const audioService = reactNativeSoundService;

const initialState: SoundState = {
  activeSoundIdsStack: [],
  isMuted: true,
  isPlaying: false,
  currentTrackId: null,
};

export const useSoundStore = create<SoundState & SoundStateActions>()(
  immer(
    combine(initialState, (set, get): SoundStateActions => {
      return {
        setSoundState: payload => {
          set(prevState => ({
            ...prevState,
            ...payload,
          }));
        },

        // ============ INITIALIZATION ============

        initializeTrackPlayer: async () => {
          try {
            console.log('Attempting to initialize TrackPlayer...');
            // Add a longer delay to ensure app is fully loaded
            await new Promise<void>(resolve => setTimeout(resolve, 1000));
            await audioService.setupPlayer();
            console.log('TrackPlayer setup completed');
            // Don't add tracks immediately - do it when needed
          } catch (error) {
            console.error('Failed to initialize TrackPlayer:', error);
            // Don't throw - allow app to continue without audio
          }
        },

        // ============ PLAYBACK METHODS ============

        playSoundById: async (id: string, options?: { loop?: boolean }) => {
          const { isMuted } = get();
          try {
            console.log(`Attempting to play sound: ${id}`);
            if (!audioService.isPlayerInitialized()) {
              console.log(
                'TrackPlayer not initialized, attempting to initialize...',
              );
              await audioService.setupPlayer();
            }
            console.log({ isMuted });

            await audioService.setVolume(isMuted ? 0 : 1);
            audioService.playTrack(id, options);
            set(state => {
              if (!state.activeSoundIdsStack.includes(id)) {
                state.activeSoundIdsStack.push(id);
              }
              state.currentTrackId = id;
              state.isPlaying = true;
            });
          } catch (error) {
            console.error('Failed to play sound:', error);
            // Don't throw - allow app to continue without audio
          }
        },

        pauseTrack: async () => {
          try {
            await audioService.pause();
            set(state => {
              state.isPlaying = false;
            });
          } catch (error) {
            console.error('Failed to pause track:', error);
          }
        },

        stopTrack: async () => {
          try {
            await audioService.stop();
            set(state => {
              state.isPlaying = false;
              state.currentTrackId = null;
              state.activeSoundIdsStack = [];
            });
          } catch (error) {
            console.error('Failed to stop track:', error);
          }
        },

        stopAllTracks: async () => {
          try {
            console.log('Sound store: Stopping all tracks...');
            audioService.stopAll();
            // Also call the regular stop method to ensure everything is stopped
            await audioService.stop();
            set(state => {
              state.isPlaying = false;
              state.currentTrackId = null;
              state.activeSoundIdsStack = [];
            });
            console.log('Sound store: All tracks stopped');
          } catch (error) {
            console.error('Failed to stop all tracks:', error);
          }
        },

        // ============ VOLUME/MUTE METHODS ============

        toggleActiveSoundMuted: async () => {
          const currentState = get();
          const newMutedStatus = !currentState.isMuted;

          try {
            await audioService.setVolume(newMutedStatus ? 0 : 1);
            set(state => {
              state.isMuted = newMutedStatus;
            });
          } catch (error) {
            console.error('Failed to toggle mute:', error);
          }
        },

        setIsActiveSoundMuted: async (isMuted: boolean) => {
          console.log('Setting mute status to:', isMuted);

          try {
            await audioService.setVolume(isMuted ? 0 : 1);
            set(state => {
              state.isMuted = isMuted;
            });
          } catch (error) {
            console.error('Failed to set mute status:', error);
          }
        },
      };
    }),
  ),
);
