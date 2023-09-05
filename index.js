/*fetches data from imdb api*/
const fetchData = async (searchTerm) => {
    /*store data request in variable response*/
    const response = await axios.get('http://www.omdbapi.com/', {
        /*add query parameters for request*/
        params: {
            apikey: "32c05230",
            s: searchTerm,
        }
    })
    if (response.data.Error) {
        return []
    }
    return response.data.Search
}

/*connect to input field of html file*/
const input = document.querySelector('input');


const onInput = async (event) => {
    const movies = await fetchData(event.target.value)
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}" alt="movie posters"/>
        <h1>${movie.Title}</h1>`
        document.querySelector('.target').appendChild(div)
    }
}

/*event listen for input change and perform data request from omdb per user input*/
input.addEventListener('input', debounce(onInput, 500))
