/*fetches data from imdb api using axios*/
const fetchData = async (searchTerm) => {
    /*store data request in property of response*/
    const response = await axios.get('http://www.omdbapi.com/', {
        /*add axios query parameters for request*/
        params: {
            apikey: "32c05230",
            s: searchTerm,
        }
    })
    /*return empty array if response results in error*/
    if (response.data.Error) {
        return []
    }
    /*return data if no error*/
    return response.data.Search
}
