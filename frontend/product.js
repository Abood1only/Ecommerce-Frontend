function addToCart() {
  let dropdownList = document.getElementById("dropdown");
  let myCurrentItem = dropdownList.options[dropdownList.selectedIndex].text;
  let myCurrentPrice = Number(dropdownList.value);
  let myStoredPrice = Number(localStorage.getItem("totalPrice"));
  let myTotalPrice = myCurrentPrice + myStoredPrice;
  alert(
    myCurrentItem +
      " added to your Cart. \nTotal price is $" +
      myTotalPrice.toFixed(2)
  );
  localStorage.setItem("totalPrice", myTotalPrice.toFixed(2));
}
function jsDropdown() {
  let dropdownList = document.getElementById("dropdown");
  const listOfItems = [
    {
      name: "EASY OFF Heavy Duty 12 oz",
      price: 7.99,
    },
    {
      name: "EASY OFF Light Duty 12 oz",
      price: 4.99,
    },
  ];
  listOfItems.forEach((item) => {
    let option = document.createElement("option");
    option.text = item.name;
    option.value = item.price;
    dropdownList.add(option);
  });
}
function updatePrice(price) {
  document.getElementById("current-price").innerHTML = "$" + price;
}
document.addEventListener("DOMContentLoaded", function () {
  jsDropdown();

  let dropdownList = document.getElementById("dropdown");
  dropdownList.addEventListener("change", function () {
    let itemPrice = dropdownList.value;
    updatePrice(itemPrice);
  });
});
//jsDropdown();
