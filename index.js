/*request detailed data from api to show when user selects specific movie from dropdown menu*/
const fetchDetailedData = async (movie) => {
    /*store data request in property of response*/
    const detailedResponse = await axios.get('http://www.omdbapi.com/', {
        /*add axios query parameters for request*/
        params: {
            apikey: "32c05230",
            i: movie.imdbID,
        }
    })
    /*return empty array if response results in error*/
    if (detailedResponse.data.Error) {
        return []
    }
    /*return data if no error*/
    return detailedResponse.data
}

createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        /*Ensures no image will show if unavailable or broken = "N/A"*/
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" alt="movie posters"/>
        ${movie.Title} (${movie.Year})`
    },
    onOptionSelect(movie) {
        return onMovieSelect(movie)
    },
    inputValue(movie) {
        return movie.Title
    },
    /*fetches data from imdb api using axios*/
    async fetchData(searchTerm) {
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
})

/*when user selects specific movie from dropdown menu*/
const onMovieSelect = async (movie) => {
    /*store api call in movieDetails passing in user selected movie using imdbID to call more
    * information about specific movie*/
    const movieDetails = await fetchDetailedData(movie)
    /*add innerHTML to summary class in html file*/
    document.querySelector('.summary').innerHTML = movieTemplate(movieDetails);
}

/*displays detailed information about user selected movie*/
const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" alt="movie image">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article> 
<article class="notification is-primary">
<p class="title">${movieDetail.Awards}</p>
<p class="subtitle">Awards</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetail.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetail.Metascore}</p>
<p class="subtitle">Metascore</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle">IMDB Rating</p>
</article>
<article class="notification is-primary">
<p class="title">${movieDetail.imdbVotes}</p>
<p class="subtitle">IMDB Votes</p>
</article>
`
}

