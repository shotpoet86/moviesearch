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
