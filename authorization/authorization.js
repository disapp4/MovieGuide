

function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    callLogIn(username, password, ()=> {} , ()=> alert("Неправильный логин или пароль"))

}