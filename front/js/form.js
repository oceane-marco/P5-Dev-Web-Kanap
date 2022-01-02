//* formulaire
let form = []
let lastName =  { 
  element : document.getElementById("lastName"),
  regex : "^[A-Z][A-Za-ëïzéèê\\-]+$", 
  ErrorMsg : document.getElementById("lastNameErrorMsg"),
  message : "Invalide, veuillez entrée vortre nom avec un majuscule au debut et au moins 3 lettres.",
 };
let firstName = {
  element: document.getElementById("firstName"),
  regex: "^[A-Z][A-Za-ëïzéèê\\-]{2,}$",
  ErrorMsg: document.getElementById("firstNameErrorMsg"),
  message : "Invalide, veuillez entrée vortre prénom avec une majuscule au debut et au moins 3 lettres.",
 };
let address = {
  element: document.getElementById("address"),
  regex: "[0-9-A-Za-zëïéèê\\-]\\s",
  ErrorMsg: document.getElementById("addressErrorMsg"),
  message: "Invalide, veuillez entrée une addresse.",
};
let city = {
  element: document.getElementById("city"),
  regex: "^[A-Z][A-Za-ëïzéèê-]+$",
  ErrorMsg: document.getElementById("cityErrorMsg"),
  message : "Invalide, veillez entrez un nom de ville comme: Paris"
 };
let email = {
  element: document.getElementById("email"),
  regex: "^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+.([A-Za-z]{2,4})$",
  ErrorMsg: document.getElementById("emailErrorMsg"),
  message: "Veuillez entrer une adresse e-mail valide, exemple : email@domain.com",
};
form.push( firstName,lastName, address, city, email)

// écoute des formulaire

form.forEach((elt) =>{ 
  elt.element.addEventListener("change", function () {
    if (!valid(elt.element, elt.regex)) {
      showErr( elt.ErrorMsg, elt.message);
    } else {
      showValid(elt.ErrorMsg);
    }
  });
});

//envoyer les donner
document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();
  let elementisvalid = 0; 
  form.forEach((elt) => { 
    if (valid(elt.element, elt.regex)){
   return elementisvalid += 1
  } 
 });
 if (elementisvalid < 5) {
   alert("veuillez remplir le formulaire");
   return;
 }
  console.log("le formulaire est bon");
  //mettre toutes les information dans un tableau
  let products = JSON.parse(localStorage.getItem("products"));
  let ids = products.map((product) => product.id);
  console.log(ids);
  let payload = {
    products: ids,
    contact: {
      firstName: firstName.element.value,
      lastName: lastName.element.value,
      address: address.element.value,
      city: city.element.value,
      email: email.element.value,
    }
  };
  console.log(payload);
  // netoyer le local storage
  localStorage.clear();
  // envoyer les donner au local storage 
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    // recuperé orderId et rediriger vers la page confirmation
    .then((res) => res.json())
    .then(function (response) {
      window.location.assign("confirmation.html?orderId=" + response.orderId);
    });
});
//* fonction
// verifier les element mis dans le formulaire
function valid(element, regextxt) { 
  let regex = new RegExp(`${regextxt}`);
  console.log(regex.test(element.value));
  if (regex.test(element.value)) {
   return true;
  }
  return false;
}

// message de validation du formulaire

function showErr(ErrorMsg, message) {
  console.log(ErrorMsg);
  console.log(message);
  ErrorMsg.style.display = "unset";
  ErrorMsg.textContent = `${message}`;
}

function showValid(ErrorMsg) {
  ErrorMsg.style.display = "none";
}
