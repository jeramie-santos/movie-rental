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
        title: "Hulk",
        director: "Louis Leterrier",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Civil War",
        director: "Ruso Brothers",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "Spider-man: No Way Home",
        director: "John Watts",
        genre: "Action, Sci-Fi",
        isAvailable: true,
    },
    {
        title: "One Piece Stampede",
        director: "Takashi Otsuka",
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
        name: "Sanji Vinsmoke",
        movieRented: []
    }
];

let rentedUpdate = false;



// Constructor

function Movie (title, director, genre, isAvailable = true) {
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

// Methods

Movie.prototype.toggleAvailability = function() {
    return this.isAvailable = !this.isAvailable;
};

Movie.prototype.info = function() {
    return `${this.title} directed by ${this.director}, ${this.genre} `;
}

Movie.prototype.displayMovies = function(index) {
    const movieRow = document.createElement("tr");

    const movieTitle = document.createElement("td");
    movieTitle.textContent = this.title;

    const movieDirector = document.createElement("td");
    movieDirector.textContent = this.director;

    const movieGenre = document.createElement("td");
    movieGenre.textContent = this.genre;

    const movieIsAvailable = document.createElement("td");
    movieIsAvailable.textContent = this.isAvailable;
    movieIsAvailable.className = "availability";
    movieIsAvailable.value = index;
    
    movieRow.appendChild(movieTitle);
    movieRow.appendChild(movieDirector);
    movieRow.appendChild(movieGenre);
    movieRow.appendChild(movieIsAvailable);

    movieTable.appendChild(movieRow);
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

Customer.prototype.rentAMovie = function() {

};

Customer.prototype.displayCustomer = function() {
    const customerRow = document.createElement("tr");

    const customerName = document.createElement("td");
    customerName.textContent = this.name;
    
    const customerRented = document.createElement("td");
    customerRented.className = "rented-movies";
    customerRented.value = this.id;

    if (this.movieRented){
        customerRented.textContent = this.listRentedMovie();  
    }
    

    customerRow.appendChild(customerName);
    customerRow.appendChild(customerRented);

    customerTable.appendChild(customerRow);
}

const customerNames = document.querySelector("#customer-name");
const movieNames = document.querySelector("#movie-name");
const selectCusomter = document.querySelector("#customer-return");
const selectMovie = document.querySelector("#movie-return");

const movieTable = document.querySelector("#table-movie");
const btnAddMovie = document.querySelector(".btn.add-movie");
const dialogMovie = document.querySelector(".dialog.movie");
const formMovie = document.querySelector("#form-movie")
const movieModalClose = document.querySelector(".movie-close");

const customerTable = document.querySelector("#table-customer");
const dialogCustomer = document.querySelector(".dialog.customer");
const formCustomer = document.querySelector("#form-customer");
const btnAddCustomer = document.querySelector(".btn.add-customer");
const customerModalClose = document.querySelector(".customer-close");

const dialogRent = document.querySelector(".dialog.rent");
const formRent = document.querySelector("#form-rent");
const rentModalClose = document.querySelector(".rent-close");
const btnRentMovie = document.querySelector(".btn.rent-movie");

const dialogReturn = document.querySelector(".dialog.return");
const returnModalClose = document.querySelector(".return-close");
const formReturn = document.querySelector("#form-return");
const btnReturnMovie = document.querySelector(".btn.return-movie");


// to show modal


btnAddMovie.addEventListener("click", () => {
    dialogMovie.showModal();
});

btnAddCustomer.addEventListener("click", () => {
    dialogCustomer.showModal();
});

btnRentMovie.addEventListener("click", () => {
    dialogRent.showModal();
});


// Need to clean
btnReturnMovie.addEventListener("click", () => {
    // to remove name of customer when there is no rented movie
    const rentedCustomer = document.querySelectorAll(".rented-customer"); 
    rentedCustomer.forEach(customerRent => {
        customerList.forEach(customer => {
            if (customer.name == customerRent.value){
                if (customer.movieRented.length == 0){
                    selectCusomter.removeChild(customerRent);
                }
            }
        });
    });

    // same here just to remove movie that was appended on the list

    const rentedList = document.querySelectorAll(".rented-list"); 
    rentedList.forEach(list => {
        selectMovie.removeChild(list);
    });

    dialogReturn.showModal();
});


// to close modal

movieModalClose.addEventListener("click", () => {
    formMovie.reset();
    dialogMovie.close();

});

customerModalClose.addEventListener("click", () => {
    formCustomer.reset();
    dialogCustomer.close();
});

rentModalClose.addEventListener("click", () => {
    dialogRent.close();
    formRent.reset();
})

returnModalClose.addEventListener("click", ()=> {
    dialogReturn.close();
    formReturn.reset();
});


function movieAvailability(selected) {
    movieList.forEach((movie, index) => {
        if (movie.title == selected.value){
            const update = document.querySelectorAll(".availability");
            update.forEach(item => {
                if (item.value == index){
                    item.textContent = movie.toggleAvailability();
                    rentedUpdate = true;
                }
            })
        }
    });
}


// Movie


formMovie.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#movie-title").value;
    const director = document.querySelector("#movie-director").value;
    const genre = document.querySelector("#movie-genre").value;

    if (title && director && genre) {
        movieList.push(new Movie(title, director, genre));
        movieList[movieList.length - 1].displayMovies(movieList.length - 1);
    }

    updateListMovies(movieList[movieList.length - 1]);
    formMovie.reset();
    dialogMovie.close();
});

movieList.forEach((movie, index) => {
    Object.setPrototypeOf(movie, Movie.prototype);
    movie.displayMovies(index);
    updateListMovies(movie);
});

// // Customer



formCustomer.addEventListener("submit", (event) => {
    event.preventDefault();

    const fName = document.querySelector("#f-name").value;
    const lName = document.querySelector("#l-name").value;
    const fullName = `${fName} ${lName}`;

    if (fullName && lName){
        customerList.push(new Customer(customerList.length + 1, fullName, ""));
        customerList[customerList.length - 1].displayCustomer();
    }

    updateListCustomer(customerList[customerList.length - 1]);
    formCustomer.reset();
    dialogCustomer.close();

});

customerList.forEach((customer) => {
    Object.setPrototypeOf(customer, Customer.prototype);
    customer.displayCustomer();
    updateListCustomer(customer);
});

// Rent 

function updateListMovies(movieAdded){
        if (rentedUpdate){
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
                    displayCustomerRented(customer);
                }
            });
        }
    })

    movieAvailability(movieNames);

    movieList.forEach(movie => {
        updateListMovies(movie);
    });
    
    dialogRent.close();
    formRent.reset();
});


// Return 

function displayCustomerRented(customer){
    const rentedCustomer = document.querySelectorAll(".rented-customer"); 
    rentedCustomer.forEach(customerRent => {
        if (customerRent.value == customer.name){
            selectCusomter.removeChild(customerRent);
        }
    });

    const customerThatRent = document.createElement("option");
    customerThatRent.textContent = customer.name;
    customerThatRent.value = customer.name;
    customerThatRent.className = "rented-customer";

    selectCusomter.appendChild(customerThatRent);
}

selectCusomter.addEventListener("click", () => {
    const rentedList = document.querySelectorAll(".rented-list"); 
    rentedList.forEach(list => {
        selectMovie.removeChild(list);
    });


    customerList.forEach(customer => {
        if(customer.name == selectCusomter.value){
            customer.movieRented.forEach(movie => {
                const selectMovieRented = document.createElement("option");
                selectMovieRented.textContent = movie;
                selectMovieRented.value = movie;
                selectMovieRented.className = "rented-list";

                selectMovie.appendChild(selectMovieRented);
            });
        }
    });
})

formReturn.addEventListener("submit", (event) => {
    event.preventDefault();

    customerList.forEach(customer => {
        if (customer.name == selectCusomter.value){
            customer.movieRented.forEach((movie, index) => {
                if (movie == selectMovie.value){
                    customer.movieRented.splice(index, 1);
                    const update = document.querySelectorAll(".rented-movies");
                    update.forEach(data => {
                        if (data.value == customer.id){
                            data.textContent = customer.listRentedMovie();
                        }
                    });
                }
            });
        }
    });

    movieAvailability(selectMovie);

    movieList.forEach(movie => {
        updateListMovies(movie);
    });


    dialogReturn.close();
    formReturn.reset();
});



customerList.forEach(customer => {
    if (customer.movieRented.length != 0){
        displayCustomerRented(customer);
    }
});







