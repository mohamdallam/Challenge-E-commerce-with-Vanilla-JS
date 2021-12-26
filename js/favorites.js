let productsDom = document.querySelector(".products");
let noProductDom = document.querySelector(".noProducts");

function drawFavoritesProductsUI(allProducts = []) {
  if (JSON.parse(localStorage.getItem("productFavorite")).length === 0)
    noProductDom.innerHTML = "There is No Item";

  let products =
    JSON.parse(localStorage.getItem("productFavorite")) || allProducts;
  let productUI = products.map((item) => {
    return `
      <div class="product-item">
      <img src="${item.imageUrl}" class="product-item-image" alt="image" />

      <div class="product-item-desc">
        <h2>${item.title}</h2>
        <p>Lorem ipsum began as scrambled</p>
        <span> Price: ${item.price}</span><br>
        <span> Quantity: ${item.quantity}</span>
      </div>
      <div class="product-item-actions">
        <button class="add-to-cart">RemoveFrom Facorites</button>
      </div>
    </div>`;
  });

  productsDom.innerHTML = productUI;
}

drawFavoritesProductsUI();

// function removeItemFromCart(id) {
//   let productFavorite = localStorage.getItem("productFavorite");
//   if (productFavorite) {
//     let item = JSON.parse(productFavorite);
//     let filterItems = item.filter((item) => item.id !== id);
//     localStorage.setItem("productFavorite", JSON.stringify(filterItems));
//     drawFavoritesProductsUI(filterItems);
//   }
// }

//onclick="removeItemFromCart(${item.id})
