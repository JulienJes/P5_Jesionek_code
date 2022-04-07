function getOrderNumber(){ // Fonction d'affichage du numéro de commande
    const orderNumber = document.getElementById("orderId"); // Selection de l'élément par son ID
    orderNumber.innerText = localStorage.getItem("orderId"); // Récupération depuis le localStorage & affichage du numéro de commande
    console.log(localStorage.getItem("orderId"))
    localStorage.clear(); // Clear du localStorage
}
getOrderNumber();