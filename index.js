let film_list = [
  { id: 1, title: 'Фильм 1', description: 'Описание 1', },
  { id: 2, title: 'Фильм 2', description: 'Описание 2', },
  { id: 3, title: 'Фильм 3', description: 'Описание 3', },
  { id: 4, title: 'Фильм 4', description: 'Описание 4', },
  { id: 5, title: 'Фильм 5', description: 'Описание 5', }];

function ViewFilms() {
  for (let i = 0; i < film_list.length; i++) {
    console.log('hjh')
    document.getElementById("film_list")
      .insertAdjacentHTML("beforeend",
        `<div class="film">
        <p> ` + film_list[i].title + `</p> 
        </div > `);
  }

}
ViewFilms();