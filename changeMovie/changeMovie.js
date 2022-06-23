
const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');

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
    
    $("#id_input1,#title_input1,#description_input1").val(null);
    window.location.href = "../index.html"
  })
}



showEditMovieForm(movieId)
