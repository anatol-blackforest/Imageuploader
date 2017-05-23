let remover = document.getElementsByClassName("remover");

document.addEventListener("click", function(e){
  if(e.target.className == "remover"){
     console.log(e.target.dataset.remove);

      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/?remove=${e.target.dataset.remove}`, true);
      xhr.send();
      xhr.onreadystatechange = function() { 
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          console.log(xhr.status + ': ' + xhr.statusText);
        } else {
          console.log("GO!");
        }
      }

  }
})