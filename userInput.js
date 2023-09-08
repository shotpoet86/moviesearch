/*Uses for/of loop to display
* content from imdb api. Specifically, movie poster and title*/
const onInput = async (event) => {
    const movies = await fetchData(event.target.value)
    /*removes empty dropdown menu if user is searching for new movie*/
    if (!movies.length) {
        dropdown.classList.remove('is-active')
        return
    }
    /*clears results when user deletes input to search for new movie*/
    resultsWrapper.innerHTML = ''
    /*append a 'is-active' class to current dropdown class when onInput function called*/
    dropdown.classList.add('is-active')

    /*loop through movie results*/
    for (let movie of movies) {

        /*create an anchor element for user to select gaining more info about movie*/
        const option = document.createElement('a');

        /*Ensures no image will show if unavailable or broken = "N/A"*/
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        /*append 'dropdown-item' class to current option anchor element during loop*/
        option.classList.add('dropdown-item')

        /*add inner-html to option anchor element with results of each movie title*/
        option.innerHTML = `
        <img src="${imgSrc}" alt="movie posters"/>
        ${movie.Title}`

        /*listen for user click on any movie in dropdown menu*/
        option.addEventListener('click', () => {
            /*close dropdown menu*/
            dropdown.classList.remove('is-active')
            /*updates input value to selected movie from dropdown menu*/
            input.value = movie.Title;
        })

        /*append option anchor to results class in html content*/
        resultsWrapper.appendChild(option)
    }
}
