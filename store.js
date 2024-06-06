// Name:Ahmad Bshara
//  Date:4/28/2023
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
const createId = () => {
  return Date.now();
};
function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    const id = button.getAttribute("item-id");
    button.addEventListener("click", (event) => removeCartItem(event, id));
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  // document
  //   .getElementsByClassName("btn-purchase")[0]
  //   .addEventListener("click", purchaseClicked);
}
//purchasing
function purchaseClicked() {
  debugger;
  var cartItems = document.getElementsByClassName("cart-items")[0];
  if (!cartItems.hasChildNodes()) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }
  alert(
    "Thank you for your purchase and you parchase number is " + randomNumber
  );
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  resetForm();
  sessionStorage.clear();
  updateCartTotal();
}
function generateRandomNumber() {
  // Generate a random number between 1000 and 9999 (inclusive)
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
const randomNumber = generateRandomNumber();

// location.remove();

function removeCartItem(event, id) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  console.log({ event });

  //logic to remove item from session
  let previousCart = JSON.parse(sessionStorage.getItem("cart"));
  previousCart = previousCart.filter((item) => item.id !== id);
  sessionStorage.setItem("cart", JSON.stringify(previousCart));
  updateCartTotal();
}
function resetForm() {
  document.getElementById("number").value = "";
  document.getElementById("e-date").value = "";
  document.getElementById("cvv").value = "";
  document.getElementById("email").value = "";
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
//add to cart
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  //
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  const id = createId();
  const previousCart = sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [];
  const itemExist = previousCart.find((c) => c.title === title);
  if (itemExist) {
    alert("This item is in your cart already");
  } else {
    console.log({ title, price, imageSrc });
    console.log(previousCart);
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...previousCart, { id, title, price, imageSrc }])
    );
    addItemToCart(id, title, price, imageSrc);
    updateCartTotal();
  }
}

function addTicketToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName("tour-item tour-arena")[0]
    .innerText;
  const id = createId();
  var date = shopItem.getElementsByClassName("tour-item tour-date")[0]
    .innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-images")[0].src;
  // var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  // var city = shopItem.getElementsByClassName("tour-item tour-city")[0]
  //   .innerText;
  title = title + "-" + date;
  var price = "$" + Math.trunc(Math.random() * 100).toString();
  const previousCart = sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : [];
  //

  const itemsExist = previousCart.find((a) => a.title === title);
  if (itemsExist) {
    alert("This item is in your cart already");
  } else {
    console.log({ title, price, imageSrc });
    console.log(previousCart);
    //
    sessionStorage.setItem(
      "cart",
      JSON.stringify([...previousCart, { id, title, date, price, imageSrc }])
    );
    // addItemToCart(id, title, price, imageSrc);
    // updateCartTotal();
  }
  //addItemToCart(title, price);
}

//Adding to the cart
function addItemToCart(id, title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  //check here

  // for (var i = 0; i < cartItemNames.length; i++) {
  //   if (cartItemNames[i].innerText == title) {
  //     alert("This item is already added to the cart");
  //     return;
  //   }
  // }
  // console.log("reached after loop");

  //I deleted this img src since i want to enter a normal image same as the one in the store page
  // if (imageSrc === null || imageSrc === undefined) {
  //   imageSrc = "Images/ticket-image.jpg";
  // }

  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" item-id="${id}" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", (event) => removeCartItem(event, id));
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}
function fillCart() {
  console.log("fillCart");
  let cartItems = sessionStorage.getItem("cart");
  console.log({ cartItems });
  if (!cartItems) return;
  cartItems = JSON.parse(cartItems);
  cartItems.forEach((item) => {
    addItemToCart(item.id, item.title, item.price, item.imageSrc);
  });
  updateCartTotal();
}

fillCart();

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  console.log(price);
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
///Credit card form
function validatecreditcard() {
  let cNumber = document.getElementById("number");

  cNumber.addEventListener("keyup", function (e) {
    let num = cNumber.value;

    let isValidLength = isValidCreditCardLength(num);

    console.log("isValidLength", isValidLength);

    if (!isValidLength) return false;

    let newValue = "";
    num = num.replace(/\s/g, "");
    for (var i = 0; i < num.length; i++) {
      if (i % 4 == 0 && i > 0) newValue = newValue.concat(" ");
      newValue = newValue.concat(num[i]);
      cNumber.value = newValue;
    }

    let ccNum = document.getElementById("c-number");
    if (num.length < 16) {
      ccNum.style.border = "1px solid red";
      return false;
    } else {
      ccNum.style.border = "1px solid greenyellow";
    }
  });

  let eDate = document.getElementById("e-date");
  eDate.addEventListener("keyup", function (e) {
    let newInput = eDate.value;

    if (e.which !== 8) {
      var numChars = e.target.value.length;
      if (numChars == 2) {
        var thisVal = e.target.value;
        thisVal += "/";
        e.target.value = thisVal;
        console.log(thisVal.length);
      }
    }

    if (newInput.length < 5) {
      eDate.style.border = "1px solid red";
      return false;
    } else {
      eDate.style.border = "1px solid greenyellow";
    }
  });

  let cvv = document.getElementById("cvv");
  cvv.addEventListener("keyup", function (e) {
    let elen = cvv.value;
    let cvvBox = document.getElementById("cvv-box");
    if (elen.length < 3) {
      cvvBox.style.border = "1px solid red";
    } else {
      cvvBox.style.border = "1px solid greenyellow";
    }
  });
}
// // Create a new Date object representing the current date and time
// const currentDate = new Date();

// // Set the purchase date to the current date and time
// const purchaseDate = currentDate;

// // Display the purchase date in a formatted string
// const formattedPurchaseDate = purchaseDate.toLocaleString();
// console.log("Purchase Date: " + formattedPurchaseDate);

function showPurchaseDate() {
  // Create a new Date object representing the current date and time
  const currentDate = new Date();

  // Set the purchase date to the current date and time
  const purchaseDate = currentDate;

  // Display the purchase date in a formatted string
  const formattedPurchaseDate = purchaseDate.toLocaleString();
  document.getElementById("purchaseDate").innerHTML =
    "Purchase Date: " + formattedPurchaseDate;
}
var currentDate = new Date();

// Get the input element by its id
var currentDateInput = document.getElementById("currentDateInput");

// Set the value of the input field to the current date
currentDateInput.value = currentDate.toDateString();
