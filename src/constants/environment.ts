export const ENV_VARS = (() => {
    if(__DEV__) {
        return {
            apiURL: 'http://10.0.2.2:5111'
        }
    }
    return {
        apiURL: 'https://api.w-ml.mnavasardian.com'
    }
})()