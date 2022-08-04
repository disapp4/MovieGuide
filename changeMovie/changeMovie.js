
const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');
$("#image_to_save").on('change', putMoviePoster);
$("#images_to_save").on('change', postMovieImages);
let newPoster;
let newImages = [];
var reader = new FileReader();

function showEditMovieForm(id) {
  callGetMovie(id, (movie) => {
    $("#id_input1").val(id);
    $("#title_input1").val(movie.title);
    $("#description_input1").val(movie.description)
    showPoster(movie);
    showImages(movie);
  })
}

function changeMovieThroughForm() {
  let titleValue = $("#title_input1").val();
  let descriptionValue = $("#description_input1").val();
  let idValue = $("#id_input1").val();
  let movie = { id: idValue, title: titleValue, description: descriptionValue };
  callPutMoviePoster(newPoster, movieId);
  for (let i = 0; i < newImages.length; i++) {
    callPostMovieImage(newImages[i], movieId)
  }
  callPutMovie(movie, () => {

    $("#id_input1,#title_input1,#description_input1").val(null);
    window.location.href = "../index.html"
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
function showPosterPreview() {
  if (newPoster != null) {
    reader.onload = function () {
      $("#poster").attr("src", reader.result);

    }
    reader.readAsDataURL(newPoster);
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

function showImagesPreview() {
  if (newImages != null) {
    reader.onload = function () {
      $("#images1").prop("src", reader.result);
    }
    reader.readAsDataURL(newImages[newImages.length - 1]);
  }
}

function putMoviePoster(event) {
  newPoster = event.target.files[0];
  showPosterPreview();

}

function postMovieImages(event) {
  newImages = event.target.files;
  showImagesPreview();
}



showEditMovieForm(movieId);

/*function deletePoster(movieId) {
  callDeletePoster(movieId, () => window.location.href = "../index.html")
}

$("#poster").click(function(movieId){callDeletePoster(movieId,)})*/
