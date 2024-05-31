const movieList = [
    {
        title: "Avengers Endgame",
        director: "Russo Brothers",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Avengers Infinity War",
        director: "Russo Brothers",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Civil War",
        director: "Director",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Hulk",
        director: "Smash",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Spider-man",
        director: "Goat",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "One Piece Stampede",
        director: "Eichiro Oda",
        genre: "Anime",
        isAvailable: true,
    },
];

const customerList = [
    {
        id: 1,
        name: "Max Santos",
        movieRented: []
    },
    {
        id: 2,
        name: "Jeramie Santos",
        movieRented: []
    },
    {
        id: 3,
        name: "Sam Sung",
        movieRented: []
    }
];

let rentedUpdate = false;

const customerNames = document.querySelector("#customer-name");
const movieNames = document.querySelector("#movie-name");

function Movie (title, director, genre, isAvailable) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.isAvailable = isAvailable;
}

function Customer (id, name, movieRented) {
    this.id = id
    this.name = name;
    this.movieRented = [];
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

Customer.prototype.rentAMovie = function () {

};

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

    updateListMovies(movieList[movieList.length - 1]);
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
    movieIsAvailable.value = index;
    
    movieRow.appendChild(movieTitle);
    movieRow.appendChild(movieDirector);
    movieRow.appendChild(movieGenre);
    movieRow.appendChild(movieIsAvailable);

    movieTable.appendChild(movieRow);
}

movieList.forEach((movie, index) => {
    Object.setPrototypeOf(movie, Movie.prototype);
    displayMovies(movie, index);
    updateListMovies(movie);
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
        displayCustomer(customerList[customerList.length - 1]);
    }

    updateListCustomer(customerList[customerList.length - 1]);
    formCustomer.reset();
    dialogCustomer.close();

});

function displayCustomer(customerAdded) {
    const customerRow = document.createElement("tr");

    const customerName = document.createElement("td");
    customerName.textContent = customerAdded.name;
    
    const customerRented = document.createElement("td");
    customerRented.className = "rented-movies";
    customerRented.value = customerAdded.id;

    if (customerAdded.movieRented){
        customerRented.textContent = customerAdded.listRentedMovie();  
    }
    

    customerRow.appendChild(customerName);
    customerRow.appendChild(customerRented);

    customerTable.appendChild(customerRow);
}

customerList.forEach((customer) => {
    Object.setPrototypeOf(customer, Customer.prototype);
    displayCustomer(customer);
    updateListCustomer(customer);
});

// Rent 
const dialogRent = document.querySelector(".dialog.rent");
const formRent = document.querySelector("#form-rent");
const rentClose = document.querySelector(".rent-close");

const btnRent = document.querySelector(".btn.rent-movie");

btnRent.addEventListener("click", () => {
    dialogRent.showModal();
});

function updateListMovies(movieAdded){
        if (rentedUpdate){
            console.log(movieAdded);
            const optionRented = document.querySelectorAll(".option-rented");
            for (let i = 0; i < optionRented.length; i++) {
                movieNames.removeChild(optionRented[i]);
            }

            rentedUpdate = false;
        }

        const optionMovie = document.createElement("option");
        optionMovie.textContent = movieAdded.title;
        optionMovie.value = movieAdded.title;
        optionMovie.className = "option-rented";
    
        if (movieAdded.isAvailable){
            movieNames.appendChild(optionMovie);
        }
}
 
function updateListCustomer (customerAdded){
        const optionCustomer = document.createElement("option");
        optionCustomer.textContent = customerAdded.name;
        optionCustomer.value = customerAdded.name;

        customerNames.appendChild(optionCustomer);
}

formRent.addEventListener("submit", (event) => {
    event.preventDefault();

    customerList.forEach((customer) => {
        if (customer.name == customerNames.value){
            customer.movieRented.push(movieNames.value);
            const update = document.querySelectorAll(".rented-movies");
            update.forEach(data => {
                if (data.value == customer.id){
                    data.textContent = customer.listRentedMovie();
                }
            });
        }
    })

    movieList.forEach((movie, index) => {
        if (movie.title == movieNames.value){
            const update = document.querySelectorAll(".availability");
            update.forEach(item => {
                if (item.value == index){
                    item.textContent = movie.toggleAvailability();
                    rentedUpdate = true;
                    
                }
            })
        }
    });

    movieList.forEach(movie => {
        updateListMovies(movie);
    });
    
    dialogRent.close();
    formRent.reset();
});

rentClose.addEventListener("click", () => {
    dialogRent.close();
    formRent.reset();
})






