let productsFromLocalStorage = JSON.parse(localStorage.getItem("item")); // Initiatisation du localStorage
const showEmptyCart = document.querySelector("#cart__items"); // Indique la position de l'affichage d'un panier vide
console.table(productsFromLocalStorage);

function getCart() { // Fonction d'obtention du panier via le localStorage et de création des éléments HTML pour afficher les produits
    if (productsFromLocalStorage === null || productsFromLocalStorage == 0){ // Code si le panier est vide
        const emptyCart = '<p>Votre panier est vide</p>';
        showEmptyCart.innerHTML = emptyCart;
        const commandBtn = document.getElementById("order");
        commandBtn.addEventListener("click", (event)=>{ // Ecoute du clique sur le bouton "Ajouter au panier"
        event.preventDefault();
        alert("Votre panier est vide.");
        });
    }else { // Code si des produits se trouvent dans le panier
        for (let item in productsFromLocalStorage) { // Insertion des éléments HTML pour chaque produit
            
            let productArticle = document.createElement("article"); // Article par ID et par couleur(s)
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productsFromLocalStorage[item].idProductToBeStored);
            productArticle.setAttribute("data-color", productsFromLocalStorage[item].colorsProductToBeStored);

            let productDivImg = document.createElement("div"); // Div de l'image
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            let productImg = document.createElement("img"); // Image du produit
            productDivImg.appendChild(productImg);
            productImg.src = productsFromLocalStorage[item].imgProductToBeStored;
            productImg.alt = productsFromLocalStorage[item].altimgProductToBeStored;

            let productItemContent = document.createElement("div"); // Div des infos principales du produit
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            let productItemContentDescription = document.createElement("div"); // Div de la description du produit
            productItemContent.appendChild(productItemContentDescription);
            productItemContentDescription.className = "cart__item__content__description";

            let productName = document.createElement("h2"); // Nom du produit
            productItemContentDescription.appendChild(productName);
            productName.innerHTML = productsFromLocalStorage[item].nameProductToBeStored; 

            let productColors = document.createElement("p"); // Couleur(s)
            productItemContentDescription.appendChild(productColors);
            productColors.innerHTML = productsFromLocalStorage[item].colorsProductToBeStored;

            let productPrice = document.createElement("p"); // Prix
            productItemContentDescription.appendChild(productPrice);
            productPrice.innerHTML = productsFromLocalStorage[item].priceProductToBeStored + " €"; 

            let productItemContentSettings = document.createElement("div"); // Div gestion de quantité
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            let productItemContentSettingsQuantity = document.createElement("div"); // Div de la quantité sélectionnée
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQuantityParagraph = document.createElement("p"); // Paragraphe de la quantité selectionnée
            productItemContentSettingsQuantity.appendChild(productQuantityParagraph);
            productQuantityParagraph.innerHTML = "Qté : ";

            let productQuantity = document.createElement("input"); // Input de la quantité
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productsFromLocalStorage[item].quantityProductToBeStored;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            let productItemContentSettingsDelete = document.createElement("div"); // Div de la partie "supprimer"
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productSupprimer = document.createElement("p"); // Paragraphe "supprimer"
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }
}
getCart();

function getTotals() { // Fonction de calcul des totaux (quantité et prix totaux)

    // Récupération du total des quantités
    let itemsQuantity = document.getElementsByClassName('itemQuantity'); // Récupération quantité via la class de l'élément
    let arrayLength = itemsQuantity.length; // Récupération du nombre de colonne de l'array
    let totalQuantity = 0; // Valeur de base de la quantité

    for (let i = 0; i < arrayLength; ++i) { // Boucle pour parcourir l'ensemble de l'array
        totalQuantity += itemsQuantity[i].valueAsNumber; // On additionne les valeurs de chaque itération
    }

    let productTotalQuantity = document.getElementById('totalQuantity'); // On affiche la quantité globale
    productTotalQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity);

    // Récupération du prix total
    let totalPrice = 0; // Valeur de base du prix total

    for (let i = 0; i < arrayLength; ++i) { // Boucle pour parcourir l'ensemble de l'array
        totalPrice += itemsQuantity[i].valueAsNumber * productsFromLocalStorage[i].priceProductToBeStored; // Le prix total reprend les quantités et multiplie par le prix unitaire de chaque produit
    }

    let productsTotalPrice = document.getElementById('totalPrice');
    productsTotalPrice.innerHTML = totalPrice; // On affiche le prix total
    console.log(totalPrice);
}
getTotals();

function modifyQuantity() { // Fonction de modification de la quantité
    let quantityToBeModified = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityToBeModified.length; i++){
        quantityToBeModified[i].addEventListener("change" , (event) => { // Ecoute de l'évennement "changement de la quantité du produit"
            event.preventDefault();

            let quantityModified = productsFromLocalStorage[i].quantityProductToBeStored;
            console.log(quantityModified);
            let quantityModifiedValue = quantityToBeModified[i].valueAsNumber;
            console.log(quantityModifiedValue);
            
            const resultFind = productsFromLocalStorage.find((el) => el.quantityModifiedValue !== quantityModified);
            console.log(resultFind);

            resultFind.quantityProductToBeStored = quantityModifiedValue;
            productsFromLocalStorage[i].quantityProductToBeStored = resultFind.quantityProductToBeStored;
            console.log(resultFind);

            localStorage.setItem("item", JSON.stringify(productsFromLocalStorage));
        
            location.reload(); // Rafraichissement après modification
        })
    }
}
modifyQuantity();

function deleteProduct() { // Fonction de suppression d'un produit
    let deleteBtn = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < deleteBtn.length; i++){
        deleteBtn[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productsFromLocalStorage[i].idProductToBeStored;
            let colorDelete = productsFromLocalStorage[i].colorsProductToBeStored;

            productsFromLocalStorage = productsFromLocalStorage.filter( el => el.idProductToBeStored !== idDelete || el.colorsProductToBeStored !== colorDelete );
            
            localStorage.setItem("item", JSON.stringify(productsFromLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Produit supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

var firstNameOk = false;
var lastNameOk = false;
var addressOk = false;
var cityOk = false;
var emailOk = false;

function getForm() { // Fonction de gestion du formulaire
    let form = document.querySelector(".cart__order__form"); // Selection du formulaire

    let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; // RegEx pour l'adresse mail
    let addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/; // RegEx pour l'adresse postale
    let charRegExp = /^[a-zA-Z ,.'-]+$/; // RegEx pour tous les champs de caractères sans chiffre (prénom, nom, etc)

    // Ecoute des saisies de chaque input du formulaire
    form.firstName.addEventListener("change", function() {
        validFirstName(this);
    });
    form.lastName.addEventListener("change", function() {
        validLastName(this);
    });
    form.address.addEventListener("change", function() {
        validAddress(this);
    });
    form.city.addEventListener("change", function() {
        validCity(this);
    });
    form.email.addEventListener("change", function() {
        validEmail(this);
    });

    const validFirstName = function(inputFirstName) { // Validation du prénom
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = " ";
            firstNameOk = true;
        } else {
            firstNameErrorMsg.innerHTML = "Veuillez renseigner une valeur correcte pour ce champ.";
        }
    };
    const validLastName = function(inputLastName) { // Validation du nom
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = " ";
            lastNameOk = true;
        } else {
            lastNameErrorMsg.innerHTML = "Veuillez renseigner une valeur correcte pour ce champ.";
        }
    };
    const validAddress = function(inputAddress) { // Validation de l'adresse
        let addressErrorMsg = inputAddress.nextElementSibling;
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = " ";
            addressOk = true;
        } else {
            addressErrorMsg.innerHTML = "Veuillez renseigner une valeur correcte pour ce champ.";
        }
    };
    const validCity = function(inputCity) { // Validation de la ville
        let cityErrorMsg = inputCity.nextElementSibling;
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = " ";
            cityOk = true;
        } else {
            cityErrorMsg.innerHTML = "Veuillez renseigner une valeur correcte pour ce champ.";
        }
    };
    const validEmail = function(inputEmail) { // Validation de l'adresse mail
        let emailErrorMsg = inputEmail.nextElementSibling;
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = " ";
            emailOk = true;
        } else {
            emailErrorMsg.innerHTML = "Veuillez renseigner une adresse email pour ce champ.";
        }
    };
}
getForm();

function postForm(){ // Fonction d'envoi des informations saisies dans le localStorage
    const commandBtn = document.getElementById("order");

    commandBtn.addEventListener("click", (event)=>{ // Ecoute du clique sur le bouton "Ajouter au panier"
        event.preventDefault();

        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAdress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputMail = document.getElementById("email");

        //Construction d'un array dans le local storage
        
        if (firstNameOk == true && lastNameOk == true && addressOk == true && cityOk == true && emailOk == true){ // On vérifie que l'intégralité du formulaire est bien rempli
            let idProducts = [];
            for (let i = 0 ; i < productsFromLocalStorage.length ; i++) {
                idProducts.push(productsFromLocalStorage[i].idProductToBeStored);
            }

            const order = {
                contact : {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            } 
            console.log(order);

            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            };
            console.log(options);

            fetch("http://localhost:3000/api/products/order", options)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("message data",data);
                localStorage.clear(); // Clear des produits du localStorage
                localStorage.setItem("orderId", data.orderId); // Ajout du numéro de commande dans le localStorage

                //document.location.href = "confirmation.html"; // Redirection vers la page de confirmation
            })
            .catch((error) => {
                error = "Erreur de chargement, veuillez rafraichir la page"
                console.log(error);
                alert(error);
            });
        }else {
            alert("Veuillez vérifier le formulaire, tous les champs sont obligatoires");
        }
    })
}
postForm();