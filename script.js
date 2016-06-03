var images = document.getElementById("images");
document.addEventListener("DOMContentLoaded", function(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
      var array = JSON.parse(request.responseText).results;
      var list = [];
      for (var album in array){
        list.push(array[album]["cover_art"]);
      }
      for (var i = 0; i < 3; i++) {
        var element = list[Math.floor(Math.random()*list.length)];
        var img = document.createElement("img");
        img.src = "images/" + element;
        images.appendChild(img);
      }
    }
  };
  request.open("GET", "https://lit-fortress-6467.herokuapp.com/object");
  request.send();
});
