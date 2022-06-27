

function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    callLogIn(username, password, ()=> {window.location.href='/'} , ()=> alert("Неправильный логин или пароль"))

}