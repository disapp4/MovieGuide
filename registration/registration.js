callLogOut(()=> {});
function postUsers() {
    let username = $("#username").val();
    let password = $("#password").val();
  
    callPostUsers({username, password},()=>  window.location.href = "../index.html" , ()=> alert("error"))

}