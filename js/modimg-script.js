// Get the modal
const modal = document.querySelector("#myModal");
const modalTarget = document.querySelector("#myModalContainer");
// Get the image and insert it inside the modal - use its "alt" text as a caption
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("modal-caption");
const gitHubLink = document.getElementById("modal-git-link");



document.addEventListener("click", (e) => {
  const elem = e.target;
  const withinBoundaries = e.composedPath().includes(modalTarget)

  if (modal.style.display == "block" && !withinBoundaries) {
    modal.style.display = "none";
  }

  if (elem.classList.contains("modalImg")) {
    modal.style.display = "block";
    modalImg.src = elem.dataset.biggerSrc || elem.src;
    captionText.innerHTML = elem.alt;

    gitHubLink.href = elem.dataset.gitLink || "#";
    gitHubLink.innerHTML = elem.dataset.gitLink || "";
    gitHubLink.target = "_blank";
  }

})


document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
   //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
      if (isNotCombinedKey) {
        if (modal.style.display == "block"){
          modal.style.display = "none";
        }
      }
  }
});





// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}