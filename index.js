const moviesItemTemplate = ` <div class="movie">
<p class="movie_title">  {1}  </p>
<button type="button" onclick="deleteMovie('{0}')" class="movie_delete_button"> <i class="fa fa-trash"></i> </button>
<button type="button" onclick="showEditMovieForm('{0}')" class="movie_change_button"> <i class="fa fa-pencil"></i> </button>
</div >`;

function viewMovies() {
  $("#movie_list").children().remove();
  callGetAllMovies((movies) => drawMovies(movies));
}

function drawMovies(movies) {
  movies.forEach((movie) =>
    drawMovie(movie)
  )
}

function drawMovie(currentMovie) {
  $("#movie_list").append(moviesItemTemplate.format(currentMovie.id, currentMovie.title));
}



function deleteMovie(id) {
  callDeleteMovie(id, () => viewMovies())
}

function changeMovieThroughForm() {
  let titleValue = $("#title_input1").val();
  let descriptionValue = $("#description_input1").val();
  let idValue = $("#id_input1").val();
  let movie = { id: idValue, title: titleValue, description: descriptionValue }
  callPutMovie(movie, () => {
    viewMovies();
    $("#id_input1,#title_input1,#description_input1").val(null);
  })
}

function showEditMovieForm(id) {
  callGetMovie(id, (movie) => {
    $("#id_input1").val(id);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
  })
}

function cancelEditingMovie(){
  $("#id_input1,#title_input1,#description_input1").val(null);
}

viewMovies();