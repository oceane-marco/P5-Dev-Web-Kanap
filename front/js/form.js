//* formulaire
let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let adress = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
// écoute des formulaire
firstName.addEventListener("change",function() {
  if (!validFirstName()){
    
    showErr(
      "firstName",
      "Invalide, veuillez entrée vortre prénom avec une majuscule au debut et au moins 3 lettres."
    );
  }
  showValid("firstName")
});
lastName.addEventListener("change", function () {
  if (!validLastName()) {
    showErr(
      "lastName",
      "Invalide, veuillez entrée vortre nom avec un majuscule au debut et au moins 3 lettres."
    );
  };
  showValid("lastName");
});
adress.addEventListener("change", function () {
  if (!validAddress()) {
    showErr(
      "adress",
      "Invalide, veuillez entrée une addresse."
    );
  }
  showValid("adress");
});
city.addEventListener("change", function () {
  if (!validCity()) {
    showErr(
      "city",
      "Invalide, veillez entrez un nom de ville comme: Paris"
    );
  }
  showValid("city");
});
email.addEventListener("change", function () {
  if (!validEmail()) {
    showErr(
      "email",
      "Veuillez entrer une adresse e-mail valide, exemple : email@domain.com"
    );
  }
  showValid("email");
});

/// si tout  renvoi true alors on envoie le formulaire.
document.getElementById("order").addEventListener( 'click', function(e) {
  e.preventDefault();
  if ( !validFirstName() || !validLastName() || !validAddress() || !validCity() || !validEmail()){
   alert("veuillez remplir le formulaire");
   return
  }
  console.log('le formulaire est bon')
  let products = JSON.parse(localStorage.getItem("products"));
  let ids = products.map(product => product.id)
  console.log(ids);
  let payload = {
    products: ids,
    contact: {
      firstName: firstName.value ,
      lastName : lastName.value,
      address : adress.value,
      city : city.value,
      email : email.value
    }
  }

 fetch("http://localhost:3000/api/products/order",{
    method: 'POST',
    headers:{
      'accept': 'application/json' ,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  // recuperé orderId et rediriger vers la page confirmation
  .then((res) => res.json())
  .then(function (response) {
    window.location.assign("confirmation.html?orderId=" + response.orderId);
  });

});
//1 verifier les element mis dans le formulaire
function validFirstName() {
  let valide = false;
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]{3,}$");
  console.log(regex.test(firstName.value));
  if (regex.test(firstName.value)) {
    valide = true;
  } 
  return valide
}
function validLastName() { 
  let valide = false;
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê\\-]+$");
  console.log(regex.test(lastName.value));
  if (regex.test(lastName.value)) {
    valide = true;
  } 
 return valide;
};

function validAddress() { 
  
  let valide = false;
  let regex = new RegExp("[0-9-A-Za-z]{3,}\\s"); 
  console.log(regex.test(adress.value));
  if (regex.test(adress.value)) {
    valide = true;
  } 
  return valide;
}
function validCity() { 
  let valide = false;
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]+$");
  console.log(regex.test(city.value));
  if (regex.test(city.value)) {
    valide = true;
  }
  return valide;
}

function validEmail() {   
  let valide = false;
  let regex = new RegExp("^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+.([A-Za-z]{2,4})$");
  console.log(regex.test(email.value));
  if (regex.test(email.value)) {
  valide = true;
  } 
  return valide
}
// message de validation du formulaire

function showErr(element, message) {
  console.log(document.getElementById(`${element}ErrorMsg`));
  console.log(message);
  document.getElementById(`${element}ErrorMsg`).style.display = "initial";
  document.getElementById(`${element}ErrorMsg`).textContent = `${message}`;
}

function showValid(element){
  document.getElementById(`${element}ErrorMsg`).style.display = "none";
}