const APIURL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('main');
const form = document.getElementById('form');
const buttonGp = document.querySelector('.button-gp');
const search = document.querySelector('.search');

getMovies(APIURL);

async function getMovies(url) {
    const res = await fetch(url);
    const resData = await res.json();

    showMovies(resData.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const {
            poster_path,
            title,
            vote_average,
            backdrop_path,
            vote_count,
            release_date,
            overview,
        } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `<img
            src="${IMGPATH + (poster_path ? poster_path : backdrop_path)}"
            alt="movie-poster"
        />
        <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
        </div>
        <div class='banner'>
            <h3 class='title'>${title}</h3>       
            <div class='overview'>
            <h4 class='overview-header'>Overview</h4>       
            <p class='overview-text'>${overview}</p>
            <hr />
            </div>
            <div class='details'>
                <div class='row'><div class='details-text'>Rating</div>
                <span class='${getClassByRate(
                    vote_average
                )} badge'>${vote_average}</span></div>
                <div class='row'><div class='details-text'>Release Date</div>
                <span class='badge'>${release_date}</span></div>
                <div class='row'><div class='details-text'>votes</div>
                <span class='badge'>${vote_count}</span></div>
            </div>
        </div> `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote <= 5) {
        return 'red';
    } else if (vote > 5 && vote <= 8) {
        return 'orange';
    } else {
        return 'green';
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        const newUrl = SEARCHAPI + searchTerm;
        getMovies(newUrl);
        search.value = '';
    }
});

// navigation buttons

// function showButtons() {
//     buttonGp.innerHTML = '';
//     const buttonNext = document.createElement('button');
//     const buttonPrev = document.createElement('button');
//     const buttonFirst = document.createElement('button');
//     const buttonLast = document.createElement('button');
//     nextButton(buttonNext);
//     prevtButton(buttonPrev);
//     firstButton(buttonFirst);
//     lastButton(buttonLast);
//     buttonGp.appendChild(buttonFirst);
//     buttonGp.appendChild(buttonPrev);
//     buttonGp.appendChild(buttonNext);
//     buttonGp.appendChild(buttonLast);
//     buttonFirst.addEventListener('click', showFirst);
//     buttonLast.addEventListener('click', showLast);
//     buttonNext.addEventListener('click', handleIncrement);
//     buttonPrev.addEventListener('click', handleDecrease);
// }

// function nextButton(buttonNext) {
//     buttonNext.classList.add('btn');
//     buttonNext.textContent = 'NEXT';
//     if (index >= 500) {
//         buttonNext.style.display = 'none';
//     }
// }

// function prevtButton(buttonPrev) {
//     buttonPrev.classList.add('btn');
//     buttonPrev.textContent = 'PREV';
//     if (index <= 0) {
//         buttonPrev.style.display = 'none';
//     }
// }

// function firstButton(buttonFirst) {
//     buttonFirst.classList.add('btn');
//     buttonFirst.textContent = 'FIRST';
//     if (index <= 5) {
//         buttonFirst.style.display = 'none';
//     }
// }

// function lastButton(buttonLast) {
//     buttonLast.classList.add('btn');
//     buttonLast.textContent = 'LAST';
//     if (index > 94) {
//         buttonLast.style.display = 'none';
//     }
// }

// //click handlers

// function handleIncrement() {
//     if (index < 500) {
//         index++;
//         getMovies(APIURL, index);
//     }
// }

// function handleDecrease() {
//     if (index > 0) {
//         index--;
//         getMovies(APIURL, index);
//     }
// }

// function showFirst() {
//     index = 1;
//     getMovies(APIURL, index);
// }

// function showLast() {
//     index = 500;
//     getMovies(APIURL, index);
// }
