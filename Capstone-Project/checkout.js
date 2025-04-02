document.addEventListener("DOMContentLoaded", function () {
  // Load the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  // Function to display the cart
  function displayCart() {
    // Check if the cart is empty
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty!</p>";
      totalPrice.textContent = "Total: $0.00";
      return;
    }

    // Clear previous content
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
          <div>${item.name}</div>
          <div>Price: $${(parseFloat(item.price) || 0).toFixed(2)}</div>
          <div>
            Quantity: 
            <button class="add" data-id="${item.product_id}">+</button>
            <span class="quantity">${item.quantity}</span>
            <button class="remove" data-id="${item.product_id}">-</button>
          </div>
        `;
      cartContainer.appendChild(cartItem);
    });

    // Display total price
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Handle add/remove quantity in the cart
  cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("add")) {
      const productId = e.target.getAttribute("data-id");
      const item = cart.find((item) => String(item.product_id) === productId);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
        displayCart();
      }
    } else if (e.target.classList.contains("remove")) {
      const productId = e.target.getAttribute("data-id");
      const itemIndex = cart.findIndex((item) => String(item.product_id) === productId);
      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          cart.splice(itemIndex, 1); // Remove the item from the cart if quantity is zero
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
        displayCart();
      }
    }
  });

  // Display the cart on page load
  displayCart();

  // modal and overlay elements
  const checkoutModal = document.getElementById("checkout-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeModal = document.getElementById("close-modal");
  const submitOrderButton = document.getElementById("submit-order");
  const shippingAddressInput = document.getElementById("shipping-address");
  const paymentMethods = document.querySelectorAll("input[name='payment-method']");
  const orderSummary = document.getElementById("order-summary");
  const orderTotal = document.getElementById("order-total");
  const orderItems = document.getElementById("order-items");

  // Function to open the modal
  function openCheckoutModal() {
    // Populate order summary
    let total = 0;
    orderItems.innerHTML = ""; // Clear previous items
    cart.forEach((item) => {
      total += item.price * item.quantity;
      orderItems.innerHTML += `<p>${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}</p>`;
    });

    orderTotal.textContent = total.toFixed(2);
    checkoutModal.style.display = "block";
    overlay.style.display = "block";
  }

  // Function to close the modal
  function closeCheckoutModal() {
    checkoutModal.style.display = "none";
    overlay.style.display = "none";
  }

  // Event listener for the checkout button to open modal
  checkoutButton.addEventListener("click", openCheckoutModal);

  // Event listener for closing the modal
  closeModal.addEventListener("click", closeCheckoutModal);
  overlay.addEventListener("click", closeCheckoutModal);

  // Event listener for submitting the order
  submitOrderButton.addEventListener("click", function () {
    // Validate shipping address
    const shippingAddress = shippingAddressInput.value.trim();
    if (!shippingAddress) {
      alert("Please provide a shipping address!");
      return;
    }

    // Get selected payment method
    let selectedPaymentMethod = "";
    paymentMethods.forEach((radio) => {
      if (radio.checked) {
        selectedPaymentMethod = radio.value;
      }
    });

    // If no payment method is selected, prompt the user
    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    // Calculate the total amount
    const totalAmount = parseFloat(orderTotal.textContent);
    const customerId = Math.floor(Math.random() * 10000); // Random customer ID

    // Prepare the order data
    const orderData = {
      customer_id: customerId,
      order_date: new Date().toISOString(),
      total_amount: totalAmount.toFixed(2),
      payment_method: selectedPaymentMethod,
      shipping_address: shippingAddress,
      products: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log("Order data being sent:", orderData);

    // POST the order to the API
    fetch("http://3.136.18.203:8000/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Unknown error");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order placed:", data);
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        closeCheckoutModal();
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        alert("Failed to place order: " + err.message);
      });
  });
});
