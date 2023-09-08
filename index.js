/*connect to html classes for rendering content from js file to html*/
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')
/*Uses for/of loop to display
* content from imdb api. Specifically, movie poster and title*/

/*event listen for input change and perform data request from omdb api per user input. Calls
* debounce function from utils.js with 2nd argument to determine wait time between user input and api call*/
input.addEventListener('input', debounce(onInput, 1000))
/*global event listener that handles closing the dropdown menu if focus is lost*/
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active')
    }
    console.log(event.target)
})
