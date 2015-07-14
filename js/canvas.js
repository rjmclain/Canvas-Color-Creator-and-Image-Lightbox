//When user interacts cause changes appropriately
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});
  
//When "New Color" is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
//Draw Lines
}).mousemove(function(e){
  if(mouseDown) {
       if(lastEvent.offsetX == undefined){ // this works for Firefox
        lastEventposX = lastEvent.pageX-$canvas.offset().left;
        lastEventposY = lastEvent.pageY-$canvas.offset().top;
      } else {
        lastEventposX = lastEvent.offsetX;
        lastEventposY = lastEvent.offsetY;
      } 

      if(e.offsetX == undefined){ // this works for Firefox
        xpos = e.pageX-$canvas.offset().left;
        ypos = e.pageY-$canvas.offset().top;
      } else {
        xpos = e.offsetX;
        ypos = e.offsetY;
      } 

    context.beginPath();
    context.moveTo(lastEventposX, lastEventposY);
    context.lineTo(xpos, ypos);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});




  







