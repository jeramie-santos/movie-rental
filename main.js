const movieList = [
    {
        title: "Avengers Endgame",
        director: "Russo Brothers",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
];

const customerList = [
    {
        name: "Max Santos",
        movieRented: "Avengers Infinity War"
    }
];

function Movie (title, director, genre, isAvailable) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.isAvailable = isAvailable;
}

function Customer (name, movieRented) {
    this.name = name;
    this.movieRented = movieRented;
}

Movie.prototype.toggleAvailability = function() {
    return this.isAvailable = !this.isAvailable;
};

Movie.prototype.info = function() {
    return `${this.title} directed by ${this.director}, ${this.genre} `;
}

const movieTable = document.querySelector("#table-movie");
const customerTable = document.querySelector("#table-customer");
const btnAddMovie = document.querySelector(".btn.add-movie");
const dialogMovie = document.querySelector(".dialog.movie");
const formMovie = document.querySelector("#form-movie")
const dialogSubmit = document.querySelector(".dialog-submit");
const dialogClose = document.querySelector(".dialog-close");

// Movie

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
        console.log(movieAdded.info());
    });
    
    movieRow.appendChild(movieTitle);
    movieRow.appendChild(movieDirector);
    movieRow.appendChild(movieGenre);
    movieRow.appendChild(movieIsAvailable);

    movieTable.appendChild(movieRow);
}

movieList.forEach((movie, index) => {
    Object.setPrototypeOf(movie, Movie.prototype);
    displayMovies(movie, index);
});

// Customer

function displayCustomer(customerAdded, index) {
    const customerRow = document.createElement("tr");

    const customerName = document.createElement("td");
    customerName.textContent = customerAdded.name;
    
    const customerRented = document.createElement("td");
    customerRented.textContent = customerAdded.movieRented;
    
    customerRow.appendChild(customerName);
    customerRow.appendChild(customerRented);

    customerTable.appendChild(customerRow);
}

customerList.forEach((customer, index) => {
    displayCustomer(customer, index);
});

