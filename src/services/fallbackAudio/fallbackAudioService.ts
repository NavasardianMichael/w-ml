// Simple fallback audio service that doesn't break the app
export class FallbackAudioService {
  private isInitialized = false

  async setupPlayer() {
    this.isInitialized = true
    console.log('Fallback audio service initialized')
  }

  async playTrack(trackId: string, options?: { loop?: boolean }) {
    console.log(`Would play track: ${trackId}`, options)
  }

  async pause() {
    console.log('Would pause audio')
  }

  async stop() {
    console.log('Would stop audio')
  }

  async setVolume(volume: number) {
    console.log(`Would set volume to: ${volume}`)
  }

  isPlayerInitialized(): boolean {
    return this.isInitialized
  }
}

export const fallbackAudioService = new FallbackAudioService()
