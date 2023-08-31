/*debounce helper function to prevent unnecessary api calls*/
const debounce = (func, delay = 1000) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}
