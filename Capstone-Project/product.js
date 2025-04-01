const ws = location.search;
const searchParam = new URLSearchParams(ws);
const productID = searchParam.get("product_id");
if (productID) {
  fetch("http://3.136.18.203:8000/products/" + productID + "/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      function displayProductDetails(productData) {
        const productDetails = document.getElementById("productDetails");
        if (productData) {
          let varietiesHTML = "";
          if (productData.varieties && productData.varieties.length > 0) {
            varietiesHTML = `<h3>Available Varieties:</h3><ul>`;
            varietiesHTML += `
            <label for="dropdown">Choose one:</label>
            <select id="dropdown">
                ${productData.varieties.map((variety) => `<option value="${variety.name}">${variety.name} - $${variety.price}</option>`).join("")}
            </select>`;
          }
          productDetails.innerHTML = `
            <h2>${productData.name}</h2>
            <img class="img" src="${productData.picture_url}" alt="${productData.name}" />
            <p><strong>Description:</strong> ${productData.description}</p>
            <p><strong>Stock Quantity:</strong> ${productData.stock_quantity}</p>
            <p><strong>Category:</strong> ${productData.category}</p>
            <p><strong>Starting Price:</strong> $${productData.starting_at_price}</p>
            ${varietiesHTML}
            <button class="buy-btn">Buy</button>
          `;
        } else {
          productDetails.innerHTML = "<p>Product not found!</p>";
        }
      }
      displayProductDetails(data);
    })
    .catch((err) => {
      console.error(err.message);
      document.getElementById("productDetails").innerHTML = "<p>Failed to load product data.</p>";
    });
} else {
  document.getElementById("productDetails").innerHTML = "<p>No product selected!</p>";
}
