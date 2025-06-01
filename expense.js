var form = document.querySelector(".info-wrap");
var addBtn = document.querySelector("#addBtn");
var transactDiv = document.querySelector("#transactElements");

// load transactions on the page when we reload the browser
transactDiv.innerHTML = localStorage.getItem("transactionList"); // Load saved transactions from localStorage into the transaction div
updateTotals(); // Update totals on page load

addBtn.addEventListener("click", typeText);
form.addEventListener("keypress", enterKey);
transactDiv.addEventListener("click", deleteTrnsctn);

function enterKey(x) {
  if (x.key === "Enter") {
    typeText();
  }
}

// This function recalculates and updates the total income, expenses, and balance by parsing the DOM
function updateTotals() {
  var incomeTotal = 0; // Initialize total income
  var expenseTotal = 0; // Initialize total expenses
  var transactDiv = document.querySelector("#transactElements"); // Get the transaction container
  var balanceAmount = document.querySelector("#balanceAmount"); // Get the balance display element
  var incomeAmount = document.getElementById("incomeAmount"); // Get the income total display element
  var expenseAmount = document.getElementById("expenseAmount"); // Get the expense total display element

  // Select all <p> elements inside .trnsctSctn (these hold the amount for each transaction)
  var amounts = transactDiv.querySelectorAll(".trnsctSctn p");
  amounts.forEach(function(itemAmnt) {
    // Remove all non-digit and non-minus characters from the text (to extract the number)
    var text = itemAmnt.textContent.replace(/[^\d-]/g, "");
    var value = parseInt(text); // Convert the cleaned text to a number
    // If this is an income, add to incomeTotal
    if (itemAmnt.classList.contains("incomeTrack")) {
      incomeTotal += value;
    // If this is an expense, add to expenseTotal (as a positive number)
    } else if (itemAmnt.classList.contains("expenseTrack")) {
      expenseTotal += Math.abs(value);
    }
  });
  // Update the UI with the new totals
  incomeAmount.innerText = incomeTotal;
  expenseAmount.innerText = expenseTotal;
  balanceAmount.innerText = incomeTotal - expenseTotal;
}

// This function handles deleting a transaction
function deleteTrnsctn(x) {
  if (x.target.tagName === "IMG") {
    x.target.parentElement.parentElement.remove(); // Remove the transaction block from the DOM
    // update deleted transaction on local storage
    var updated = transactDiv.innerHTML; // Get the updated HTML after deletion
    localStorage.setItem("transactionList", updated); // Save the new transaction list to localStorage
    updateTotals(); // Recalculate and update totals
  }
}

 var incomeTotal = 0; // Initialize total income
  var expenseTotal = 0; // Initialize total expenses
function typeText(e) {  // select the description and number
  var itemText = document.querySelector("#item");
  var itemAmount = document.querySelector("#amnt");

  // save the description value to a variable
  itemValue = itemText.value;
  // convert the amount value to a number
  itemAmntValue = parseInt(itemAmount.value);
  // create a an element for the converted amount value
  var itemAmnt = document.createElement("p");

  // select summary section elements
  var incomeSum = document.getElementById("incomeGroup");
  var expenseSum = document.getElementById("expenseSum");
  var expenseAmount = document.getElementById("expenseAmount");
  var incomeAmount = document.getElementById("incomeAmount");
  var expenseGroup = document.getElementById("expenseGroup");
  var incomeGroup = document.getElementById("incomeGroup");
  var nairaSign = document.getElementById("span");
  var balanceAmount = document.querySelector("#balanceAmount");

  // select the select tag holding the category
  var category = document.querySelector("#category");
  // store the select value in a variable
  categoryValue = category.value;

  if (categoryValue === "expense") {  
    var naira = nairaSign.textContent;
    itemAmnt.classList.add("expenseTrack");

    // store the coverted amount value in the created element/tag
    itemAmnt.innerHTML = "-" + naira + itemAmntValue;

    // for the summary/total income and expense section
    expenseTotal += itemAmntValue;
    expenseAmount.innerText = expenseTotal;
    expenseGroup.classList.add("expenseTrack");
  } else {
    itemAmnt.classList.add("incomeTrack");
    // store the coverted amount value in the created element/tag
    itemAmnt.innerHTML = "+<span>N</span>" + itemAmntValue;

    // for the summary/total income and expense section
    incomeTotal += itemAmntValue;
    incomeSum.classList.add("incomeTrack");
    incomeAmount.innerText = incomeTotal;
  }

  // calulate the balance and store in variable
  balanceAmount.innerText = incomeTotal - expenseTotal;

  // create an element for the delete img
  var deleteBtn = document.createElement("img");
  // store the delete icon in the created img element
  deleteBtn.src = "img/delete.png";
  // add class to the delete icon
  deleteBtn.classList.add("deleteBtn");

  // select the space under the transaction heading
  var transactDiv = document.querySelector("#transactElements");
  var transactionBlock = document.createElement("div");
  var transactionWrap = document.createElement("div");
  // add a class the the transanction wrap div
  transactionWrap.classList.add("trnsctSctn");
  // create a line(hr) tag
  var line = document.createElement("hr");
  // add a class to the line
  line.classList.add("horizontal-line");

  // display the description, amount and delete icon inside a seperate div
  transactionWrap.append(itemValue);
  transactionWrap.append(itemAmnt);
  transactionWrap.append(deleteBtn);
  // display the line and the div containing the 3 items above in another div
  transactionBlock.append(line);
  transactionBlock.append(transactionWrap);
  // display them in the final html structure div
  transactDiv.append(transactionBlock);

  // make the inputs empty after transactions as they being added to the transactions div
  itemAmount.value = "";
  itemText.value = "";

  // save the div containing the transaction list to the localStorage
  localStorage.setItem("transactionList", transactDiv.outerHTML); // Save the updated transaction list to localStorage
  updateTotals(); // Recalculate and update totals after adding a transaction
}

