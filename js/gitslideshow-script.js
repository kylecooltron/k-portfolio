///control git repository slide show


slide_list = document.querySelectorAll('.git-slide')

const slide_right_button = document.querySelector('#git-rightbutton');
const slide_left_button = document.querySelector('#git-leftbutton');
const slideshowbox = document.querySelector('.slideshow-box');
const slidebox_xstart = -208;

slidebox_x = -906;
slidebox_x_smooth = slidebox_x;

myInterval = 0;

function set_slidebox_x(){

  if(Math.abs(slidebox_x_smooth - slidebox_x) > 2){
    slidebox_x_smooth -= (slidebox_x_smooth - slidebox_x) * 0.05;
  }else{
    slidebox_x_smooth = slidebox_x;
    clearInterval(myInterval);
  }

  slideshowbox.style.left = "calc(50% + " + slidebox_x_smooth + "px)";
}


set_slidebox_x();




function mod(n, m) {
  return ((n % m) + m) % m;
}

function move_slides(direction){





  var arrayLength = slide_list.length;
  for (var i = 0; i < arrayLength; i++) {

    slide = slide_list[i];

    if(slide.classList.contains("active")){

      slide.classList.remove("active");

      // change slide before current to inactive
        before = slide_list[mod(i-direction,arrayLength)];
        before.classList.remove("semiactive");

      // change active slide from current to next
      current = slide_list[i];
      current.classList.remove("active");

      if(mod(i+direction, arrayLength) == i+direction ){
      current.classList.add("semiactive");
      }

      next = slide_list[mod(i+direction, arrayLength)];
      next.classList.add("active");
      next.classList.remove("semiactive");

      // change the new next slide to semiactive
      if(mod(i+(direction*2), arrayLength) == i+(direction*2) || mod(i+direction, arrayLength) != i+direction ){
      afternext = slide_list[mod(i+(direction*2),arrayLength)];
      afternext.classList.add("semiactive");
      }
  

      var s_small = 225;
      var s_large = 256;

      // FIND A DIFFERENT WAY OF DOING THIS: - - - -
      if(direction > 0){
        if(i < arrayLength-1){
          if(i==0 || i == arrayLength-1){
            slidebox_x -= direction * s_large;
          }else{
            if( i <= 3){
              if( i <= 1){
              slidebox_x -= direction * 215;
              }else{
                if( i <= 2){
                slidebox_x -= direction * s_small;
                }else{
                  slidebox_x -= direction * 210; 
                }
              }
            }else{
              if(i >= arrayLength-2){
                slidebox_x -= direction * s_large;
              }else{
                slidebox_x -= direction * 210;
              }
            }
        }
        }else{
          slidebox_x = slidebox_xstart;
        }
      }
      if(direction < 0){
        if(i > 0){
          if(i==1 || i == arrayLength-1){
            slidebox_x -= direction * s_large;
          }else{
            if( i >= arrayLength-4){
              slidebox_x -= direction * 210;
            }else{
              if(i <= 2){
                slidebox_x -= direction * 215;
              }else{
                slidebox_x -= direction * s_small;
              }
            }
        }
        }else{
          slidebox_x = -1793;
        }
      }
      // - - - - - - - - - - - - - - BAD CODE ^

      set_slidebox_x();
      if(myInterval != 0){
      clearInterval(myInterval);
      }
      myInterval = setInterval(set_slidebox_x, 1);

      break;
    }

  }

}


//when the input button is clicked
slide_right_button.addEventListener('click', () => {
move_slides(1);
});
//when the input button is clicked
slide_left_button.addEventListener('click', () => {
  move_slides(-1);
});
