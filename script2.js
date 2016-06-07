var scroll = document.getElementById("scroll");
var select = document.getElementById("list");
var clear = document.getElementById("clear");
var submit = document.getElementById("submit");
var collection = [];
var search = document.getElementById("search");
var input = document.getElementById("input");
var opt;

function getAlbums(opt, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status < 400){
    return callback(JSON.parse(request.responseText).tracks.items);
    }
  }
  request.open("GET", 'https://api.spotify.com/v1/search?q='+ opt +'&type=track');
  request.send();
}

function albumExistsAlready(list, imageUrl) {
  return list.indexOf(imageUrl) == -1
}

function start(){
  scroll.innerHTML = "";
  var list = [];
  var check = [];
  opt = input.value;
  if(opt === ""){
    opt = randomword;
  }

  getAlbums(opt, function (albums) {
    for (var album in albums){
      var imageUrl = albums[album].album.images[1].url;
      list.push({
        url: imageUrl,
        id: albums[album].album.id
      })
      for (var i in list){
        var img = document.createElement("img");
        img.src = list[i].url;
        img.id = list[i].id;
      }
      scroll.appendChild(img);
      scroll.style.width = list.length*100 + "px";
    }
  });

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

start();

search.addEventListener("click", start);

clear.addEventListener("click", function(){
  select.innerHTML = "";
  collection = [];
});

submit.addEventListener("click", function(){
  var request = new XMLHttpRequest();
  request.open("POST", "https://lit-fortress-6467.herokuapp.com/post");
  request.send(collection);
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
        console.log(request.responseText);
    }
  };
});
