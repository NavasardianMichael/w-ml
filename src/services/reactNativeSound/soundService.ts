import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

// Map trackId to filename for react-native-sound
const SOUND_FILE_MAP: { [key: string]: string } = {
  // Use the actual filenames from assets/audio
  'audience-help.mp3': 'audience_help.mp3',
  'correct-answer.mp3': 'correct_answer.mp3',
  'easy.mp3': 'easy.mp3',
  'fifty-fifty.mp3': 'fifty_fifty.mp3',
  'final-answer.mp3': 'final_answer.mp3',
  'hard.mp3': 'hard.mp3',
  'main-theme.mp3': 'main_theme.mp3',
  'medium.mp3': 'medium.mp3',
  'next.mp3': 'next.mp3',
  'phone-a-friend.mp3': 'phone_a_friend.mp3',
  'resign.mp3': 'resign.mp3',
  'wrong-answer.mp3': 'wrong_answer.mp3',
  'you-won-a-million.mp3': 'you_won_a_million.mp3',
};

export class ReactNativeSoundService {
  private sounds: { [key: string]: Sound } = {};
  private isInitialized = false;
  private currentSound: Sound | null = null;

  async setupPlayer() {
    if (this.isInitialized) return;

    try {
      console.log('React Native Sound: Player setup completed');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to setup React Native Sound:', error);
      throw error;
    }
  }

  async playTrack(trackId: string, options?: { loop?: boolean }) {
    try {
      console.log(`React Native Sound: Playing track ${trackId}`, options);

      // Stop and release current sound if playing
      if (this.currentSound) {
        this.currentSound.stop();
        this.currentSound.release();
        this.currentSound = null;
      }

      // Get the filename for react-native-sound
      const filename = SOUND_FILE_MAP[trackId] || trackId.replace(/-/g, '_');
      console.log(`React Native Sound: Loading file ${filename}`);

      // Check if sound is already loaded and reuse it
      if (this.sounds[filename]) {
        // Release the existing sound first to avoid conflicts
        this.sounds[filename].release();
        delete this.sounds[filename];
      }

      // Always create a new sound instance to avoid conflicts
      const sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error(`Failed to load sound ${filename}:`, error);
          // Try loading from raw assets as fallback
          this.loadFromRawAssets(trackId, filename, options?.loop || false);
          return;
        }

        console.log(`Sound ${filename} loaded successfully`);
        this.sounds[filename] = sound;
        this.currentSound = sound;
        this.playSound(sound, options?.loop || false);
      });
    } catch (error) {
      console.error(`Failed to play track ${trackId}:`, error);
    }
  }

  private loadFromRawAssets(trackId: string, filename: string, loop: boolean) {
    // Stop current sound first
    if (this.currentSound) {
      this.currentSound.stop();
      this.currentSound.release();
      this.currentSound = null;
    }

    // Try loading from android raw assets folder
    const sound = new Sound(filename.replace('.mp3', ''), '', error => {
      if (error) {
        console.error(
          `Failed to load sound from raw assets ${filename}:`,
          error,
        );
        return;
      }

      console.log(`Sound ${filename} loaded from raw assets successfully`);
      this.sounds[filename] = sound;
      this.currentSound = sound;
      this.playSound(sound, loop);
    });
  }

  private playSound(sound: Sound, loop: boolean) {
    sound.setNumberOfLoops(loop ? -1 : 0);
    sound.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.error('Playback failed');
      }
    });
  }

  async pause() {
    try {
      if (this.currentSound) {
        this.currentSound.pause();
        console.log('React Native Sound: Paused');
      }
    } catch (error) {
      console.error('Failed to pause:', error);
    }
  }

  async stop() {
    try {
      // Stop current sound
      if (this.currentSound) {
        this.currentSound.stop();
        this.currentSound = null;
      }

      // Stop all other sounds that might be playing
      Object.values(this.sounds).forEach(sound => {
        try {
          sound.stop();
        } catch (error) {
          console.error('Error stopping individual sound:', error);
        }
      });

      console.log('React Native Sound: All sounds stopped');
    } catch (error) {
      console.error('Failed to stop:', error);
    }
  }

  async setVolume(volume: number) {
    try {
      if (this.currentSound) {
        this.currentSound.setVolume(Math.max(0, Math.min(1, volume)));
        console.log(`React Native Sound: Set volume to ${volume}`);
      }
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }

  isPlayerInitialized(): boolean {
    return this.isInitialized;
  }

  async initializeWithTracks() {
    console.log('React Native Sound: Initialize with tracks');
  }

  // Release all sounds
  release() {
    // Stop all sounds first
    Object.values(this.sounds).forEach(sound => {
      sound.stop();
      sound.release();
    });
    this.sounds = {};
    this.currentSound = null;
    console.log('React Native Sound: All sounds released');
  }

  // Stop all sounds without releasing
  stopAll() {
    try {
      console.log('React Native Sound: Stopping all sounds...');

      // Stop current sound
      if (this.currentSound) {
        this.currentSound.stop();
        this.currentSound = null;
        console.log('React Native Sound: Current sound stopped');
      }

      // Stop all cached sounds
      Object.keys(this.sounds).forEach(key => {
        try {
          const sound = this.sounds[key];
          if (sound) {
            sound.stop();
            console.log(`React Native Sound: Stopped sound ${key}`);
          }
        } catch (error) {
          console.error(`Error stopping sound ${key}:`, error);
        }
      });

      console.log('React Native Sound: All sounds stopped');
    } catch (error) {
      console.error('Failed to stop all sounds:', error);
    }
  }
}

export const reactNativeSoundService = new ReactNativeSoundService();
