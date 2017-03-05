// **** Credit card validator **** //

//return credit card numbers from array and display in view
function genNumbers() {
  var ccNumbers = "";
  var multiDiv = document.getElementById("multi-validate");
  
  //credit card numbers
  var creditCardArray = ["4111111111111111","4111111111111","4012888888881881","378282246310005","6011111111111117","5105105105105100","5105 1051 0510 5106","9111111111111111"];

  for (var i = 0; i < creditCardArray.length; i++) {
    ccNumbers+= 
      "<div class='card mini-card col expandUp'>" +
        "<div class='card-number'>" + (creditCardArray[i]) + "</div>" + 
      "</div>";
  }
  multiDiv.innerHTML = ccNumbers;
  return creditCardArray;
} 

// take either a array or single credit card and perform validation checks
function creditCardCheck(validate) {
  var ccOutput = "";

  //validate single credit card
  if (validate == "single") {
    var cardTypeDiv = document.getElementById("card-type");
    var validTypeDiv = document.getElementById("valid");
    var input = document.getElementById("cc-input").value;
    
    //check one
    var creditCard = ccNumberValidate(input);

     //check two
    var luhnTest = luhnValidate(input);
    if (luhnTest != true) {
       creditCard[0].valid == "(invalid)";
    }

    //remove white space
    creditCard[0].num = creditCard[0].num.replace(/ /g, '');
    cardTypeDiv.innerHTML = creditCard[0].type;
    cardTypeDiv.className = "animated bounce";

    var newDiv = cardTypeDiv.cloneNode(true);
    cardTypeDiv.parentNode.replaceChild(newDiv, cardTypeDiv);
    validTypeDiv.innerHTML = creditCard[0].valid + "<br />" + creditCard[0].num;
  
  //validate array of credit cards
  } else  {
     var multiDiv = document.getElementById("multi-validate");
    var bulkNumArray = genNumbers();
   
    //get card type
    for (var j = 0; j < bulkNumArray.length; j++) {
      var value = bulkNumArray[j];
      
      //perform check one 
      var creditCard = ccNumberValidate(value);

      //perform luhn Validation, change card to invalid if false
      var luhnTest = luhnValidate(value);
      if (luhnTest != true) {
         creditCard[0].valid == "(invalid)";
      }

      //remove white space
      creditCard[0].num = creditCard[0].num.replace(/ /g, '');

      ccOutput+= 
        "<div class='card mini-card col expandUp'>" +
          "<div class='card-type'>" + creditCard[0].type + "</div>" +
          "<div class='card-number'>" + creditCard[0].num + "</div>" + 
          "<div class='is-valid'>"  + creditCard[0].valid + "</div>" + 
        "</div>"; 
    }
    multiDiv.innerHTML = ccOutput;
  };
}


//return credit card type, number and if valid
function ccNumberValidate(ccNumber) {
 
  // Visa
  var visaReg = new RegExp("^4(.{13}$)|^4(.{15})$");
  var visaType = new RegExp("^4");
  
  if (ccNumber.match(visaReg) != null) {
    return [{type:"Visa", num:ccNumber, valid:"(valid)"}];

  } else if (ccNumber.match(visaType) != null) {
    return [{type:"Visa", num:ccNumber, valid:"(invalid)"}];
  }

  // Mastercard
  var masterCardReg = new RegExp("^5[1-5](.{14})$");
  var masterCardType = new RegExp("^5[1-5]");

  if (ccNumber.match(masterCardReg) != null) {
    return [{type:"Mastercard", num:ccNumber, valid:"(valid)"}];

  } else if (ccNumber.match(masterCardType) != null) {
    return [{type:"Mastercard", num:ccNumber, valid:"(invalid)"}];
  }

  // AMEX
  var amexReg = new RegExp("^3[47](.{13})$");
  var amexType = new RegExp("^3[47]");
  if (ccNumber.match(amexReg) != null) {
    return [{type:"AMEX", num:ccNumber, valid:"(valid)"}];

  } else if (ccNumber.match(amexType) != null) {
    return [{type:"AMEX", num:ccNumber, valid:"(invalid)"}];
  }

  // Discover
  discoverReg = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)(.{12})$");
  discoverType = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (ccNumber.match(discoverReg) != null) {
    return [{type:"Discover", num:ccNumber, valid:"(valid)"}];

  } else if (ccNumber.match(discoverType) != null) {
    return [{type:"Discover", num:ccNumber, valid:"(invalid)"}];
  }

  return [{type:"Unknown", num:ccNumber, valid:"(invalid)"}];
}


//luhn validation returns true if successful
function luhnValidate(value) {
  var num = 0;
  var digit = 0;
  var toggle = false;

  //iterate through each digit in value, going in reverse order
  for (var i = value.length - 1; i >= 0; i--) {

    // store digit at position
    var singleDigit = value.charAt(i);

    // covert to integer in decimals
    var digit = parseInt(singleDigit, 10);
    if (toggle) {
      if ((digit *= 2) > 9) {
        digit -= 9;
      }
    }
    num += digit;
    toggle = !toggle;
  }
  return (num % 10) == 0;
}
