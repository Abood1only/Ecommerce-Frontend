const CART_KEY = "shoppingCart"; // Key for storing cart in localStorage

// Populate dropdown items
function jsDropdown() {
  const dropdownList = document.getElementById("dropdown");
  const listOfItems = [
    { name: "EASY OFF Heavy Duty 12 oz", price: 7.99 },
    { name: "EASY OFF Light Duty 12 oz", price: 4.99 },
  ];
  listOfItems.forEach((item) => {
    const option = document.createElement("option");
    option.text = item.name;
    option.value = item.price;
    dropdownList.add(option);
  });
}
// Update the current price display
function updatePrice(price) {
  document.getElementById("current-price").innerHTML = "$" + price;
}
// Add selected item to the cart
function addToCart() {
  const dropdownList = document.getElementById("dropdown");
  const myCurrentItem = dropdownList.options[dropdownList.selectedIndex].text;
  const myCurrentPrice = Number(dropdownList.value);
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find((item) => item.name === myCurrentItem);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity
  } else {
    cart.push({ name: myCurrentItem, price: myCurrentPrice, quantity: 1 }); // Add new item
  }

  // Save updated cart back to localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // Show the modal instead of alert
  openModal(`${myCurrentItem} added to your cart.`);
  displayCart();
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};
function displayCart() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalElement = document.getElementById("cart-total");
  const cartTotalItems = document.getElementById("cart-total-items");

  // Clear the current cart display
  cartItemsList.innerHTML = "";

  // Populate the cart items and calculate totals
  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 1;

    total += itemPrice * itemQuantity;
    itemCount += itemQuantity;

    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${itemPrice.toFixed(
      2
    )} x ${itemQuantity}`;

    // Add a "Remove" button for each item
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => deleteFromCart(item.name); // Pass item name to delete function

    listItem.appendChild(removeButton);
    cartItemsList.appendChild(listItem);
  });

  // Update the total price and item count
  cartTotalElement.textContent = total.toFixed(2);
  cartTotalItems.textContent = itemCount;
}
// Delete an item from the cart
function deleteFromCart(itemName) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // Filter out the item to be deleted
  const updatedCart = cart.filter((item) => item.name !== itemName);

  // Save the updated cart back to localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  alert(`${itemName} removed from your cart.`);
  displayCart(); // Update the cart display
}

// Initialize page on load
document.addEventListener("DOMContentLoaded", function () {
  jsDropdown();

  // Restore selected item
  const dropdownList = document.getElementById("dropdown");
  const savedDdSelection = localStorage.getItem("selectedItem");
  if (savedDdSelection) {
    dropdownList.value = savedDdSelection;
    updatePrice(savedDdSelection);
  } else {
    updatePrice(dropdownList.value);
  }

  // display cart on load
  displayCart();

  // Update selected item in localStorage on dropdown change
  dropdownList.addEventListener("change", function () {
    const itemPrice = dropdownList.value;
    updatePrice(itemPrice);
    localStorage.setItem("selectedItem", itemPrice);
  });
});
// Function to open the modal
function openModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message; // Set the modal message
  modal.style.display = "block"; // Show the modal
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none"; // Hide the modal
}
