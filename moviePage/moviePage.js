const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');
let roles = [];
callGetCurrentUser((user) => {
  roles = user.roles;})

function getMovie() {
  callGetMovie(movieId, (movie) => {
    if (roles.includes("ROLE_ADMIN")) {
      $("#edit").css("display", "block")
    }
    $("#id_input1").val(movieId);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
    showPoster(movie);
    showImages(movie);
  })
}

function showPoster(movie) {
  let posterId = movie.posterId;
  if (posterId !== null) {
    $("#poster").attr("src", "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/poster");
  }
  else {
    $("#poster").attr("src", "../no_poster.jpg");
  }
}

function showImages(movie) {
  for (let i = 0; i < movie.imageIds.length; i++) {
    let one = `<img class="image" src="https://movie-guide-backend.ntrubkin.ru/images/`;
    let two = movie.imageIds[i];
    let three = `">`
    let imageHTML = one + two + three;
    $("#images").append(imageHTML);
  }

}

getMovie();

function goToEdit() {
  window.location.href = "../changeMovie/changeMovie.html?movieId=" + movieId;

}
