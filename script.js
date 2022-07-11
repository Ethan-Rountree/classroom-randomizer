var rawNames;
var students = [];
var groups = [];
var hat = [];

//Get inputed students names, format into an array, shuffle names and put them in the hat
function addStudents(){
  students = [];
  rawNames = $('#namesInput').val();
  if(rawNames){
    rawNames = rawNames.replace(/\s/g, '');
    students = rawNames.split(',');
    students = shuffleArray(students);
    hat = [...students];
    $('#functions').show();
    $('.intro').hide();
  }else{
    $('#namesHelp').html("Please enter some students(Name1, Name2, Name3, etc...).");
  }

}

//Return a random student and remove them from the hat. If hat is empty add everybody and draw again
function drawFromHat(){
  if(hat.length != 0){
    $('#output').html("<h4 class='p-3'>"+hat.pop()+"</h4>");
    $('#output').show();
  } else {
    if(students.length != 0){
      students = shuffleArray(students);
      hat = [...students];
      drawFromHat();
    } else {
      $('#hatHelp').html("You must add students before drawing from the hat.");
    }
  }
}

//check for valid input and call createGroups()
function validateGroups(){
  var groupCount = $('#groupCountInput').val();
  if(groupCount){
    if (students.length != 0) {
      if(groupCount <= (students.length / 2)){
        createGroups(groupCount);
      } else{
        $('#groupsHelp').html("Enter a smaller number. There should be at least two students per group.");
      }
    } else{
      $('#groupsHelp').html("You must add students before creating groups.");
    }
  } else{
    $('#groupsHelp').html("You must enter a number before creating groups.");
  }
}

//distribute students as evenly as possible into groups by 2d array of groups and students
function createGroups(groupCount){
  var curGroup;
  groups = [];
  for (var i = 0; i < groupCount; i++){
    groups.push([]);
  }
  students = shuffleArray(students);
  for (var i = 0; i < students.length; i++) {
    curGroup = i % groupCount;
    groups[curGroup].push(students[i]);
  }
  $('#output').html(displayGroups());
  $('#output').show();
}

//loop through 2d array to generate list html for groups
function displayGroups(){
  var htmlOutput = "";
  var curStudent = "";
  for(var g = 0; g < groups.length; g++){
    htmlOutput = htmlOutput.concat("<div class='group'><h4>Group " + (g+1)+ "</h4><ul class='list-group'>");
    for(var s = 0; s < groups[g].length; s++){
      curStudent = groups[g][s];
      htmlOutput = htmlOutput.concat("<li class='list-group-item'>",curStudent,"</li>");
    }
    htmlOutput = htmlOutput.concat("</ul></div>");
  }
  return htmlOutput;
}

//Durstenfeld shuffle algorithm --- Laurens Holst on stack overflow
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
