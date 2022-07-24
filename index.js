// URLS and apiKeys
const apiKey = 'b014f189f92a2ee87dc6cf1a1a731cc1'
const baseUrl = 'https://api.themoviedb.org/3'
const discoverUrl = '/discover/movie?sort_by=popularity.desc&api_key='
const mainURL = baseUrl + discoverUrl + apiKey
const searchURL = `${baseUrl}/search/movie?api_key=${apiKey}`

// Selectors
const form = document.getElementById('search-form')
const searchBtn = document.querySelector('.btn')
const query = document.getElementById('query')
const showResultsElement = document.getElementById('showResults')

// Functions  
get_movies(mainURL)

// Function to get the movies
function get_movies(url) {
    fetch(url).then(res => res.json()).then(data => {
        show_movies(data.results)
    })
}

// Function to show the movies
function show_movies(data) {
    const movieContainer = document.querySelector('#movie-container')
    movieContainer.innerHTML = ''

    data.forEach(movie => {
        const { title, poster_path, release_date, overview, vote_average, popularity } = movie
        const movie_card = document.createElement('div')
        movie_card.classList.add('movie-card')

        movie_card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="poster"></img>
                <h2 class="movie-title">${title}</h2>
                <h4 class="movie-date" style="color: #1857a4;">${release_date}</h4>
                <h4 class="movie-date" style="color: #ffa600;">${vote_average}</h4>
                <h4 class="movie-date">Popularity : ${popularity}</h4>
                <p class="movie-overview">${overview}</p>
                `
        // Apend the movie card in the movie container
        movieContainer.appendChild(movie_card)

        query.value = null
    })
}

// Event Listener on form
form.addEventListener('submit', e => {
    // Prevent the site to reload 
    e.preventDefault()

    const searchVal = query.value

    if (searchVal) {
        // show the movies according to the query
        get_movies(searchURL + '&query=' + searchVal)
        showResultsElement.style.display = 'block'
        showResultsElement.innerHTML = `Showing Results For : ${searchVal}`
    }
})