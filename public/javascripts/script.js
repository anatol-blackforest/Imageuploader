window.onload = function(){

  const remover = document.getElementsByClassName("remover");
  const modal = document.getElementById("modal");

  console.log(document.querySelector("div"));

  document.addEventListener("click", function(e){
    if(e.target.className == "remover"){
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
    }else if(e.target.className == "image"){
        modal.classList.toggle("hidden");
        modal.querySelector("div img").setAttribute("src", e.target.src);
    }
  });

// модальное окно

    modal.addEventListener("click",function(){
		modal.classList.toggle("hidden");
	});

	modal.querySelector("div > img").addEventListener("click",function(e){
	  e.stopPropagation();
	}, true);

}
