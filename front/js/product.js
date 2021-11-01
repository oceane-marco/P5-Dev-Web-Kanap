// variable :
let localStorageProduct = JSON.parse(localStorage.getItem("product"));

// séario
fetch(`http://localhost:3000/api/products/${getProductId()}`)
  .then((res) => res.json())
  .then(function (products) {
    displayProduct(products);
    addToCart();
    return products;
  });

/// fonction
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}
function displayProduct(product) {
  const image = document.getElementsByClassName("item__img");

  let productImg = `<img src=${product.imageUrl} alt=${product.altTxt}></img>`;
  image[0].innerHTML = productImg;

  const h1 = document.getElementById("title");
  h1.innerText = product.name;

  const price = document.getElementById("price");
  price.innerText = product.price;

  const description = document.getElementById("description");
  description.innerText = product.description;

  const pageTitle = document.querySelector("head > title");
  pageTitle.innerText = product.name;

  const colorSelector = document.getElementById("colors");

  for (i = 0; i < product.colors.length; i++) {
    let thisColor = product.colors[i];
    let colorOption = `<option products=${thisColor}>${thisColor}</option>`;
    colorSelector.insertAdjacentHTML("beforeend", colorOption);
  }
}

function addToCart() {
  document.getElementById("addToCart").addEventListener("click", function () {
    let products = {
      color: document.getElementById("colors").value,
      quantity: document.getElementById("quantity").value,
      id: getProductId(),
    };

    // if (color == "" && quantity == 0) {
    //   return alert("Veuillez choisir une couleur et definir une quantitée");
    // }
    // if (quantity < 1) {
    //   return alert("Veuillez Choisir une quantitée superieur à 0.");
    // }
    // if (color == "") {
    //   return alert("Veuiller choisir une couleur");
    // }

    addToLocalStorage(products);
    
  });
}
function addToLocalStorage(products) {
  // if (
  //   localStorageProduct.id == products.id &&
  //   localStorageProduct.color == products.color
  // ) {
  //   localStorageProduct.quantity += products.quantity;
  //   localStorageProduct.splice(index, 1);
  //   localStorage.setItem("product", JSON.stringify(localStorageProduct));
  // } else 
  if (localStorageProduct) {
    
    localStorageProduct.push(products);
    localStorage.setItem("product", JSON.stringify(localStorageProduct));
    console.log(localStorageProduct);
  }
  else{
    localStorageProduct = [];
    localStorageProduct.push(products);
    localStorage.setItem("product", JSON.stringify(localStorageProduct));
    console.log(localStorageProduct);
  }
}
