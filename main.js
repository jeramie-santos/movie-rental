const movieList = [
    // {
    //     title: "Avengers Endgame",
    //     director: "Russo Brothers",
    //     genre: "Action, Sci-fi",
    //     isAvailable: true,
    // }
];

function Movie (title, director, genre, isAvailable) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.isAvailable = isAvailable;
}

Movie.prototype.toggleAvailability = function() {
    return this.isAvailable = !this.isAvailable;
};

const movieTable = document.querySelector("#table-movie");
const btnAddMovie = document.querySelector(".btn.add-movie");
const dialogMovie = document.querySelector(".dialog.movie");
const formMovie = document.querySelector("#form-movie")
const dialogSubmit = document.querySelector(".dialog-submit");
const dialogClose = document.querySelector(".dialog-close");

btnAddMovie.addEventListener("click", () => {
    dialogMovie.showModal();
});


formMovie.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#movie-title").value;
    const director = document.querySelector("#movie-director").value;
    const genre = document.querySelector("#movie-genre").value;

    if (title && director && genre) {
        movieList.push(new Movie(title, director, genre, true));
        displayMovies(movieList[movieList.length - 1], movieList.length - 1);
    }

    formMovie.reset();
    dialogMovie.close();
});

dialogClose.addEventListener("click", () => {
    formMovie.reset();
    dialogMovie.close();

});

function displayMovies(movieAdded, index) {
    const movieRow = document.createElement("tr");

    const movieTitle = document.createElement("td");
    movieTitle.textContent = movieAdded.title;

    const movieDirector = document.createElement("td");
    movieDirector.textContent = movieAdded.director;

    const movieGenre = document.createElement("td");
    movieGenre.textContent = movieAdded.genre;

    const movieIsAvailable = document.createElement("td");
    movieIsAvailable.textContent = movieAdded.isAvailable;
    movieIsAvailable.className = "availability";

    movieIsAvailable.addEventListener("click", function() {
        movieIsAvailable.textContent = movieAdded.toggleAvailability();
    });
    
    movieRow.appendChild(movieTitle);
    movieRow.appendChild(movieDirector);
    movieRow.appendChild(movieGenre);
    movieRow.appendChild(movieIsAvailable);

    movieTable.appendChild(movieRow);
}

movieList.forEach((movie, index) => {
    displayMovies(movie, index);
});
