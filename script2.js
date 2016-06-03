var scroll = document.getElementById("scroll");
var select = document.getElementById("list");
var clear = document.getElementById("clear");
var submit = document.getElementById("submit");
var collection = [];

document.addEventListener("DOMContentLoaded", function(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
      var array = JSON.parse(request.responseText).results;
      var list = [];
      for (var album in array){
        list.push(array[album]["cover_art"]);
        for (var el in list){
          var img = document.createElement("img");
          img.src = "images/" + list[el];
          if (list[el] === array[album]["cover_art"]){
            img.setAttribute("id", array[album]["id"]);
          }
        }
        scroll.appendChild(img);
      }
      var images = document.getElementsByTagName("img");
      for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function(event){
            var target = event.target;
            for (var al in array){
              if ((array[al]["id"] == target.id) && (collection.indexOf(array[al].title) == -1)){
                var newl = document.createElement("h5");
                newl.innerHTML = array[al].artist + ": " + array[al].title;
                select.appendChild(newl);
                collection.push(array[al].title);
              }
            }
        });
      }
    }
  };
  request.open("GET", "https://lit-fortress-6467.herokuapp.com/object");
  request.send();
});

clear.addEventListener("click", function(){
  select.innerHTML = "";
  collection = [];
});

submit.addEventListener("click", function(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
        console.log(request.responseText);
    }
  };
    request.open("POST", "https://lit-fortress-6467.herokuapp.com/post");
    request.send(collection);
});
