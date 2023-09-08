/*debounce helper function to prevent unnecessary api calls by using setTimeout
* to wait for period of time to ensure user is done typing. Default to 1000ms, developer
* can supply 2nd argument to function if change is needed*/
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
