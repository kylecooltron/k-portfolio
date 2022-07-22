let scroll_Y = 0;

// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  scroll_Y = window.scrollY;

  const coding_backtext = document.getElementById("sect-coding-backtext");
  const graphics_backtext = document.getElementById("sect-graphics-backtext");
  
  if(coding_backtext){
    if(scroll_Y > 1000){
      coding_backtext.style.display = "none";
    }else{
      coding_backtext.style.display = "block";
    }
  }

  if(graphics_backtext){
    if(scroll_Y > 1200){
      graphics_backtext.style.display = "none";
    }else{
      graphics_backtext.style.display = "block";
    }
  }



  document.documentElement.style.setProperty('--scroll-y', scroll_Y);

}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();