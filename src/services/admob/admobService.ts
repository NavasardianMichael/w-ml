import mobileAds, {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads'
import { ADMOB_REWARDED_AD_UNIT_ID } from '@env'

// ============================================
// AdMob Configuration from Environment Variables
// Set ADMOB_REWARDED_AD_UNIT_ID in your .env file
// See env.example for template
// ============================================
// Use test ID for development, actual ID from .env for production
const REWARDED_AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : ADMOB_REWARDED_AD_UNIT_ID || 'ca-app-pub-3940256099942544/5224354917' // Fallback to test ID if env var not set

let rewardedAd: RewardedAd | null = null
let isAdLoaded = false

export const initializeAdMob = async () => {
  try {
    await mobileAds().initialize()
    console.log('AdMob initialized successfully')
  } catch (error) {
    console.error('Error initializing AdMob:', error)
  }
}

export const loadRewardedAd = (): Promise<RewardedAd> => {
  return new Promise((resolve, reject) => {
    try {
      // Reset state
      isAdLoaded = false
      rewardedAd = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
        requestNonPersonalizedAdsOnly: true,
      })

      const unsubscribeLoaded = rewardedAd.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          unsubscribeLoaded()
          unsubscribeEarned()
          unsubscribeError()
          isAdLoaded = true
          console.log('Rewarded ad loaded')
          resolve(rewardedAd!)
        },
      )

      const unsubscribeEarned = rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward:', reward)
        },
      )

      const unsubscribeError = rewardedAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          unsubscribeLoaded()
          unsubscribeEarned()
          unsubscribeError()
          isAdLoaded = false
          console.error('Rewarded ad error:', error)
          reject(error)
        },
      )

      rewardedAd.load()
    } catch (error) {
      console.error('Error creating rewarded ad:', error)
      isAdLoaded = false
      reject(error)
    }
  })
}

export const showRewardedAd = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!rewardedAd) {
      reject(new Error('Rewarded ad not loaded'))
      return
    }

    try {
      const unsubscribeOpened = rewardedAd.addAdEventListener(
        AdEventType.OPENED,
        () => {
          console.log('Rewarded ad opened')
        },
      )

      const unsubscribeEarned = rewardedAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          unsubscribeOpened()
          unsubscribeEarned()
          unsubscribeClosed()
          unsubscribeError()
          console.log('User earned reward')
          // Reset ad state after reward is earned
          isAdLoaded = false
          rewardedAd = null
          resolve()
        },
      )

      const unsubscribeClosed = rewardedAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribeOpened()
          unsubscribeEarned()
          unsubscribeClosed()
          unsubscribeError()
          // Reset ad state when closed
          isAdLoaded = false
          rewardedAd = null
          // If closed without earning reward, reject
          reject(new Error('Ad closed without earning reward'))
        },
      )

      const unsubscribeError = rewardedAd.addAdEventListener(
        AdEventType.ERROR,
        error => {
          unsubscribeOpened()
          unsubscribeEarned()
          unsubscribeClosed()
          unsubscribeError()
          console.error('Rewarded ad error:', error)
          reject(error)
        },
      )

      rewardedAd.show()
    } catch (error) {
      console.error('Error showing rewarded ad:', error)
      reject(error)
    }
  })
}

export const isRewardedAdLoaded = (): boolean => {
  return rewardedAd !== null && isAdLoaded
}
