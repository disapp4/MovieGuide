let film_list = [];


function ViewFilms() {
  $("#film_list").children().remove();
  for (let i = 0; i < film_list.length; i++) {

    let divClass = `<div class="film">
    <p> ` + film_list[i].title +`</p> </div > `;
    
    $("#film_list").append(divClass);
  }
}

function addMovieThroughForm() {
  let idValue = $("#id_input").val();
  let titleValue = $("#title_input").val();
  let descriptionValue = $("#description_input").val();

  let objMovie = { id: Number(idValue), title: titleValue, decription: descriptionValue };
  film_list.push(objMovie);

  $("#id_input,#title_input,#description_input").val(null);
  ViewFilms();
}
ViewFilms();