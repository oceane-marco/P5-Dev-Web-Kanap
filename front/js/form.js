//* formulaire
/// si tout ça renvoi true alors on envoie le formulaire.
document.getElementById("order").addEventListener( 'click', function(e) {
  if ( firstName() && lastName() && address() && city() && email()){
   e.preventDefault;
   creatArrayOrder();
   console.log(order);
  }else {
   e.preventDefault;
   alert("veuillez remplir le formulaire");
  }
});
//1 verifier les element mis dans le formulaire
function firstName() {
  let firstName = false;
  document.getElementById("firstName").addEventListener("change", function() {
    let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]{3,}$");
    console.log(regex.test(this.value));
    if (regex.test(this.value)) {
      document.getElementById("firstNameErrorMsg").style.display = "none";
      firstName = true;
    } else {
      document.getElementById("firstNameErrorMsg").style.display = "initial";
      document.getElementById("firstNameErrorMsg").innerText =
        "Invalide, veuillez entrée vortre prénom avec une majuscule au debut et au moins 3 lettres.";
    }
  });
  return firstName
}
function lastName() { 
  let lastName = false;
  document.getElementById("lastName").addEventListener("change", function () {
    let regex = new RegExp("^[A-Z][A-Za-ëïzéèê\\-]+$");
    console.log(regex.test(this.value));
    if (regex.test(this.value)) {
      document.getElementById("firstNameErrorMsg").style.display = "none";
      lastName = true;
    } else {
      document.getElementById("firstNameErrorMsg").style.display = "initial";
      document.getElementById("lastNameErrorMsg").innerText =
        "Invalide, veuillez entrée vortre prénom avec un majuscule au debut et au moins 3 lettres.";
    }
  });  
 return lastName;
};
//! trouver la bonne regex
function address() { 
  
  let address = false;

  document.getElementById("address").addEventListener("change", function() {
    let regex = new RegExp(""); 
    
    if (regex.test(this.value)) {
      console.log(regex.test(this.value));
      document.getElementById("firstNameErrorMsg").style.display = "none";
      address = true;
    } else {
      document.getElementById("firstNameErrorMsg").style.display = "initial";
      document.getElementById("addressErrorMsg").innerText = "veillez entrées une adresse dans le format : 18 rue des boulanger";
    }
  });
  return address;
}
function city() { 
  let city = false;

  document.getElementById("city").addEventListener("change", function () {
    let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]+$");
    console.log(regex.test(this.value));
    if (regex.test(this.value)) {
      document.getElementById("cityErrorMsg").style.display = "none";
      city = true;
    } else {
      document.getElementById("firstNameErrorMsg").style.display = "initial";
      document.getElementById("cityErrorMsg").innerText = "invalide";
    }
  });
  return city;
}
function email() {   
  let email = false;
  document.getElementById("email").addEventListener("change", function () {
    let regex = new RegExp(
      "^([A-Za-z0-9_\\-\\.])+@([A-Za-z0-9_\\-\\.])+.([A-Za-z]{2,4})$"
    );
    console.log(regex.test(this.value));
    if (regex.test(this.value)) {
      document.getElementById("firstNameErrorMsg").style.display = "none";
      email = true;
    } else {
      document.getElementById("firstNameErrorMsg").style.display = "initial";
      document.getElementById("emailErrorMsg").innerText =
        "Veuillez entrer une adresse e-mail valide, exemple : email@domain.com";
    }
  });
  return email
}
// function creatArrayOrder() {
//   let order = [];
 
//   let firstName = document.getElementById("firstName").value;
//   let lastName = document.getElementById("lastName").value;
//   let address = document.getElementById("address").value;
//   let city = document.getElementById("city").value;
//   let email = document.getElementById("email").value;

//   let userInformation = { firstName, lastName, address, city, email };
//   let productsOrder = JSON.parse(localStorage.getItem("products"));

//   order.push(userInformation, productsOrder)
//   return order
// }