const moviesItemTemplate = ` <div class="movie">
<button type="button" onclick="window.location.href = 'moviePage/moviePage.html?movieId={0}' " class="movie_title"> {1} </button>
<button type="button" onclick="deleteMovie('{0}')" class="movie_delete_button"> <i class="fa fa-trash"></i> </button>
<button type="button" onclick="window.location.href = 'changeMovie/changeMovie.html?movieId={0}' " class="movie_change_button"> <i class="fa fa-pencil"></i> </button>
</div >`;
let pageRequest = { number: 0, size: 2, field: "title", order: "asc" }
$("#pageSize").on('change', function () {
  pageRequest.size = this.value;
  pageRequest.number = 0;
  viewMovies()
});

$("#pageSortField").on('change', function () {
  pageRequest.field = this.value;
  pageRequest.number = 0;
  viewMovies()
});

$("#pageSortOrder").on('change', function () {
  pageRequest.order = this.value;
  pageRequest.number = 0;
  viewMovies()
});

function viewMovies() {
  $("#pageNumber").text("***");
  $("#movie_list").children().remove();
  callGetMovies(
    (moviesPage) => {
      drawMovies(moviesPage);
      $("#pageNumber").text(pageRequest.number);
    },
    pageRequest);
}

function drawMovies(moviesPage) {
  moviesPage.content.forEach((movie) =>
    drawMovie(movie)

  )
}

function drawMovie(currentMovie) {
  $("#movie_list").append(moviesItemTemplate.format(currentMovie.id, currentMovie.title));
}

function deleteMovie(id) {
  callDeleteMovie(id, () => viewMovies())
}
function showEditMovieForm(id) {
  callGetMovie(id, (movie) => {
    $("#id_input1").val(id);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
  })
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

function cancelEditingMovie() {
  $("#id_input1,#title_input1,#description_input1").val(null);
}

function showEditMovieForm(id) {
  callGetMovie(id, (movie) => {
    $("#id_input1").val(id);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
  })
}

function logOut() {
  callLogOut(() => window.location.href = '/authorization/authorization.html')
}

function goToNextPage() {
  pageRequest.number += 1;
  $("#pageNumber").text(pageRequest.number);
  viewMovies()
}
function goToPreviousPage() {
  if (pageRequest.number > 0) {
    pageRequest.number -= 1;
    $("#pageNumber").text(pageRequest.number);
    viewMovies()
  }

}
viewMovies();