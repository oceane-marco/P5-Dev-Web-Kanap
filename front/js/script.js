fetch("http://localhost:3000/api/products/")
  .then((res) => res.json())
  .then(function (products) {
    console.log(products);
    products.forEach((product) => {
      document.getElementById("items").innerHTML += render(product);
    });
  });

function render(product) {
  return `
    <a href="./product.html?id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt=${product.altTxt}>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a> 
  `;
}
