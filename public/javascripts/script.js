window.onload = function(){

  const remover = document.getElementsByClassName("remover");
  const modal = document.getElementById("modal");
  const upload = document.getElementById("upload");

  let enabled = true;

  document.addEventListener("click", function(e){

    if(e.target.className == "remover"){
        e.target.parentNode.remove();
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/delete/${e.target.dataset.remove}`, true);
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
        modal.querySelector("div img").setAttribute("src", e.target.src);
        modal.classList.toggle("hidden");
    }
  });

// модальное окно

    modal.addEventListener("click",function(){
		modal.classList.toggle("hidden");
	});

	modal.querySelector("div > img").addEventListener("click",function(e){
	  e.stopPropagation();
	}, true);

	upload.addEventListener("submit", function(e){
	  	e.preventDefault();
		if(enabled){
		 upload.submit();
		 enabled = false;
		}
	});

}