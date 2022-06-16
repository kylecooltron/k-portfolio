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
var exm2_canvas = document.getElementById("exm2Canvas");
var exm2_context = exm2_canvas.getContext("2d");

var pstep; //used to run painstep on interval

//init drawing variables
var center_x = exm2_canvas.width/2;
var center_y = exm2_canvas.height/2;
var radToDeg = Math.PI / 180;
var color = "#F2B3E1";

//init other
var p_oval = 0.5;
var p_spin_amount = 0.2;
var p_spiral_factor = 0.01;

//init dynamic vars
var p_angle = 0;
var p_dist = 250;
var p_spin = 0;
var last_x, last_y;

// - - - - - - - - - - - - - - functions

function fillCanvas(){
    exm2_context.beginPath();
    exm2_context.rect(0, 0, exm2_canvas.width, exm2_canvas.height);
    exm2_context.fillStyle = "#11232C";
    exm2_context.fill();
}


function find_color(x,y){

  var tlrgb = [255, 28, 194];
  var trrgb = [3, 221, 255];
  var blrgb = [136, 250, 27];
  var brrgb = [252, 226, 50];
  
  var x_percent = x / exm2_canvas.width;
  var y_percent = y / exm2_canvas.height;
  
  var top_edge_color = interpolate_color(tlrgb, trrgb, x_percent);
  var bottom_edge_color = interpolate_color(blrgb, brrgb, x_percent);
  
  var new_color = interpolate_color(top_edge_color,bottom_edge_color, y_percent);
  
  return rgbToHex(new_color[0],new_color[1],new_color[2]);
}


function interpolate_color(startcolor, endcolor, percent){
    var rgb = [];
    rgb[0] = Math.round(startcolor[0] + (endcolor[0] - startcolor[0]) * percent);
    rgb[1] = Math.round(startcolor[1] + (endcolor[1] - startcolor[1]) * percent);
    rgb[2] = Math.round(startcolor[2] + (endcolor[2] - startcolor[2]) * percent);
    return rgb;
}


function componentToHex(c) {
  var hex = c.toString(16);
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
var newx = x + dist * Math.cos(dir * radToDeg );
var newy = y + dist * Math.sin(dir * radToDeg);
return [newx, newy];
}
function point_distance(x1,y1, x2,y2){
return Math.hypot(x2-x1, y2-y1);
}
function point_direction(x1,y1, x2,y2){
return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function sliderChange(sliderID){
var val = document.getElementById(sliderID).value;
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
  var temp_dist = point_distance(center_x,center_y,x,y);
  var temp_dir = point_direction(center_x,center_y,x,y);
  var newPosition = projectPosition(center_x,center_y, temp_dir + p_spin, temp_dist);
  var returnx = newPosition[0];
  var returny = newPosition[1];
  return [returnx, returny];
}

function paintStep(){
  var newPosition = projectPosition(center_x,center_y, p_angle, p_dist);
  var spinNewPosition = spinPosition(newPosition[0], squish(newPosition[1]));

  var spinLastPosition = spinPosition(last_x,squish(last_y));

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
  pstep = window.setInterval(drawStep,10);
}

function stopPainting(){
  window.clearInterval(pstep);
  bake();
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