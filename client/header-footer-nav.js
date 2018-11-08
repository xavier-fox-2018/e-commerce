$(function(){
  $("#header").load("header.html"); 
  $("#footer").load("footer.html"); 
});
$("button[aria-label='Close']").click(event=> $(".navbar").toggle())

$("#signOut").click(function (event) {
  signOut();
  window.location.replace('http://localhost:8080/signIn.html');
})
function signOut() {
  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id:'803894408351-8uclep7lb8052h78vhoofq8vs77ahub5.apps.googleusercontent.com'
    });
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
      console.log('User signed out.');
    })
    .catch( err => console.log(err))
  });
  
}