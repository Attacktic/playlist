var images = document.getElementById("images");

window.addEventListener("load", function(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status < 400){
      var array = JSON.parse(request.responseText).tracks.items;
      var list = [];
      var check = [];
      for (var m in array){
        list.push(array[m].album.images[1].url);
      }
      for (var i = 0; i < 12; i++) {
        var element = list[Math.floor(Math.random()*list.length)];
        if ((check.indexOf(element) == -1) && (check.length < 3)){
          check.push(element);
          var img = document.createElement("img");
          img.src = element;
          images.appendChild(img);
        }
      }
    }
  };
  request.open("GET", 'https://api.spotify.com/v1/search?q='+ randomword +'&type=track');
  request.send();
})
