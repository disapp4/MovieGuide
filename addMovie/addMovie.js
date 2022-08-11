$("#image_to_save").on('change', putMoviePoster);
$("#images_to_save").on('change', putMovieImages);
let imageFiles = [];
let posterFile;
var reader = new FileReader();


function addMovieThroughForm() {
  let titleValue = $("#title_input").val();
  let descriptionValue = $("#description_input").val();

  if (titleValue == null || titleValue == "" || titleValue == undefined) {
    alert("ошибка заполнения формы")
  }
  else {
    callPostMovie({
      title: titleValue,
      description: descriptionValue
    },
      (response) => {
        let movieId = response.id;
        $("#title_input,#description_input").val(null);
        if (posterFile != null) {
          callPutMoviePoster(posterFile, movieId)
        }
        for (let i = 0; i < imageFiles.length; i++) {
          callPostMovieImage(imageFiles[i], movieId)
        }
        window.location.href = "../index.html"
      });

  }
}


function putMoviePoster(event) {
  let selectedFile = event.target.files[0];
  posterFile = selectedFile;
  showPosterPreview();
}

function putMovieImages(event) {
  let selectedFiles = event.target.files;
  imageFiles.push(...selectedFiles);
  showImagesPreview();
}

function showPosterPreview() {
  if (posterFile != null) {
    reader.onload = function () {
      $("#poster").attr("src", reader.result);
    }
    reader.readAsDataURL(posterFile);

  }
}
function showImagesPreview() {
  if (imageFiles != null) {
    reader.onload = function () {
      $("#images").attr("src", reader.result);
    }
    reader.readAsDataURL(imageFiles[imageFiles.length - 1]);
  }
}
