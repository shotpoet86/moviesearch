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


/*connect to autocomplete class in html and displays html for each movie selected*/
const root = document.querySelector('.autocomplete');
root.innerHTML = `
        <label>
            <b>Search for a Movie:</b>
            <input class="input" type="text" value=""/>
        </label>
        <div class="dropdown">
         <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>  
`


/*connect to html classes for rendering content from js file to html*/
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')


/*Uses for/of loop to display
* content from imdb api. Specifically, movie poster and title*/
const onInput = async (event) => {
    const movies = await fetchData(event.target.value)

    /*append a 'is-active' class to current dropdown class when onInput function called*/
    dropdown.classList.add('is-active')

    /*loop through movie results*/
    for (let movie of movies) {

        /*create an anchor element for user to select gaining more info about movie*/
        const option = document.createElement('a');

        /*append 'dropdown-item' class to current option anchor element during loop*/
        option.classList.add('dropdown-item')
        /*add inner-html to option anchor element with results of each movie title*/
        option.innerHTML = `
        <img src="${movie.Poster}" alt="movie posters"/>
        ${movie.Title}`

        /*append option anchor to results class in html content*/
        resultsWrapper.appendChild(option)
    }
}


/*event listen for input change and perform data request from omdb api per user input. Calls
* debounce function from utils.js with 2nd argument to determine wait time between user input and api call*/
input.addEventListener('input', debounce(onInput, 1000))
