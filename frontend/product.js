const varietiesList = [
  {
    name: "EASY OFF Heavy Duty",
    price: 7.99,
  },
  {
    name: "EASY OFF Light Duty",
    price: 4.99,
  },
];
function addToCart(dropdown) {
  let dropdownList = document.getElementById("dropdown");
  let myCurrentPrice = Number(dropdownList.value);
  let myStoredPrice = Number(localStorage.getItem("totalPrice"));
  let myTotalPrice = myCurrentPrice + myStoredPrice;
  alert("Total price is $" + myTotalPrice.toFixed(2));
  localStorage.setItem("totalPrice", myTotalPrice.toFixed(2));
}
function UpdatePrice(price) {
  document.getElementById("current-price").innerHTML = "$" + price;
}
function dropdown(varietiesList) {
  let dropdownList = document.getElementsById(varietiesList);
  console.log(varietiesList);
}
