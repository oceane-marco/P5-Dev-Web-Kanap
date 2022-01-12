//*panier
// variable utile
let productsInCart = [];
productsInCart = JSON.parse(localStorage.getItem("products"));
let totalQuantity = 0;
let totalPrice = 0;
//* senario

if (isCartempty()) {
  displayemptyCard();
} else {
  //recuperé chacun des produit present dans le localstorage
  fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then(function (allProducts) {
      let products = [];
      productsInCart.forEach((productInCart) => {

        let product = allProducts.find((item) => {
          return item._id == productInCart.id
        })
        
        let item = {...product};

        item.quantity = Number(productInCart.quantity);
        item.color = productInCart.color;

        products.push(item);
      });
      displayProduct(products);
      listenDeleteProduct(products, productsInCart);
      listenChangeQuantity(products, productsInCart);
      displayTotalQuantity(products);
      displayTotalPrice(products);
    });
}
//* fonction
// verifier si il y a quelquechose dans le localstorage ou non
function isCartempty() {
  if (productsInCart == null || productsInCart.length == 0) {
    return true;
  } else {
    return false;
  }
}
// affichage si il n'y a rien dans le panier
function displayemptyCard() {
  document.getElementsByTagName("h1")[0].innerText = "Votre panier est vide";
  document.getElementsByClassName("cart")[0].style.display = "none" ;
}
//aficher un rendue pour chaque produit
function displayProduct(products) {
  products.forEach((product) => {
    document.getElementById("cart__items").innerHTML += render(product);
  });
}
function render(product) {
  return `
        <article class="cart__item" id="${product._id}-${product.color}">
            <div class="cart__item__img">
                <img src=${product.imageUrl} alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__titlePrice">
                  <h2>${product.name}</h2>
                  <p>${formatter.format(product.price)}</p>
                  <p>${product.color}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" id="quantity-${product._id}-${product.color}" name="itemQuantity" min="1" max="100" value ="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" id="delete-button-${product._id}-${product.color}">Supprimer</p>
                </div>
              </div>
            </div>
        </article>`;
}
//afficher le prix total
function displayTotalPrice(products) {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += Number(product.price) * Number(product.quantity);
  });
  document.getElementById(`totalPrice`).innerText = formatter.format(totalPrice);
}
//afficher la quantiter Total
function displayTotalQuantity(products) {
  let totalQuantity = 0;
  products.forEach((product) => {
  
    totalQuantity += Number(product.quantity);
  
  });
  document.getElementById(`totalQuantity`).innerText = totalQuantity;
}
// ecoute du bouton suprimer
function listenDeleteProduct(products, productsInCart) {
  products.forEach((product) => {
    document
      .getElementById(`delete-button-${product._id}-${product.color}`)
      .addEventListener("click", function () {
        let confirm = window.confirm( "Etes vous sûr de vouloir supprimer L'article " + product.name + " de couleur " +product.color + " ?");
        if (confirm){
          deleteProduct(product, productsInCart);
 
        }
       
      });
  });
}
function deleteProduct(product, productsInCart) {
  let index = productsInCart.findIndex((element) => element.id == product.id && element.color == product.color);
  console.log(index);
  productsInCart.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productsInCart));
  document.getElementById(`${product._id}-${product.color}`).remove();
  location.reload();
}
//ecoute du de la quantiter du produit
function listenChangeQuantity(products, productsInCart) {
  products.forEach((product) => {
    document.getElementById(`quantity-${product._id}-${product.color}`).addEventListener("change", function () {
      let quantity = Number(this.value)
      if (quantity < 1) {
        alert("Veuillez Choisir une quantitée superieur à 0.");
        quantity = 1;
        this.value = 1;
      } 
      if (quantity > 100) {
        alert("Vous ne pouvez pas choisir une quantité superrieur à 100.");
        quantity = Number(100);
        this.value = 100;
      } 
      let filterProduct = productsInCart.find((productInCart) => productInCart.id == product._id && productInCart.color == product.color);
      filterProduct.quantity = Number(quantity);
      product.quantity = Number(quantity);
      localStorage.setItem("products", JSON.stringify(productsInCart));
      displayTotalQuantity(products);
      displayTotalPrice(products);
    });
  });
}