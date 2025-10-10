// Mock TrackPlayer service to avoid native module issues
export class MockTrackPlayerService {
  private isInitialized = false

  async setupPlayer(_customOptions?: any) {
    console.log('Mock TrackPlayer: setupPlayer called')
    this.isInitialized = true
  }

  async playTrack(trackId: string, options?: { loop?: boolean }) {
    console.log(`Mock TrackPlayer: Playing track ${trackId}`, options)
  }

  async pause() {
    console.log('Mock TrackPlayer: Pause')
  }

  async stop() {
    console.log('Mock TrackPlayer: Stop')
  }

  async setVolume(volume: number) {
    console.log(`Mock TrackPlayer: Set volume to ${volume}`)
  }

  isPlayerInitialized(): boolean {
    return this.isInitialized
  }

  async initializeWithTracks() {
    console.log('Mock TrackPlayer: Initialize with tracks')
  }
}

export const mockTrackPlayerService = new MockTrackPlayerService()
