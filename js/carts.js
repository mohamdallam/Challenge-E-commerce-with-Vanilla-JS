let productsDom = document.querySelector(".products");
let noProductDom = document.querySelector(".noProducts");

function drawCartProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productsInCart")).length === 0)
    noProductDom.innerHTML = "There is No Item";

  let products =
    JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
  let productUI = products.map((item) => {
    return `
      <div class="product-item">
      <img src="${item.imageUrl}" class="product-item-image" alt="image" />

      <div class="product-item-desc">
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <span> Price: ${item.price}</span><br>
        <span> Quantity: ${item.quantity}</span>
      </div>
      <div class="product-item-actions">
        <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">RemoveFrom Cart</button>
      </div>
    </div>`;
  });

  productsDom.innerHTML = productUI.join("");
}

drawCartProductsUI();

function removeItemFromCart(id) {
  let productsInCart = localStorage.getItem("productsInCart");
  if (productsInCart) {
    let item = JSON.parse(productsInCart);
    let filterItems = item.filter((item) => item.id !== id);
    localStorage.setItem("productsInCart", JSON.stringify(filterItems));
    drawCartProductsUI(filterItems);
  }
}
