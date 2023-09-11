/*autocomplete template that takes 5 parameters and displays information from arguments passed by dev
* to end user*/
const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {

    /*model of dropdown to be displayed in root element*/
    root.innerHTML = `
        <label>
            <b>Search</b>
            <input class="input" type="text" value=""/>
        </label>
        <div class="dropdown">
         <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>  
`
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')
    /*Uses for/of loop to display content*/
    const onInput = async (event) => {
        const items = await fetchData(event.target.value)
        /*removes empty dropdown menu if user is searching for new item*/
        if (!items.length) {
            dropdown.classList.remove('is-active')
            return
        }
        /*clears results when user deletes input to search for new item*/
        resultsWrapper.innerHTML = ''
        /*append 'is-active' class to current dropdown class when onInput function called*/
        dropdown.classList.add('is-active')

        /*loop through item results*/
        for (let item of items) {
            /*create an anchor element for user to select gaining more info about item*/
            const option = document.createElement('a');
            /*append 'dropdown-item' class to current option anchor element during loop*/
            option.classList.add('dropdown-item')
            /*add inner-html to option anchor element with results of each item title*/
            option.innerHTML = renderOption(item)
            /*listen for user click on any item in dropdown menu*/
            option.addEventListener('click', () => {
                /*close dropdown menu*/
                dropdown.classList.remove('is-active')
                /*updates input value to selected item from dropdown menu*/
                input.value = inputValue(item)
                /*pass selected item from dropdown to onOptionSelect function which will show
                * detailed results for specific item*/
                onOptionSelect(item)
            })
            resultsWrapper.appendChild(option)
        }
    }

    /*event listen for input change and perform data request from api per user input. Calls
 * debounce function from utils.js with 2nd argument to determine wait time between user input and api call.
 * Delay can be changed by dev using 2nd argument*/
    input.addEventListener('input', debounce(onInput, 1000))
    /*global event listener that handles closing the dropdown menu if focus is lost*/
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })
}

