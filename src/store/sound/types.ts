export type SoundState = {
  activeSoundIdsStack: string[]
  isMuted: boolean
  isPlaying: boolean
  currentTrackId: string | null
}

export type SoundStateActions = {
  setSoundState: (state: Partial<SoundState>) => void
  initializeTrackPlayer: () => Promise<void>
  playSoundById: (id: string, options?: { loop?: boolean }) => Promise<void>
  pauseTrack: () => Promise<void>
  stopTrack: () => Promise<void>
  stopAllTracks: () => Promise<void>
  setIsActiveSoundMuted: (isMuted: SoundState['isMuted']) => void
  toggleActiveSoundMuted: () => void
}
