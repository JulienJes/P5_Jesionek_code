// Récupération de l'URL via la page courante
var str = window.location.href;
var url = new URL(str);

// Récupération de l'id du produit
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération du produit via l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (showAPI) {
        article = await showAPI;
        console.table(article);
        if (article){
            getPost(article); // Appel de la fonction d'affichage des éléments du produit
        }
    })
    .catch((error) => {
        error = "Erreur de chargement, veuillez rafraichir la page"
        console.log(error);
        alert(error);
    })
}
    
function getPost(article){ // Fonction d'affichage des éléments du produit (même méthode que index)
    
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Gestion des couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article); // Appel de la fonction d'ajout de produit au panier
}

function addToCart(article) { // Fonction d'ajout du produit au panier
    const orderBtn = document.querySelector("#addToCart");

    orderBtn.addEventListener("click", (event)=>{ // Ecoute de l'évennement "Ajouter au panier"
        event.preventDefault;
        
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && colorPicked.value != 0) { // Conditions quantité entre 1 et 100 & couleur non null
        let newColorPicked = colorPicked.value;
        let newQuantityPicked = quantityPicked.value;

        let infoProduct = {
            idProductToBeStored: idProduct,
            colorsProductToBeStored: newColorPicked,
            quantityProductToBeStored: Number(newQuantityPicked),
            nameProductToBeStored: article.name,
            priceProductToBeStored: article.price,
            descriptionProductToBeStored: article.description,
            imgProductToBeStored: article.imageUrl,
            altimgProductToBeStored: article.altTxt
        };
        
        let productLocalStorage = JSON.parse(localStorage.getItem("item")); //Initialisation du local storage

        const popupConfirmation =() =>{ // Pop-up pour rediriger vers le panier ou non
            if(window.confirm(`Votre commande de ${newQuantityPicked} ${article.name} ${newColorPicked} a été ajoutée au panier. Pour le consulter, cliquez sur OK`)){
                window.location.href ="cart.html";
        }
    }

    // Importation dans le localStorage
    if (productLocalStorage) { // Si le localStorage n'est pas vide alors
    const resultFind = productLocalStorage.find((el) => el.idProductToBeStored === idProduct && el.colorsProductToBeStored === newColorPicked); // Le produit ajouté correspond-il au produit déjà présent?
        if (resultFind) { // Si le produit est le même
            let newQuantity = parseInt(infoProduct.quantityProductToBeStored) + parseInt(resultFind.quantityProductToBeStored); // On détermine une nouvelle quantité pour ce même produit
            resultFind.quantityProductToBeStored = newQuantity;
            localStorage.setItem("item", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        }else { // S'il s'agit d'un nouveau produit
            productLocalStorage.push(infoProduct); // On push le nouveau produit, plus simplement
            localStorage.setItem("item", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        }
    }else { // Sinon, c'est que le panier est vide
        productLocalStorage = [];
        productLocalStorage.push(infoProduct);
        localStorage.setItem("item", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
    }}else { // Sinon, erreur, c'est que les conditions ne sont pas remplies
        alert("Veuillez choisir une quantité entre 1 & 100 ainsi qu'une couleur pour ce produit");
        console.log("Information(s) manquante(s) : Quantité et/ou Couleur")
    }
    });
}