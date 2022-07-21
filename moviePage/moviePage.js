const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');


  function getMovie() {
  callGetMovie(movieId, (movie) => {
    $("#id_input1").val(movieId);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
    setPoster(movie);
  })
}

function setPoster(movie){
  let posterId = movie.posterId;
    if (posterId !== null) {
      $("#poster").attr("src", "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/poster");
    }
    else {
      $("#poster").attr("src", "../no_poster.jpg");
    }
}

getMovie();
