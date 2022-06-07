/*  PORTFOLIO PROJECT SCRIPT  */


  /* HAMBURGER MENU */
  let hambutton = document.querySelector('.ham');
  const mainnav = document.querySelector('.navigation')
  //add functionality for responsive hamburger menu
  hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);

  /* FOOTER DATE and LAST MODIFIED */
  const now = new Date();
  // update the text in footer to be the current year
  document.querySelector('#year').textContent = new Date().getFullYear();
  //update the last modified
  document.getElementById("modified").innerHTML = document.lastModified;


