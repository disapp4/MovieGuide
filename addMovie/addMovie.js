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
        () => {
          $("#title_input,#description_input").val(null);
          window.location.href = "../index.html"
        });
    }
  }