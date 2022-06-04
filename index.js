let movie_list = [];
let viewMode = "all";
const moviesPerPage = 2;
let currentPageNumber = 0;

function ViewMovies() {
  $("#movie_list").children().remove();
  let view_movie_list;
  if (viewMode == "all") {
    view_movie_list = movie_list;
  }
  if (viewMode == "favorites") {
    view_movie_list = movie_list.filter((movie) => movie.favorite)
  }
  let from = currentPageNumber * moviesPerPage;
  let to = from + moviesPerPage;
  let paged_movie_list = view_movie_list.slice(from,to);
  DrawMovies(paged_movie_list);
}


function DrawMovies(movies) {
  movies.forEach((movie) =>
    drawMovie(movie)
  )
}

function drawMovie(currentMovie) {
  let likeButtonClass = (currentMovie.favorite) ? "favorite_movie_2" : "favorite_movie";
  let divClass = ` <div class="movie">
<p class="movie_title">` + currentMovie.title + `</p>
<button type="button" onclick="switchMovieFavorite(`+ currentMovie.id + `)" class="` + likeButtonClass + `" id="favorite_movie"> <i class="fa fa-heart"></i> </button>
<button type="button" onclick="deleteMovie(`+ currentMovie.id + `)" class="movie_delete_button"> <i class="fa fa-trash"></i> </button>
<button type="button" onclick="showEditMovieForm(`+ currentMovie.id + `)" class="movie_change_button"> <i class="fa fa-pencil"></i> </button>

</div >`;
  $("#movie_list").append(divClass);
}


function addMovieThroughForm() {
  let idValue = $("#id_input").val();
  let titleValue = $("#title_input").val();
  let descriptionValue = $("#description_input").val();

  if (idValue == null || idValue == undefined || idValue == "") {
    alert("Введите id")
  }
  else {
    let objMovie = { id: Number(idValue), title: titleValue, description: descriptionValue, favorite: false };
    movie_list.push(objMovie);
    $("#id_input,#title_input,#description_input").val(null);

    ViewMovies();
  }

}

function deleteMovie(id) {
  movie_list = movie_list.filter(function (movie) {
    return id != movie.id
  })
  ViewMovies();
}

function findMovieById(id) {
  let filteredByIdMovies = movie_list.filter(function (movie) {
    return id == movie.id;
  })
  let movieValue = filteredByIdMovies[0];
  return movieValue;
}

function changeMovieThroughForm() {
  let idValue = $("#id_input1").val();
  let movieValue = findMovieById(idValue);
  movieValue.title = $("#title_input1").val();
  movieValue.description = $("#description_input1").val();
  showAddMovieForm();
  ViewMovies();
}

function showEditMovieForm(id) {
  let movieValue = findMovieById(id);
  $("#title_input1").val(movieValue.title);
  $("#description_input1").val(movieValue.description);
  $("#id_input1").val(id);
  $("#change_movie_form").css("display", "block");
  $("#add_movie_form").css("display", "none");

}

function showAddMovieForm() {
  $("#change_movie_form").css("display", "none");
  $("#add_movie_form").css("display", "block");
}


function switchMovieFavorite(id) {
  for (let i = 0; i < movie_list.length; i++) {
    if (id == movie_list[i].id) {
      movie_list[i].favorite = !movie_list[i].favorite
    }

  }
  ViewMovies();
}



function movieListButton() {
  viewMode = "all";
  currentPageNumber = 0;
  ViewMovies();
}

function favoriteMovieListButton() {
  viewMode = "favorites";
  currentPageNumber = 0;
  ViewMovies();
}

function previousPage() {
  if (currentPageNumber > 0) {
    currentPageNumber -= 1
  }
  ViewMovies()
}

function nextPage() {
  let movies_length;
  if (viewMode == "all") {
    movies_length = movie_list.length
  }
  else {
    movies_length = movie_list.filter((movie) => movie.favorite).length
  }
  let maxPageNumber = Math.ceil(movies_length / moviesPerPage) - 1;
  if (maxPageNumber == -1) {
    currentPageNumber = 0;
  }
  if (currentPageNumber < maxPageNumber) {
    currentPageNumber += 1;
  }
  ViewMovies()
}

showAddMovieForm();
ViewMovies();