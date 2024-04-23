var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");
var productConatiner = document.getElementById("Product-Container");
var productList = [];
var indexOfUpdateProduct;
if (window.localStorage.getItem("ourProduct") !== null) {
  productList = JSON.parse(window.localStorage.getItem("ourProduct"));

  displayProduct(productList);
}
function addProduct() {
  var product = {
    Name: productNameInput.value,
    Price: productPriceInput.value,
    Category: productCategoryInput.value,
    Desc: productDescInput.value,
    Img: productImageInput.files[0].name,
  };

  productList.push(product);
  window.localStorage.setItem("ourProduct", JSON.stringify(productList));
  resetProduct();
  displayProduct(productList);
}
function resetProduct() {
  productNameInput.value = null;
  productPriceInput.value = null;
  document.getElementById("default-elment").selected = "selected";
  productDescInput.value = null;
  productImageInput.value = null;
}
function displayProduct(arr) {
  var conatinerElements = ``;
  for (var i = 0; i < arr.length; i++) {
    conatinerElements += `
        <div class="col">
          <div class="border shadow-sm p-2">
            <div class="imge mb-5">
              <img
                src="./images/${arr[i].Img}"
                alt="Apple"
                class="w-100 h-100 object-fit-contain"
              />
            </div>
            <h3 class="fs-5">${arr[i].Name}</h3>
            <p class="fs-6 text-secondary">${arr[i].Desc}</p>
            <p class="fw-light"  ><span class="fw-semibold">Category:</span> ${arr[i].Category}</p>
            <div class="d-flex justify-content-between pe-3">
              <p class="fw-semibold">${arr[i].Price} EGP</p>
              <div class="icons">
                <i class="fa-solid fa-trash-can fa-shake fs-5 text-danger" onclick="deleteProduct(${i})"></i>
                <i class="fa-regular fa-pen-to-square fs-5 text-success" onclick="moveInputDetailsUp(${i})"></i>
                
              </div>
            </div>
          </div>
        </div>
        `;
  }
  productConatiner.innerHTML = conatinerElements;
}
function searchProduct(term) {
  var fillteredProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].Name.toUpperCase().includes(term.toUpperCase())) {
      fillteredProduct.push(productList[i]);
    }
  }
  displayProduct(fillteredProduct);
}
function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  //  console.log(productList);
  window.localStorage.setItem("ourProduct", JSON.stringify(productList));
  //  displayProduct(productList);
}
function moveInputDetailsUp(index) {
  document.getElementById('update-product').classList.replace("d-none","d-block");
  document.getElementById('add-product').classList.replace("d-block","d-none");
  productNameInput.value = productList[index].Name;
  productPriceInput.value = productList[index].Price;
  productCategoryInput.value = productList[index].Category;
  productDescInput.value = productList[index].Desc;
  indexOfUpdateProduct=index;
   
}
function updateProduct()
{
   productList[indexOfUpdateProduct].Name=productNameInput.value;
   productList[indexOfUpdateProduct].Price= productPriceInput.value;
   productList[indexOfUpdateProduct].Category =productCategoryInput.value
   productList[indexOfUpdateProduct].Desc=productDescInput.value;
   
   if(productImageInput.files[0]!= undefined)
   {
    productList[indexOfUpdateProduct].Img=productImageInput.files[0].name;
   }
  /* if(productImageInput.files.length>0)
    {
     productList[indexOfUpdateProduct].Img=productImageInput.files[0].name;
    }*/
   displayProduct(productList);
   resetProduct();
   window.localStorage.setItem("ourProduct",JSON.stringify(productList));
  document.getElementById('add-product').classList.replace("d-none","d-block");
  document.getElementById('update-product').classList.replace("d-block","d-none");
}
