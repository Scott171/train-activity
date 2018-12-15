
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDt05OGniTn6lyMGte9klaoW54h2GH9plM",
    authDomain: "train-activity-57fb1.firebaseapp.com",
    databaseURL: "https://train-activity-57fb1.firebaseio.com",
    projectId: "train-activity-57fb1",
    storageBucket: "train-activity-57fb1.appspot.com",
    messagingSenderId: "54290586076"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();


  $("#add-train").on("click", function(event) {
    event.preventDefault();
  

  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnFirst =$("#first-time-input").val().trim();
  var trnFrequency = $("#frequency-input").val().trim();


  var newTrain = {
    name: trnName,
    destination: trnDestination,
    first: trnFirst,
    frequency: trnFrequency
  };

  database.ref().push(newTrain);




        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.first);
        console.log(newTrain.frequency);

alert("Train Schedule has been added");
$("#train-name-input").val("")
    $("#destination-input").val("");
  $("#first-time-input").val("");
   $("#frequency-input").val("");

});
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnFirst = childSnapshot.val().first;
    var trnFrequency = childSnapshot.val().frequency;

    var currentTime = moment().format("hh:mm A");
console.log(currentTime)
    var trnFirstAdjust = moment(trnFirst, "hh:mm A")
console.log(trnFirstAdjust)
var differenceTime = moment().diff(moment(trnFirstAdjust), "minutes");

console.log(differenceTime);

var remainder = differenceTime % trnFrequency;

console.log(remainder);

var minutesAway = trnFrequency - remainder;
console.log(minutesAway);

var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");

console.log(nextTrain);
    
  var newRow = $("<tr>").append(
    $("<td>").text(trnName),
    $("<td>").text(trnDestination),
    $("<td>").text(trnFrequency),
    $("<td>").text(nextTrain),
   $("<td>").text(minutesAway),

   
   

    
  );

  $("#train-table > tbody").append(newRow);
  $("#current-time").append(currentTime);
});