export const ENV_VARS = (() => {
  if (__DEV__) {
    return {
      apiURL: 'http://10.0.2.2:5111/v1',
    }
  }
  return {
    apiURL: 'https://w-ml.mnavasardian.com/api/v1',
  }
})()
