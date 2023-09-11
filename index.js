/*autocompleteconfig is template with required createAutoComplete function arguments. Dev will need to provide
* api to fetch for 'root' property of object*/
const autoCompleteConfig = {
    renderOption(movie) {
        /*Ensures no image will show if unavailable or broken = "N/A"*/
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" alt="movie posters"/>
        ${movie.Title} (${movie.Year})`
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
}
/*call createAutoComplete object by spreading imdb config and providing root property information*/
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('.right-summary'), 'right')
    },
})
/*call createAutoComplete object by spreading imdb config and providing root property information*/
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('.left-summary'), 'left')
    },
})
/*delcare variables to use in onMovieSelect function*/
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        /*axios query parameters for request*/
        params: {
            apikey: "32c05230",
            i: movie.imdbID,
        }
    })
    if (response.data.Error) {
        return []
    }
    /*add imdb data to summary class in html file*/
    summaryElement.innerHTML = movieTemplate(response.data);

    /*determine which movie receives data from imdb api*/
    if (side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }
    if (leftMovie && rightMovie) {
        runComparison();
    }
}

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('.left-summary .notification')
    const rightSideStats = document.querySelectorAll('.right-summary .notification')
    /*changes losing movie attribute color to yellow reflecting loss by evaluating data class appended to each
    * article in movieTemplate function below*/
    leftSideStats.forEach((leftStat, idx) => {
        const rightStat = rightSideStats[idx]
        const leftSideValue = parseInt(leftStat.dataset.value)
        const rightSideValue = parseInt(rightStat.dataset.value)
        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary')
            leftStat.classList.add('is-warning')
        } else {
            rightStat.classList.remove('is-primary')
            rightStat.classList.add('is-warning')
        }
    })
}


/*displays detailed information about user selected movie*/
const movieTemplate = (movieDetail) => {
    /*converts important comparison information to numbers for evaluation*/
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    const metaScore = parseInt(movieDetail.Metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word)
        if (isNaN(value)) {
            return prev
        } else return prev + value
    }, 0)
    /*return html template*/
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
<article data-value="${awards}" class="notification is-primary">
<p class="title">${movieDetail.Awards}</p>
<p class="subtitle">Awards</p>
</article>
<article data-value="${dollars}" class="notification is-primary">
<p class="title">${movieDetail.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article data-value="${metaScore}" class="notification is-primary">
<p class="title">${movieDetail.Metascore}</p>
<p class="subtitle">Metascore</p>
</article>
<article data-value="${imdbRating}" class="notification is-primary">
<p class="title">${movieDetail.imdbRating}</p>
<p class="subtitle">IMDB Rating</p>
</article>
<article data-value="${imdbVotes}" class="notification is-primary">
<p class="title">${movieDetail.imdbVotes}</p>
<p class="subtitle">IMDB Votes</p>
</article>
`
}

