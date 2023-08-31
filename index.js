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
    console.log(searchTerm)
    /*    for (let i of response.data.Search) {
            console.log(`Movie is ${i.Title} released in ${i.Year} `)
        }*/
}

/*connect to input field of html file*/
const input = document.querySelector('input');


const onInput = event => fetchData(event.target.value)

/*event listen for input change and perform data request from omdb per user input*/
input.addEventListener('input', debounce(onInput, 500))
