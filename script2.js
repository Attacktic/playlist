var scroll = document.getElementById("scroll")
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
    }
  };
  request.open("GET", "https://lit-fortress-6467.herokuapp.com/object");
  request.send();
});
