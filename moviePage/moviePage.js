const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');

function informationAboutMovie(id) {
    callGetMovie(id, (movie) => {
        $("#id_input1").val(id);
        $("#title_input1").val(movie.title);
        $("#description_input1").val(movie.description)
      })
}


informationAboutMovie(movieId);