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
        id: 1,
        name: "Max Santos",
        movieRented: ["Avengers Infinity War", "Civil War", "Hulk", "Spider-man"]
    }
];

function Movie (title, director, genre, isAvailable) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.isAvailable = isAvailable;
}

function Customer (id, name, movieRented) {
    this.id = id
    this.name = name;
    this.movieRented = movieRented;
}

Movie.prototype.toggleAvailability = function() {
    return this.isAvailable = !this.isAvailable;
};

Movie.prototype.info = function() {
    return `${this.title} directed by ${this.director}, ${this.genre} `;
}

Customer.prototype.listRentedMovie = function() {
    let rented = "";    
    this.movieRented.forEach((movie, index) => {
        if (index == this.movieRented.length - 1) {
            rented += movie;
        } else {
            rented += movie + ", ";
        }
    });
    return rented;
}

const movieTable = document.querySelector("#table-movie");
const btnAddMovie = document.querySelector(".btn.add-movie");
const dialogMovie = document.querySelector(".dialog.movie");
const formMovie = document.querySelector("#form-movie")
const movieClose = document.querySelector(".movie-close");

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

movieClose.addEventListener("click", () => {
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

const customerTable = document.querySelector("#table-customer");
const dialogCustomer = document.querySelector(".dialog.customer");
const formCustomer = document.querySelector("#form-customer");
const btnAddCustomer = document.querySelector(".btn.add-customer");
const customerClose = document.querySelector(".customer-close");

btnAddCustomer.addEventListener("click", () => {
    dialogCustomer.showModal();
});

customerClose.addEventListener("click", () => {
    formCustomer.reset();
    dialogCustomer.close();
});

formCustomer.addEventListener("submit", (event) => {
    event.preventDefault();

    const fName = document.querySelector("#f-name").value;
    const lName = document.querySelector("#l-name").value;
    const fullName = `${fName} ${lName}`;

    if (fullName && lName){
        customerList.push(new Customer(customerList.length + 1, fullName, ""));
        displayCustomer(customerList[customerList.length - 1],);
    }

    formCustomer.reset();
    dialogCustomer.close();

});

function displayCustomer(customerAdded) {
    const customerRow = document.createElement("tr");

    const customerName = document.createElement("td");
    customerName.textContent = customerAdded.name;
    
    const customerRented = document.createElement("td");
    customerRented.textContent = customerAdded.listRentedMovie();

    console.log(customerAdded.listRentedMovie());

    customerRow.appendChild(customerName);
    customerRow.appendChild(customerRented);

    customerTable.appendChild(customerRow);
}

customerList.forEach((customer) => {
    Object.setPrototypeOf(customer, Customer.prototype);
    displayCustomer(customer);
});



