//* formulaire
//1 verifier les element mis dans le formulaire
document.getElementById("firstName").addEventListener("change", function () {
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]+$");
  if (regex.test(this.value)) {
    console.log(regex.test(this.value));
    return true;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "invalide , veuillez entré vortre prénom ";
  }
});
document.getElementById("lastName").addEventListener("change", function () {
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]+$");
  if (regex.test(this.value)) {
    console.log(regex.test(this.value));
    return true;
  } else {
    document.getElementById("lastNameErrorMsg").innerText = "invalide";
  }
});
document.getElementById("address").addEventListener("change", function () {
  let regex = new RegExp("");
  if (regex.test(this.value)) {
    console.log(regex.test(this.value));
    return true;
  } else {
    document.getElementById("addressErrorMsg").innerText = "invalide";
  }
});
document.getElementById("city").addEventListener("change", function () {
  let regex = new RegExp("^[A-Z][A-Za-ëïzéèê-]+$");
  if (regex.test(this.value)) {
    console.log(regex.test(this.value));
    return true;
  } else {
    document.getElementById("cityErrorMsg").innerText = "invalide";
  }
});
document.getElementById("email").addEventListener("change", function () {
  let regex = new RegExp("^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$");
  console.log(regex.test(this.value));
  if (regex.test(this.value)) {
    
    return true;
  } else {
    document.getElementById("emailErrorMsg").innerText =
      "Veuillez entrer une adresse e-mail valide, exemple : email@domain.com";
  }
});