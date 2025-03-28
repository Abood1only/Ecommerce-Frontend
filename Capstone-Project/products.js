const container = document.getElementById("container");
const myTemplate = document.getElementById("prod-template");
const myProdId = document.getElementById("prod-id");
const myProdStockQuantity = document.getElementById("prod-stock-quantity");
const myProdDes = document.getElementById("prod-des");
const myCategoryId = document.getElementById("prod-category-id");
const fragment = document.createDocumentFragment();

Promise.all([
  fetch("http://3.136.18.203:8000/products/").then((response) =>
    response.json()
  ),
  fetch("http://3.136.18.203:8000/categories/").then((response) =>
    response.json()
  ),
])
  .then(([products, categories]) => {
    products.forEach((product) => {
      const prodTemplate = myTemplate.content.cloneNode(true);
      const category = categories.find(
        (cat) => cat.category_id === product.category_id
      );
      prodTemplate.querySelector(
        ".prod-id"
      ).textContent = `Product id: ${product.product_id}`;
      prodTemplate.querySelector(
        ".prod-category-id"
      ).textContent = `Category: ${category?.name || "Null"}`;
      prodTemplate.querySelector(".prod-name").textContent = product.name;
      prodTemplate.querySelector(".img").src = product.picture_url;
      prodTemplate.querySelector(
        ".prod-des"
      ).textContent = `Description: ${product.description}`;
      prodTemplate.querySelector(".prod-stock-quantity").textContent =
        product.stock_quantity
          ? `Available Quantity: ${product.stock_quantity}`
          : "Out of Stock";
      prodTemplate.querySelector(
        ".prod-category-id"
      ).textContent = `Category: ${product.category}`;
      prodTemplate.querySelector(
        ".prod-price"
      ).textContent = `$${product.starting_at_price}`;
      fragment.appendChild(prodTemplate);
    });
    container.appendChild(fragment);
  })
  .catch((err) => {
    console.error(err.message);
  });
