declare module '@env' {
  // Note: ADMOB_APP_ID is also needed in .env file (used by android/app/build.gradle)
  // but it's not imported in JS/TS code, so not declared here
  export const ADMOB_REWARDED_AD_UNIT_ID: string
}
