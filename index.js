let movie_list = [];
function ViewMovies() {
  $("#movie_list").children().remove();
  for (let i = 0; i < movie_list.length; i++) {

    let divClass = ` <div class="movie">
<p class="movie_title">` + movie_list[i].title + `</p>
<button type="button" onclick="deleteMovie(`+ movie_list[i].id + `)" class="movie_delete_button"> <i class="fa fa-trash"></i> </button>
<button type="button" onclick="showEditMovieForm(`+ movie_list[i].id + `)" class="movie_change_button"> <i class="fa fa-pencil"></i> </button> 
</div >`;

    $("#movie_list").append(divClass);
  }
}

function addMovieThroughForm() {
  let idValue = $("#id_input").val();
  let titleValue = $("#title_input").val();
  let descriptionValue = $("#description_input").val();

  let objMovie = { id: Number(idValue), title: titleValue, description: descriptionValue };
  movie_list.push(objMovie);

  $("#id_input,#title_input,#description_input").val(null);
  ViewMovies();
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

showAddMovieForm()
ViewMovies();