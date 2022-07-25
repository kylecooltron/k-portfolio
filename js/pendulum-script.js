/* PENDULUM PROCEDURAL ART GENERATOR CODE:*/
/* 
Interactive Exampe 2 - Home page 
Created by: Kyle Coulon 2021
*
*
*
*
*/

//init variables
const exm2_canvas = document.getElementById("exm2Canvas");
const exm2_context = exm2_canvas.getContext("2d");
let pstep; //used to run painstep on interval

//init drawing variables
let center_x = exm2_canvas.width/2;
let center_y = exm2_canvas.height/2;
const radToDeg = Math.PI / 180;
let color = "#F2B3E1";

//init other
let p_oval = 0.5;
let p_spin_amount = 0.2;
let p_spiral_factor = 0.01;

//init dynamic vars
let p_angle = 0;
let p_dist = 250;
let p_spin = 0;
let last_x, last_y;

// - - - - - - - - - - - - - - functions

function fillCanvas(){
    exm2_context.beginPath();
    exm2_context.rect(0, 0, exm2_canvas.width, exm2_canvas.height);
    exm2_context.fillStyle = "#11232C";
    exm2_context.fill();
}


function find_color(x,y){

  // define colors for the four corners
  const tlrgb = [255, 28, 194];
  const trrgb = [3, 221, 255];
  const blrgb = [136, 250, 27];
  const brrgb = [252, 226, 50];
  
  let x_percent = x / exm2_canvas.width;
  let y_percent = y / exm2_canvas.height;
  
  let top_edge_color = interpolate_color(tlrgb, trrgb, x_percent);
  let bottom_edge_color = interpolate_color(blrgb, brrgb, x_percent);
  
  let new_color = interpolate_color(top_edge_color,bottom_edge_color, y_percent);
  
  return rgbToHex(new_color[0],new_color[1],new_color[2]);
}


function interpolate_color(startcolor, endcolor, percent){
    let rgb = [];
    rgb[0] = Math.round(startcolor[0] + (endcolor[0] - startcolor[0]) * percent);
    rgb[1] = Math.round(startcolor[1] + (endcolor[1] - startcolor[1]) * percent);
    rgb[2] = Math.round(startcolor[2] + (endcolor[2] - startcolor[2]) * percent);
    return rgb;
}


function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//clear canvas on startup
function startUp(){ fillCanvas(); }
window.onload = startUp;

function resetPaintVariables(){
//reset to default values
p_dist = 250;
p_angle = 0;
last_x = undefined;
last_y = undefined;
p_spin = 0;
}

function squish(y){
return center_y + ((y - center_y) * p_oval);
}
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
function projectPosition(x,y, dir, dist){
let newx = x + dist * Math.cos(dir * radToDeg );
let newy = y + dist * Math.sin(dir * radToDeg);
return [newx, newy];
}
function point_distance(x1,y1, x2,y2){
return Math.hypot(x2-x1, y2-y1);
}
function point_direction(x1,y1, x2,y2){
return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function sliderChange(sliderID){
  let val = document.getElementById(sliderID).value;
switch(sliderID) {
  case "spiral":
	p_spiral_factor = val * 0.0005;
    break;
  case "oval":
  	p_oval = (100-val)*0.01;
    break;
  case "spin":
  	p_spin_amount = val*0.01;
    break;
}
}

function spinPosition(x,y){
  let temp_dist = point_distance(center_x,center_y,x,y);
  let temp_dir = point_direction(center_x,center_y,x,y);
  let newPosition = projectPosition(center_x,center_y, temp_dir + p_spin, temp_dist);
  let returnx = newPosition[0];
  let returny = newPosition[1];
  return [returnx, returny];
}

function paintStep(){
  let newPosition = projectPosition(center_x,center_y, p_angle, p_dist);
  let spinNewPosition = spinPosition(newPosition[0], squish(newPosition[1]));

  let spinLastPosition = spinPosition(last_x,squish(last_y));

  if(last_x == undefined || last_y == undefined){
    last_x = spinNewPosition[0]; last_y = spinNewPosition[1];
  }

  exm2_context.moveTo(last_x,last_y);
  exm2_context.lineTo(spinNewPosition[0], spinNewPosition[1]);

  exm2_context.strokeStyle = find_color(spinNewPosition[0], spinNewPosition[1]);
  exm2_context.stroke();

  //update
  p_angle += 1;
  p_dist -= p_spiral_factor;
  last_x = spinNewPosition[0]; last_y = spinNewPosition[1];
  p_spin += p_spin_amount;

  if(p_dist <= 1){ //end when center is reached
    window.clearInterval(pstep);
    bake();
    resetPaintVariables();
  }

}

function drawStep(){
  for (let i = 0; i < 10; i++) {
    paintStep();
    bake();
    if(p_dist <= 2){ break; window.clearInterval(pstep); }
  }
}


function startPainting(){
  resetPainting();
  stopPainting();

  pstep = window.setInterval(drawStep,10);
  document.getElementById("stopbutton").style.display = "inline-block";
}

function stopPainting(){
  window.clearInterval(pstep);
  bake();
  stopbutton.style.display = "none";
}

function resetPainting(){
  exm2_context.clearRect(0, 0, exm2_canvas.width, exm2_canvas.height);
  bake();
  resetPaintVariables();
  fillCanvas();
}

function bake(){
    exm2_context.beginPath();
}


// Function to generate random number 
function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
} 

let random_list = [[84,29,25],[98,16,10],[84,34,66],[23,-32,36],[79,23,26],[83,-25,28],[83,-21,23],[83,-2,37],[83,-14,20],[77,14,23],[95,41,28],[59,-28,19],[49,24,16],[68,4,34],[95,-4,77],[95,-25,46],[59,-40,39],[45,-37,50],[91,-14,19],[66,-22,24]]
function randomizeParams(){

  let slider_oval = document.getElementById("oval");
  let slider_spin = document.getElementById("spin");
  let slider_spiral = document.getElementById("spiral");

  

  if(Math.random() < 0.8){

    let rand_index = Math.round(randomNumber(0,random_list.length-1));

    slider_oval.value = random_list[rand_index][0];
    slider_spin.value = random_list[rand_index][1];
    slider_spiral.value  = random_list[rand_index][2];

  }else{

    slider_spin.value = randomNumber(-50,50);

    if(Math.random() > 0.8){
      slider_oval.value = randomNumber(1,100);
      slider_spiral.value = randomNumber(1,130);
    }else{
      slider_oval.value = randomNumber(10,100);
      if(Math.random() > 0.64){
      slider_spiral.value = randomNumber(1,80);
      }else{
        slider_spiral.value = randomNumber(10,40);
      }
    }
  }

  document.getElementById("ovalo").value = slider_oval.value;
  document.getElementById("spino").value = slider_spin.value;
  document.getElementById("spiralo").value = slider_spiral.value;

  sliderChange("oval");
  sliderChange("spin");
  sliderChange("spiral");
  
  stopPainting();
}