// Get the input elements
var participantType = document.getElementsByName("participantType");
var session = document.getElementsByName("session");
var from = document.getElementsByName("from")[0];
var to = document.getElementsByName("to")[0];
var cost = document.getElementById("cost");
var totalCost = document.getElementById("totalCost");

// Define the prices for each participant type and session
var presenterPrice = 150;
var audiencePrice = 100;
var sessionPrices = [100, 200, 300, 400];

// Define a function to calculate the number of days between two dates
function getDays(date1, date2) {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Define a function to calculate the cost of each session
function calculateSessionCost(index) {
  var sessionCost = document.getElementById("cost" + (index + 1));
  if (session[index].checked) {
    // Get the participant type price
    var participantPrice = 0;
    for (var i = 0; i < participantType.length; i++) {
      if (participantType[i].checked) {
        participantPrice = participantType[i].value == "presenter" ? presenterPrice : audiencePrice;
        break;
      }
    }
    // Get the session price
    var sessionPrice = sessionPrices[index];
    // Get the number of days
    var days = getDays(new Date(from.value), new Date(to.value));
    // Calculate the session cost
    var cost = participantPrice * sessionPrice * days;
    // Display the session cost
    sessionCost.innerHTML = cost;
  } else {
    // Reset the session cost
    sessionCost.innerHTML = 0;
  }
}

// Define a function to calculate the total cost of all sessions
function calculateTotalCost() {
  var total = 0;
  // Sum up the cost of each session
  for (var i = 0; i < session.length; i++) {
    total += parseInt(document.getElementById("cost" + (i + 1)).innerHTML);
  }
  // Apply the discount if applicable
  if (total > 1000) {
    total -= total * 0.15;
  }
  // Display the total cost
  totalCost.innerHTML = total + " (€)";
  // Prompt the confirmation message
  var confirm = window.confirm("Do you accept the calculated total cost for payment?");
  if (confirm) {
    // Alert the thank you message
    window.alert("Thank you for registering for the workshop!");
  } else {
    // Alert the application withdraw message
    window.alert("Sorry to hear that you are not interested in the workshop.");
  }
}

// Add event listeners to the input elements
for (var i = 0; i < participantType.length; i++) {
  participantType[i].addEventListener("change", function() {
    // Recalculate the cost of each session
    for (var j = 0; j < session.length; j++) {
      calculateSessionCost(j);
    }
  });
}
for (var i = 0; i < session.length; i++) {
  session[i].addEventListener("change", function() {
    // Calculate the cost of the changed session
    calculateSessionCost(this.value - 1);
  });
}
from.addEventListener("change", function() {
  // Recalculate the cost of each session
  for (var i = 0; i < session.length; i++) {
    calculateSessionCost(i);
  }
});
to.addEventListener("change", function() {
  // Recalculate the cost of each session
  for (var i = 0; i < session.length; i++) {
    calculateSessionCost(i);
  }
});
