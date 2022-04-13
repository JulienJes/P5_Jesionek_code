var str = window.location.href;
var url = new URL(str);

var orderId = url.searchParams.get("orderId");

if (orderId === null){ // Vérification qu'il y ait bien un numéro de commande, sinon retour à la page d'acceuil
    window.location.href = "./index.html";
}else{
    const orderNumber = document.getElementById("orderId"); // Selection de l'élément par son ID
    orderNumber.innerText = orderId; // Récupération depuis le localStorage & affichage du numéro de commande
    console.log(orderId);
    localStorage.clear(); // Clear du localStorage
}