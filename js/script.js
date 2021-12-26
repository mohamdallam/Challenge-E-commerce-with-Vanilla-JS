// Define Products

let productsDom = document.querySelector(".product");
let cartProductMenu = document.querySelector(".cart-products");
let cartProductDivDom = document.querySelector(".cart-products div");
let badgeDom = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let products = productsDB;

// Open Card Menu
shoppingCartIcon.addEventListener("click", openCardMenu);

// Display Product
//Invoke Function  instead of  // drawProductUi();
let drawProductUi;
(drawProductUi = function (products = []) {
  let productUI = products.map((item) => {
    console.log("aa", item);
    return `
    <div class="product-item">
    <img src="${item.imageUrl}" class="product-item-image" alt="image" />

    <div class="product-item-desc">
      <a onclick="saveItemData(${item.id})">${item.title}</a>
      <p>Lorem ipsum began as scrambled</p>
      <span>${item.price}</span>
    </div>

    <div class="product-item-actions">
      <button class="add-to-cart" onclick="addedToCart(${
        item.id
      } )">Add To Cart</button>
      <i 
      class="favorite fas fa-heart" 
      style="color:${item.liked == true ? "red" : ""}"
      onclick="addedToFavorites(${item.id})"></i>
    </div>
  </div>`;
  });

  productsDom.innerHTML = productUI.join("");
})(JSON.parse(localStorage.getItem("products"))||products);

// Ckeck if Items in Local Storage  //Invoke Function
let addedItem = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

if (addedItem) {
  addedItem.map((item) => {
    cartProductDivDom.innerHTML += `<p>${item.title} ${item.quantity}</p>`;
  });
  badgeDom.style.display = "block";
  badgeDom.innerHTML += addedItem.length;
}

// Add To Cart
// let allItem = [];
function addedToCart(id) {
  if (localStorage.getItem("username")) {
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem=addedItem.map(p=>{
        if(p.id===product.id)p.quantity+=1;
        return p;
      })
    } else {
      addedItem.push(product);
    }
    //UI
    cartProductDivDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} ${item.quantity}</p>`;
    });

   // Save Data
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));
  // Add Counter of Item
    let cartProductItems = document.querySelectorAll(".cart-products div p");
    console.log(cartProductItems);
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqeArr(arr, filterType) {
  let uniqe = arr
    .map((item) => item[filterType])
    .map((item, index, finalArr) => finalArr.indexOf(item) === index && index)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
  return uniqe;
}

// Open Cart Menu
function openCardMenu() {
  if (cartProductDivDom.innerHTML != "") {
    if (cartProductMenu.style.display == "block") {
      cartProductMenu.style.display = "none";
    } else {
      cartProductMenu.style.display = "block";
    }
  }
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

let input = document.getElementById("search");
input.addEventListener("keyup", function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "") {
    drawProductUi(JSON.parse(localStorage.getItem("products")));
  }
});
function search(title, myArray) {
  let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
  drawProductUi(arr);
}

// Add To favorites
let favoritesItem = [];
function addedToFavorites(id) {
  if (localStorage.getItem("username")) {
    let chosenItem = products.find((item) => item.id === id);
    chosenItem.liked = true;
    favoritesItem = [...favoritesItem, chosenItem];
    let uniqeProduct = getUniqeArr(favoritesItem, "id");
    localStorage.setItem("productFavorite", JSON.stringify(uniqeProduct));

    products.map((item) => {
      if (item.id === chosenItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    drawProductUi(products);
  } else {
    window.location = "login.html";
  }
}
