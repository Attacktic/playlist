var scroll = document.getElementById("scroll");
var select = document.getElementById("list");
var clear = document.getElementById("clear");
var submit = document.getElementById("submit");
var collection = [];
var search = document.getElementById("search");
var input = document.getElementById("input");

search.addEventListener("click", function(){
  scroll.innerHTML = "";
  var list = [];
  var check = [];
  var opt = input.value;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
      var array = JSON.parse(request.responseText).tracks.items;
      for (var album in array){
        var element = array[album].album.images[1].url;
        if (list.indexOf(element) == -1){
        list.push(element);
        }
        for (var el in list){
          if (check.indexOf(list[el]) == -1){
          var img = document.createElement("img");
          img.src = list[el];
          check.push(list[el]);
          if (list[el] === array[album].album.images[1].url){
            img.setAttribute("id", array[album].album.id);
            }
          }
        }
        scroll.appendChild(img);
        scroll.style.width = check.length*100 + "px";
      }
      var images = document.getElementsByTagName("img");
      for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function(event){
            var target = event.target;
            for (var al in array){
              if ((array[al].album.id == target.id) && (collection.indexOf(array[al].album.name) == -1)){
                var newl = document.createElement("h5");
                newl.innerHTML = array[al].artists[0].name+": "+ array[al].album.name;
                select.appendChild(newl);
                collection.push(array[al].album.name);
              }
            }
        });
      }
    }
  };
  request.open("GET", 'https://api.spotify.com/v1/search?q='+ opt +'&type=track');
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
