$(document).ready(function(){
  
  var key = []; //Creates array in which key inputs will be
  var code = '38,38,40,40,37,39,37,39,66,65,13'; //Variable that is all the key strokes (including enter which is 13)
  
  $(document).keydown(function(e){ //Call document again to say 'when key is pushed, do this.'
    key.push(e.keyCode);
    if (key.toString().indexOf(code) >=0){ //Javascript method that changes an array to a string for use when buttons are pushed
      
      //where the outcome will actually happen
      
       //The code below allows you to have your function run on every push of enter. Just wrap your desired function in it and press away.
    
  /*  $(document).keydown(function(enter) {
    	if (enter.which == 13) {
    		
    	};
    }); */
      
       var count = 0;
    var money = 0; 
  
setInterval (
  
  function() {
    
    $("body").css("background","#2ECC71");
    
  count += 0.6;
    
   $(".number").html("<h2>Alon Askal earned $" +count.toFixed(2)+ " since you've loaded this!</h2>");
  } ,1000);
     
      key = []; //Clear the array to be used again.
    }
    
  });
  
  $(".show").click(function()
      {
        $(".code").toggle();                     
      })
  
});