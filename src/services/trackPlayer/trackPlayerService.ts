import TrackPlayer, {
  RepeatMode,
  State,
  Track,
  Event,
} from 'react-native-track-player';
import { SOUND_TRACKS } from '@/constants/sound';

export class TrackPlayerService {
  private isInitialized = false;
  private eventListeners: { [key: string]: Function[] } = {};

  /**
   * Initialize the TrackPlayer with comprehensive options
   */
  async setupPlayer(customOptions?: any) {
    if (this.isInitialized) {
      return;
    }

    try {
      // First initialize the player with minimal setup
      await TrackPlayer.setupPlayer({
        ...customOptions,
      });

      this.isInitialized = true;
      console.log('TrackPlayer initialized successfully');
    } catch (error) {
      console.error('Failed to initialize TrackPlayer:', error);
      this.isInitialized = false;
      throw error;
    }
  }

  /**
   * Update player options
   */
  async updateOptions(options: any) {
    if (!this.isInitialized) {
      await this.setupPlayer();
    }
    return TrackPlayer.updateOptions(options);
  }

  /**
   * Initialize with predefined tracks
   */
  async initializeWithTracks() {
    if (!this.isInitialized) {
      await this.setupPlayer();
    }

    try {
      const tracks = Object.values(SOUND_TRACKS);
      await TrackPlayer.add(tracks);
      console.log(`Added ${tracks.length} tracks to TrackPlayer`);
    } catch (error) {
      console.error('Failed to add tracks:', error);
    }
  }

  /**
   * Play a specific track by ID
   */
  async playTrack(trackId: string, options?: { loop?: boolean }) {
    if (!this.isInitialized) {
      await this.setupPlayer();
    }

    try {
      const track = SOUND_TRACKS[trackId as any];
      if (!track) {
        throw new Error(`Track not found: ${trackId}`);
      }

      // Clear queue and add the specific track
      await TrackPlayer.reset();
      await TrackPlayer.add(track);

      // Set repeat mode if looping is requested
      if (options?.loop) {
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
      } else {
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
      }

      await TrackPlayer.play();
      console.log(`Playing track: ${trackId}`);
    } catch (error) {
      console.error(`Failed to play track ${trackId}:`, error);
      throw error;
    }
  }

  /**
   * Pause current playback
   */
  async pause() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Failed to pause:', error);
    }
  }

  /**
   * Stop current playback
   */
  async stop() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.reset();
    } catch (error) {
      console.error('Failed to stop:', error);
    }
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  async setVolume(volume: number) {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.setVolume(Math.max(0, Math.min(1, volume)));
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }

  /**
   * Get current playback state
   */
  async getPlaybackState() {
    if (!this.isInitialized) {
      return { state: State.None };
    }
    try {
      return await TrackPlayer.getState();
    } catch (error) {
      console.error('Failed to get playback state:', error);
      return State.None;
    }
  }

  /**
   * Get current track
   */
  async getCurrentTrack() {
    if (!this.isInitialized) return null;
    try {
      return await TrackPlayer.getCurrentTrack();
    } catch (error) {
      console.error('Failed to get current track:', error);
      return null;
    }
  }

  /**
   * Get playback progress
   */
  async getProgress() {
    if (!this.isInitialized) {
      return { position: 0, duration: 0, buffered: 0 };
    }
    try {
      return await TrackPlayer.getProgress();
    } catch (error) {
      console.error('Failed to get progress:', error);
      return { position: 0, duration: 0, buffered: 0 };
    }
  }

  /**
   * Seek to position
   */
  async seekTo(position: number) {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.seekTo(position);
    } catch (error) {
      console.error('Failed to seek:', error);
    }
  }

  /**
   * Skip to next track
   */
  async skipToNext() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Failed to skip to next:', error);
    }
  }

  /**
   * Skip to previous track
   */
  async skipToPrevious() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error('Failed to skip to previous:', error);
    }
  }

  /**
   * Set repeat mode
   */
  async setRepeatMode(mode: RepeatMode) {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.setRepeatMode(mode);
    } catch (error) {
      console.error('Failed to set repeat mode:', error);
    }
  }

  /**
   * Add tracks to queue
   */
  async add(tracks: Track | Track[]) {
    if (!this.isInitialized) {
      await this.setupPlayer();
    }
    try {
      return await TrackPlayer.add(tracks);
    } catch (error) {
      console.error('Failed to add tracks:', error);
    }
  }

  /**
   * Remove tracks from queue
   */
  async remove(indexes: number | number[]) {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.remove(indexes);
    } catch (error) {
      console.error('Failed to remove tracks:', error);
    }
  }

  /**
   * Get queue
   */
  async getQueue() {
    if (!this.isInitialized) return [];
    try {
      return await TrackPlayer.getQueue();
    } catch (error) {
      console.error('Failed to get queue:', error);
      return [];
    }
  }

  /**
   * Clear queue
   */
  async reset() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.reset();
    } catch (error) {
      console.error('Failed to reset queue:', error);
    }
  }

  /**
   * Destroy the player
   */
  async destroy() {
    if (!this.isInitialized) return;
    try {
      await TrackPlayer.reset();
      this.isInitialized = false;
      console.log('TrackPlayer destroyed');
    } catch (error) {
      console.error('Failed to destroy TrackPlayer:', error);
    }
  }

  /**
   * Add event listener
   */
  addEventListener(event: Event, listener: any) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
    return TrackPlayer.addEventListener(event, listener);
  }

  /**
   * Remove event listener
   */
  removeEventListener(event: Event, listener: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(
        l => l !== listener,
      );
    }
    // Note: TrackPlayer doesn't have a direct removeEventListener,
    // so we rely on the subscription returned by addEventListener
  }

  /**
   * Check if player is initialized
   */
  isPlayerInitialized(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const trackPlayerService = new TrackPlayerService();
