let products = [];
products = JSON.parse(localStorage.getItem("products"));

/* 1 recuperé les donner dans le local. 
   2 recuperé les donner de l'api pour chaque produits)
*/

for (i = 0; i < products.length; i++) {
  let quantity = products[i].quantity;
  let color = products[i].color;
  fetch(`http://localhost:3000/api/products/${products[i].id}`)
    .then((res) => res.json())
    .then(function (product) {
      displayProduct(product, quantity, color);
      console.log(product);
      return products;
    });
}


function displayProduct(product, quantity, color){
    document.getElementById("cart__items").innerHTML += `
     <article class="cart__item" data-id="${product._id}">
     <div class="cart__item__img">
     <img src=${product.imageUrl} alt=${product.altTxt}>
      </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price}€</p>
                    <p>${color}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    
}