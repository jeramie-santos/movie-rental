const movieList = [
    {
        title: "Avengers Endgame",
        director: "Russo Brothers",
        genre: "Action, Sci-fi",
        isAvailable: true,
    }
];

function Movies (title, director, genre, isAvailable) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.isAvailable = isAvailable;
}

const movieTable = document.querySelector("#movie-table");

const movieRow = document.createElement("tr");

const movieTitle = document.createElement("td");
movieTitle.textContent = movieList[0].title;

const movieDirector = document.createElement("td");
movieDirector.textContent = movieList[0].director;

const movieGenre = document.createElement("td");
movieGenre.textContent = movieList[0].genre;

const movieIsAvailable = document.createElement("td");
movieIsAvailable.textContent = movieList[0].isAvailable;

movieRow.appendChild(movieTitle);
movieRow.appendChild(movieDirector);
movieRow.appendChild(movieGenre);
movieRow.appendChild(movieIsAvailable);

movieTable.appendChild(movieRow);



