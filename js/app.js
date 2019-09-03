//tell the js where to find stuff in html
//starting amounts
var strtAmntInput = document.querySelector('#strtAmnt');
var marPayInput = document.querySelector('#marPay');
var drewPayInput = document.querySelector('#drewPay');
//various checkboxes throughout
var titheCheck = document.querySelector('#Tithe');
var miscCheck = document.querySelector('#miscCheck');
var customCashCheck = document.querySelector('#customCashCheck');
var drewCardCheck = document.querySelector('loadDrewCard');
//bills in array form
var billsArray = document.querySelectorAll('.bills');
var billDateSpans = document.querySelectorAll('.billDate');
//categories in bill form
var categoriesArray = document.querySelectorAll('.category');
var gasBudgetInput = document.querySelector('#gasBudget');
var coffeeBudgetInput = document.querySelector('#coffeeBudget');

//output
var dvBudgetOut = document.querySelector('#dvBudgetOut');
//array for table cells
var tblFives = document.querySelectorAll('.fives');
var tblTens = document.querySelectorAll('.tens');
var tblTwenties = document.querySelectorAll('.twenties');
var tblFifties = document.querySelectorAll('.fifties');
var tblCashTotal = document.querySelectorAll('.cashTotal');

//create a function to change the name of the custom budget
//tell js where to find stuff needed for changing name
var btnChangeCategoryName = document.querySelector('#btnChangeCategoryName');
var localCustomCategoryName = localStorage.getItem('customCategoryName');
var inputCustomCategoryName = document.querySelector(
  '#inputCustomCategoryName'
);
var customCategoryNameOut = document.querySelector('#customCategoryNameOut');
var tblCustomName = document.querySelector('#tblCustomName');
var showHideButton = document.querySelector('#showHideButton');

//function to toggle billDate bgColor when bill is checked (checkbox is hidden so this lets userr know what is selected)
function toggleChecked(billDateNumber) {
  //select the specific category billDate
  let thisBillDateSpan = billDateSpans[billDateNumber];
  console.log(thisBillDateSpan.style.backgroundColor);
  //if the bgColor is white change to dark, also change font color to make legible
  if (thisBillDateSpan.style.backgroundColor != 'rgba(93, 143, 173, 0.75)') {
    thisBillDateSpan.style.backgroundColor = 'rgba(93, 143, 173, 0.75)';
    thisBillDateSpan.style.color = 'rgba(255, 255, 255, 0.75)';
  }
  //if the bgColor is dark change to white, also change font color to make legible
  else {
    thisBillDateSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
    thisBillDateSpan.style.color = 'rgba(93, 143, 173, 0.75)';
  }
}

//hide the name change field when the checkbox is not checked
function toggleNameChangeBox() {
  var nameChangeBox = document.getElementById('newName');
  if (nameChangeBox.style.display === 'none') {
    nameChangeBox.style.display = '';
    showHideButton.innerHTML = 'Hide Name Change Field';
  } else {
    nameChangeBox.style.display = 'none';
    showHideButton.innerHTML = 'Change Category Name';
  }
}

if (localCustomCategoryName == null) {
  customCategoryNameOut.innerHTML = 'Custom Category:';
  tblCustomName.innerHTML = 'Custom Category';
} else {
  customCategoryNameOut.innerHTML = localCustomCategoryName + ': ';
  tblCustomName.innerHTML = localCustomCategoryName;
}

function changeCategoryName() {
  if (inputCustomCategoryName.value == '') {
    //do nothing
  } else {
    //change the name of the custom category
    console.log(inputCustomCategoryName.value);
    localStorage.setItem('customCategoryName', inputCustomCategoryName.value);
    customCategoryNameOut.innerHTML = inputCustomCategoryName.value + ': ';
    tblCustomName.innerHTML = inputCustomCategoryName.value;

    inputCustomCategoryName.value = '';
    toggleNameChangeBox();
  }
}

//function to calculate budget
function budget() {
  //reset the div
  dvBudgetOut.innerHTML = '';

  //create variable to keep track of budgeting in progress
  var budgetFlow = 0;
  //create tithe, bills, categories, and drewCard variables
  var tithe = 0;
  var bills = 0;
  var categories = 0;
  var drewCard = 0;

  //make everything a number
  //bills side
  var strtAmnt = Number(strtAmntInput.value);
  var drewPay = Number(drewPayInput.value);
  var marPay = Number(marPayInput.value);
  //categories side
  //create cash array
  var cashCategories = [
    {
      category: 'Misc',
      amount: Number(categoriesArray[0].value)
    },
    {
      category: 'Counseling',
      amount: Number(categoriesArray[1].value)
    },
    {
      category: 'Groceries',
      amount: Number(categoriesArray[2].value)
    },
    {
      category: 'Household',
      amount: Number(categoriesArray[3].value)
    },
    {
      category: 'Personal Care',
      amount: Number(categoriesArray[4].value)
    },
    {
      category: 'Date Night',
      amount: Number(categoriesArray[5].value)
    },
    {
      category: 'Entertainment',
      amount: Number(categoriesArray[6].value)
    },
    {
      category: 'Cali',
      amount: Number(categoriesArray[7].value)
    },
    {
      category: 'Clothing',
      amount: Number(categoriesArray[8].value)
    },
    {
      category: 'Spending Money',
      amount: Number(categoriesArray[9].value)
    },
    {
      category: 'Lunch Money',
      amount: Number(categoriesArray[10].value)
    },
    {
      category: 'Custom Category',
      amount: Number(categoriesArray[11].value)
    },
    //categories that do not require cash
    {
      category: 'Gas Money',
      amount: Number(categoriesArray[12].value)
    },
    {
      category: 'Coffee',
      amount: Number(categoriesArray[13].value)
    }
  ];

  //add starting amount
  budgetFlow = strtAmnt;
  if (budgetFlow >= 0) console.log('$' + strtAmnt + ' (Starting Amount)');
  //add mariah's pay
  if (marPay != 0) {
    budgetFlow += marPay;
    if (budgetFlow >= marPay + drewPay) {
      console.log('+ $' + marPay + " (Mariah's Pay)");
      console.log('     Subtotal = $' + budgetFlow);
    }
  }
  //add drew's pay
  if (drewPay != 0) {
    budgetFlow += drewPay;
    if (budgetFlow >= marPay + drewPay) {
      console.log('+ $' + drewPay + " (Drew's Pay)");
      console.log('     Subtotal = $' + budgetFlow);
    } else {
      console.log('$' + budgetFlow + ' (Starting Amount)');
    }
  }
  //calculate tithe
  if (titheCheck.checked) {
    tithe = Math.floor((drewPay + marPay) / 10);
    console.log('- $' + tithe + ' (Tithe)');
    //subtract tithe
    budgetFlow -= tithe;
    console.log('     Subtotal = $' + budgetFlow);
  }

  //figure out which boxes are checked
  console.log('     Bills to Pay:');
  for (var i = 0; i < billsArray.length; i++) {
    if (billsArray[i].checked) {
      bills += Number(billsArray[i].value);
      console.log('         ' + billsArray[i].name);
    }
  }
  console.log('- $' + bills + ' (Bills Total)');
  //subtract bills of checked boxes
  budgetFlow -= bills;
  console.log('     Subtotal = $' + budgetFlow);

  //for loop to add totals of categories
  for (var i = 0; i < cashCategories.length; i++) {
    var cashIndex = cashCategories[i];
    categories += cashIndex.amount;
  }
  console.log('- $' + categories + ' (Categories)');
  //subtract categories from budgetFlow
  budgetFlow -= categories;
  console.log('     Subtotal = $' + budgetFlow);

  //figure out breakdown of bills for cash

  //variables for totals row
  var totFives = 0;
  var totTens = 0;
  var totTwenties = 0;
  var totFifties = 0;
  var totCashTotal = 0;

  //for loop to run through cash categories
  for (var i = 0; i < cashCategories.length; i++) {
    //index to help
    var cashIndex = cashCategories[i];
    //variables for cash
    var fives = 0;
    var tens = 0;
    var twenties = 0;
    var fifties = 0;
    var cashTotal = 0;

    //pull amount from array
    var amount = cashIndex.amount;

    //find fives if amount is not an even 10
    if (cashCategories[i].amount % 10 == 5) {
      fives = 1;
      amount -= fives * 5;
      cashTotal += fives * 5;
    }

    //only for categories that get split in 1/2
    else if (
      cashIndex.category == 'Clothing' ||
      cashIndex.category == 'Spending Money' ||
      cashIndex.category == 'Lunch Money'
    ) {
      if ((amount / 10) % 2 == 1) {
        fives = 2;
        amount -= fives * 5;
        cashTotal += fives * 5;

        //check if Drew's card is being loaded
        if (loadDrewCard.checked) {
          //put 1/2 of the fives total on drew's card
          drewCard += (fives * 5) / 2;
          fives /= 2;
          cashTotal -= fives * 5;
          // find # of tens and put 1/2 of that total on drew's card.
          drewCard += (10 * Math.floor(amount / 10)) / 2;
          //subtract this number from the category total.
          amount -= (10 * Math.floor(amount / 10)) / 2;
        }
      }
    }

    //find number of fifties if $150 or more
    if (amount >= 150) {
      fifties = Math.floor(amount / 50);
      amount -= fifties * 50;
      cashTotal += fifties * 50;
    }

    //find number of twenties if $60 or more
    if (amount >= 60) {
      twenties = Math.floor(amount / 20);
      amount -= twenties * 20;
      cashTotal += twenties * 20;
    }

    //find out how many 10's in the category
    tens = Math.floor(amount / 10);
    //subtract tens from amount in category
    amount -= tens * 10;
    //add tens to cash total
    cashTotal += tens * 10;

    //if statement to exclude the last 2 items from the cash table
    if (i < categoriesArray.length - 2) {
      //if more than 0, put number in table cell.
      if (fives > 0) {
        tblFives[i].innerHTML = fives;
        totFives += fives;
      } else {
        tblFives[i].innerHTML = '';
      }
      if (tens > 0) {
        tblTens[i].innerHTML = tens;
        totTens += tens;
      } else {
        tblTens[i].innerHTML = '';
      }
      if (twenties > 0) {
        tblTwenties[i].innerHTML = twenties;
        totTwenties += twenties;
      } else {
        tblTwenties[i].innerHTML = '';
      }
      if (fifties > 0) {
        tblFifties[i].innerHTML = fifties;
        totFifties += fifties;
      } else {
        tblFifties[i].innerHTML = '';
      }

      //if more than 0, put total cash in cashTotal cell.
      if (cashTotal > 0) {
        tblCashTotal[i].innerHTML = cashTotal;
        totCashTotal += cashTotal;
      } else {
        tblCashTotal[i].innerHTML = '';
      }

      //only calculate cash for misc and custom category if the box is checked.
      if (i == 0) {
        if (miscCheck.checked != true) {
          tblFives[0].innerHTML = '';
          tblTens[0].innerHTML = '';
          tblTwenties[0].innerHTML = '';
          tblFifties[0].innerHTML = '';

          totFives -= fives;
          totTens -= tens;
          totTwenties -= twenties;
          totFifties -= fifties;

          tblCashTotal[0].innerHTML = '';
          totCashTotal -= cashTotal;
        }
      }

      if (i == 11) {
        if (customCashCheck.checked != true) {
          tblFives[11].innerHTML = '';
          tblTens[11].innerHTML = '';
          tblTwenties[11].innerHTML = '';
          tblFifties[11].innerHTML = '';

          totFives -= fives;
          totTens -= tens;
          totTwenties -= twenties;
          totFifties -= fifties;

          tblCashTotal[11].innerHTML = '';
          totCashTotal -= cashTotal;
        }
      }
    }

    tblFives[tblFives.length - 1].innerHTML = totFives;
    tblTens[tblTens.length - 1].innerHTML = totTens;
    tblTwenties[tblTwenties.length - 1].innerHTML = totTwenties;
    tblFifties[tblFifties.length - 1].innerHTML = totFifties;
    tblCashTotal[tblCashTotal.length - 1].innerHTML = '$' + totCashTotal;
  }

  //output to dvBudgetOut
  dvBudgetOut.style.display = 'block';
  dvBudgetOut.innerHTML += 'Tithe: $' + tithe + '<br/><br/>';
  dvBudgetOut.innerHTML += 'Total Bills this Period: $' + bills + '<br/><br/>';
  if (drewCard > 0)
    dvBudgetOut.innerHTML += "Drew's Card: $" + drewCard + '<br/><br/>';
  dvBudgetOut.innerHTML += 'Margin: $' + budgetFlow;
}
