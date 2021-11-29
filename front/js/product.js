// variable :
let id = getProductId();
//* séario
//recuperé le produit avec sont id dans l'API
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then(function (product) {
      displayProduct(product);
      listenForCardAddition(product);
      return product;
    });

///* fonction
//recuperé id dans l'url
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}
//afficher le produit
function displayProduct(product) {
  const image = document.getElementsByClassName("item__img");

  let productImg = `<img src=${product.imageUrl} alt=${product.altTxt}></img>`;
  image[0].innerHTML = productImg;

  const h1 = document.getElementById("title");
  h1.innerText = product.name;

  const price = document.getElementById("price");
  price.innerText = formatter.format(product.price);

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
// recuperé les donner entré par l'utilisateur et le mettre dans le localstorage
function listenForCardAddition(product) {
  document.getElementById("addToCart").addEventListener("click", function () {
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    

    if (quantity < 1) {
      return alert("Veuillez Choisir une quantitée superieur à 0.");
    }
    if (color == "") {
      return alert("Veuiller choisir une couleur");
    }

    let product = { id, color, quantity };
    let products = [];

    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    console.log(products);

    let productAlreadyInCart = products.find(
      (product) => product.color == color && product.id == id
    );

    if (productAlreadyInCart) {
      productAlreadyInCart.quantity =
        Number(productAlreadyInCart.quantity) + Number(quantity);
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    alert(quantity + " canapés ont était ajouter au panier !");
  });
}