let products = [];
products = JSON.parse(localStorage.getItem("products"));
let allProducts = [];
let totalQuantity = 0;
let totalPrice = 0;

if (products == null || products.length == 0) {
  document.getElementsByTagName("h1")[0].innerText = "Votre panier est vide";
  document.getElementsByClassName("cart").style.display = "none";
 
} else{
    
    findProduct(products);
    console.log(allProducts);
    displayProduct(allProducts);
    // total(allProducts);
    // deleteProduct(allProducts, products);
}

function findProduct(products) {
   products.forEach(element => {
        let quantity = Number(element.quantity);
        let color = element.color;
        let id = element.id;
        fetch(`http://localhost:3000/api/products/${id}`) //* 1 recuperé uniquement les élement qui on le meme id
          .then((res) => res.json())
          .then(function (item) {
            
            let product = {
              id,
              color,
              quantity,
              name: item.name,
              price: item.price,
              img: item.imageUrl,
              description: item.description,
              altTxt: item.altTxt,
            }
            allProducts.push(product);
           return allProducts
          })

   });
}

function displayProduct(allProducts) {
  allProducts.forEach(product => {
     document.getElementById("cart__items").innerHTML += render(product);
  });
    
  
}

function render(product){
    return `
        <article class="cart__item" id="${product.id}">
            <div class="cart__item__img">
                <img src=${product.img} alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${product.name}</h2>
                    <p>${product.price}€</p>
                    <p>${product.color}</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" id="quantity${product.id}" name="itemQuantity" min="1" max="100" value ="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" id="delete-button-${product.id}-${product.color}">Supprimer</p>
                </div>
                </div>
            </div>
        </article>`;
}

// function total(allProducts) {
//   totalQuantity += Number(product.quantity);
//   totalPrice = Number(product.price) * Number(product.quantity);
//   document.getElementById(`totalPrice`).innerText = totalPrice;
//   document.getElementById(`totalQuantity`).innerText = totalQuantity;
// }

// function  deleteProduct(product, products){
//  document.getElementById( `delete-button-${product.id}-${product.color}`).addEventListener("click", function () {
//       let confirm = window.confirm(
//         "Etes vous sûr de vouloir supprimer L'article " + product.name + " de couleur " + products.color + " ?"
//       );
//       if (confirm == true) {
//        let index = products.findIndex(
//          (element) => element.id == product.id && element.color == product.color
//        );
//        products.splice(index, 1);
//        console.log(products);
//        localStorage.setItem("products", JSON.stringify(products));
//        location.reload();
//      }
//    });
 
// };








// console.log(products);
// let totalArticles = 0;
// let totalPrice = 0;

// 1 recuperé les donner dans le local. 
// 2 recuperé les donner de l'api pour chaque produits)
// 
// if (products == null || products.length == 0) {
//   document.getElementsByTagName("h1")[0].innerText = "Votre panier est vide";
//   document.getElementById(`totalPrice`).innerText = totalPrice;
//   document.getElementById(`totalQuantity`).innerText = totalArticles;
// } else {
//   for (i = 0; i < products.length; i++) {
//     let quantity = Number(products[i].quantity);
//     let color = products[i].color;
//     let id = products[i].id;
//     totalArticles += quantity;

//     fetch(`http://localhost:3000/api/products/${products[i].id}`)
//       .then((res) => res.json())
//       .then(function (product) {
//         totalPrice += Number(product.price) * quantity;
//         displayProduct(product, quantity, color, totalPrice);
//         listenForDeletProduct(products, id, color);
//         listenForQuantity(products, quantity);
        
        
//         return product;
//       });
      
      
        
        
//   }
  
// }

// function displayProduct(product, quantity, color ) {
//   document.getElementById("cart__items").innerHTML += `
//     <article class="cart__item" id="${product._id}">
//         <div class="cart__item__img">
//              <img src=${product.imageUrl} alt=${product.altTxt}>
//         </div>
//         <div class="cart__item__content">
//             <div class="cart__item__content__titlePrice">
//                 <h2>${product.name}</h2>
//                 <p>${product.price}€</p>
//                 <p>${color}</p>
//             </div>
//             <div class="cart__item__content__settings">
//             <div class="cart__item__content__settings__quantity">
//                 <p>Qté : </p>
//                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value ="${quantity}">
//             </div>
//             <div class="cart__item__content__settings__delete">
//                 <p class="deleteItem">Supprimer</p>
//             </div>
//             </div>
//          </div>
//     </article>`;
//   document.getElementById(`totalPrice`).innerText = totalPrice;
//   document.getElementById(`totalQuantity`).innerText = totalArticles;
  
// };

// //!résusir a recuperé les bouton suprimer pour les appeler ...
// //* mettre dans une fonction appeler dans le then.
// function listenForDeletProduct(products, id, color) {
//   let deleteItem = document.getElementsByClassName("deleteItem");

//   for (l = 0; l < deleteItem.length; l++) {
//     deleteItem[l].addEventListener("click", function () {
//       let confirm = window.confirm(
//         "Etes vous sûr de vouloir supprimer cet article ?"
//       );
//       if (confirm == true) {
//         products = products.filter(
//           (product) => product.id !== id || product.color !== color
//         );
//         console.log(products);
//         localStorage.setItem("products", JSON.stringify(products));
//         location.reload();
//       }
//     });
//   }
// }

// function listenForQuantity(products, quantity) {
//   let productsQuantity = document.getElementsByClassName("itemQuantity");
 
//   for (l = 0; l < productsQuantity.length; l++) {
 
//     productsQuantity[l].addEventListener("change", function (productsQuantity) {
//       let quantityValue = Number(productsQuantity[l].value); //! ne fonctionne pas !!!!!
//       console.log(quantityValue);
//     });
//  }
// };