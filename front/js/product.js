function getProductId() {
  return new URL(location.href).searchParams.get("id");
}
productId = getProductId();

function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then(function (products) {
      displayProduct(products);
      return products;
    });
}

getProduct(productId);

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
  // Boucle sur l'array "colors" contenant les couleurs du produits pour incure dans <select>
  for (i = 0; i < product.colors.length; i++) {
    let thisColor = product.colors[i];
    let colorOption = `<option products=${thisColor}>${thisColor}</option>`;
    colorSelector.insertAdjacentHTML("beforeend", colorOption);
  }
}
