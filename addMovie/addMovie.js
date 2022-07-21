$("#image_to_save").on('change', putMoviePoster);
let posterFile;
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
          callPutMoviePoster(posterFile, movieId, () => window.location.href = "/index.html")
        }
        else {
          window.location.href = "/index.html"
        }

      });
  }
}



function putMoviePoster(event) {
  posterFile = event.target.files[0];
}