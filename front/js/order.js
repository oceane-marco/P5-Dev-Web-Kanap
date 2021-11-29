// Validation de la commende 
let orderID = getOrderId();
//afficher OrderID
document.getElementById("orderId").textContent = orderID;
//*fonction
// récuperé orderID dans l'url
function getOrderId() {
  return new URL(location.href).searchParams.get("orderId");
}
