function postUsers() {
    let username = $("#username").val();
    let password = $("#password").val();
    callPostUsers(username,password,()=> {} , ()=> alert("Использованы недопустимые символы"))

}