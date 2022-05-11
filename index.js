let movie_list = [];


function ViewMovies() {
  $("#movie_list").children().remove();
  for (let i = 0; i < movie_list.length; i++) {

    let divClass = ` <div class="movie">
    <p class="movie_title">`  + movie_list[i].title + `</p> 
    <button type="button" onclick="deleteMovie(`+ movie_list[i].id + `)" class="movie_delete_button"> X </button>
</div >`;

    $("#movie_list").append(divClass);
  }
}


function addMovieThroughForm() {
  let idValue = $("#id_input").val();
  let titleValue = $("#title_input").val();
  let descriptionValue = $("#description_input").val();

  let objMovie = { id: Number(idValue), title: titleValue, decription: descriptionValue };
  movie_list.push(objMovie);

  $("#id_input,#title_input,#description_input").val(null);
  ViewMovies();
}


function deleteMovie(id) {
  movie_list = movie_list.filter(function (movie) {
    return id != movie.id
  })
  console.log(movie_list);
  ViewMovies();
}

ViewMovies()
