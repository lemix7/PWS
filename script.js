var participantType = document.getElementsByName("participantType");
var session = document.getElementsByName("session");
var from = document.getElementsByName("from")[0];
var to = document.getElementsByName("to")[0];
var cost = document.getElementById("cost");
var totalCost = document.getElementById("totalCost");

var presenterPrice = 50;
var audiencePrice = 100;
var sessionPrices = [10, 20, 30, 40];

function getDays(date1, date2) {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function calculateSessionCost(index) {
  var sessionCost = document.getElementById("cost" + (index + 1));
  if (session[index].checked) {
    var participantPrice = 0;
    for (var i = 0; i < participantType.length; i++) {
      if (participantType[i].checked) {
        participantPrice = participantType[i].value == "presenter" ? presenterPrice : audiencePrice;
        break;
      }
    }
    var sessionPrice = sessionPrices[index];
    var days = getDays(new Date(from.value), new Date(to.value));
    var cost = participantPrice * sessionPrice * days;
    sessionCost.innerHTML = cost;
  } else {
    sessionCost.innerHTML = 0;
  }
}





function calculateTotalCost() {
  var total = 0;
  const discount = 0.15;
  numChecked = 0;
  for (var i = 0; i < session.length; i++) {
    total += parseInt(document.getElementById("cost" + (i + 1)).innerHTML);
  }
  var dom = document.getElementById("form");
  let checkboxes = dom.querySelectorAll('input[type="checkbox"]');

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      numChecked++;
    }
  }

  console.log( numChecked);

  if (numChecked >= 3 && total > 1000) {
    total = total - total * discount;
  }
 
  totalCost.innerHTML = total + " (€)";
  var confirm = window.confirm("Do you accept the calculated total cost for payment?");
  if (confirm) {
    window.alert("Thank you for registering for the workshop!");
  } else {

    window.alert(" application withdraw");
  }
}




// function dumcount() {
//   var dom = document.getElementById("form");
//   let checkboxes = dom.querySelectorAll('input[type="checkbox"]');

//   for (var i = 0; i < checkboxes.length; i++) {
//     if (checkboxes[i].checked) {
//       numChecked++;
//     }
//   }

//   console.log( numChecked);

//   if (numChecked >= 6 && total > 1000) {
//     total = total - total * discount;
//   }

// }






for (var i = 0; i < participantType.length; i++) {
  participantType[i].addEventListener("change", function() {
    for (var j = 0; j < session.length; j++) {
      calculateSessionCost(j);
    }
  });
}
for (var i = 0; i < session.length; i++) {
  session[i].addEventListener("change", function() {

    calculateSessionCost(this.value - 1);
  });
}
from.addEventListener("change", function() {

  for (var i = 0; i < session.length; i++) {
    calculateSessionCost(i);
  }
});
to.addEventListener("change", function() {

  for (var i = 0; i < session.length; i++) {
    calculateSessionCost(i);
  }
});

