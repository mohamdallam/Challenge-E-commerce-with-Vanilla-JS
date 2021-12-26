//Variables


let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productPriceSelect = document.getElementById("product-price");
let createForm = document.getElementById("create-form");
let inputFile = document.getElementById("upload-image-file");

let productPriceValue;
let productImage;


// Events
productPriceSelect.addEventListener("change",getProductPriceValue);
createForm.addEventListener("submit",createProductFunction);
inputFile.addEventListener("change", uploadImage);
// Function
function getProductPriceValue(e){
    productPriceValue = e.target.value;
}

function createProductFunction(e){
    e.preventDefault();
    let allProducts= JSON.parse(localStorage.getItem("products"))||productsDB;
    let nameValue=productName.value;
    let descValue=productDesc.value;


    if (nameValue && descValue) {
        let obj={
            id:allProducts ? allProducts.length +1 : 1,
            quantity:1,
            imageUrl: productImage,
            price:productPriceValue,
            title:nameValue,
            desc:descValue,
        };
    
        let newProducts = allProducts ? [...allProducts, obj] : [obj];
        localStorage.setItem("products",JSON.stringify(newProducts));
    
        productName.value = "";
        productDesc.value = "";
        productPriceSelect.value = "";

    }else{
        alert("Enter Data");
    }

}


// uploadImage
function uploadImage() {
    let file = this.files[0];
    console.log(file)

    let types = ["image/jpeg", "image/png"];
  
    if (types.indexOf(file.type) == -1) {
      alert("Type not Supported");
      return;
    }
  
    if (file.size > 2 * 1024 * 1024) {
      alert("Image not Exced 2MG");
      return;
    }
  
    
    productImage = URL.createObjectURL(file);
  }
  

  