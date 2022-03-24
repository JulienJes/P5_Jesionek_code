// Récupératon de l'URL via la page courante
const str = window.location.href;
console.log(str);
const url = new URL(str);

// Récupération de l'id de l'article
const idProduct = url.searchParams.get("id");
console.log(idProduct);

// Récupération de l'article depuis l'API
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(showAPI) {
        const article = showAPI;
        console.table(article);

        // Affichage des éléments du porduit sur la page (même méthode que index)
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src= article.imageUrl;
        productImg.alt= article.altTxt;

        let productName = document.getElementById('title');
        productName.innerHTML = article.name;

        let productPrice = document.getElementById('price');
        productPrice.innerHTML = article.price;

        let productDescription = document.getElementById('description');
        productDescription.innerHTML = article.description;

        // Gestion des couleurs du produit
        for (let colors of article.colors){
            let productColor = document.createElement("option");
            document.querySelector("#colors").appendChild(productColor);
            productColor.value = colors;
            productColor.innerHTML = colors;
        }
    })
    .catch(function(error) {
        console.log(error);
        alert("Un problème technique empêche le chargement" + "des informations du produit, veuillez" + "recharger la page."); // un pop-up s'affiche en cas d'erreur de chargement
    });

// Vérification: y a-t-il quelque chose dans le localstorage?
const myStockageJson = localStorage.getItem("item");
const myStockageJs = JSON.parse(myStockageJson);

console.log(myStockageJs);

let myCart=[ { // On imagine le panier comme un array
        id : " ",
        quantity: 0,
        color: " "
}];    

// Ajout du/des produit(s) au panier
// Récupération quantité, couleurs & id
document.getElementById("addToCart").addEventListener("click", function() { // On écoute le clique sur le bouton
    let quantityPicked = Number(document.getElementById("quantity").value); // Récupération quantité
    let colorsPicked = document.getElementById("colors").value; // Récupération couleurs
    let idPicked = idProduct; // Récupération id

    if (quantityPicked > 0 && quantityPicked <= 100 && colorsPicked != "--SVP, choisissez une couleur --") { // Vérification choix de la quantité et des couleurs
        alert("Vous avez bien choisi une couleur ainsi qu'une quantité pour ce produit.");
        if(myStockageJs) {
            if(myStockageJs.lenght === 0) {
                console.log("le panier est vide");
                alert("le panier est vide");

                myCart=[ {
                    id : idPicked,
                    quantity : quantityPicked,
                    colors : colorsPicked,
                }];

                let myCartJson = JSON.stringify(myCart); // On transforme l'objet JS en JSON
                localStorage.setItem("item", myCartJson); // On le stocke dans le localStorage
            }else {
                let addArticle = false;
                for (let i=0; i<myStockageJs.lenght; i++) { // Ajout de produit tant que i est compris entre 0 et le nombre de colonnes dans l'array
                    let idProductAlreadyPicked = myStockageJs[i].id;
                    let colorsProductAlreadyPicked = myStockageJs[i].colors;
                    if(idProductAlreadyPicked === idPicked && colorsProductAlreadyPicked === colorsPicked) {
                        myStockageJs[i].quantity = Number(mystockageJS[i].quantity) + quantityPicked;
                        addArticle = true;

                        myStockageJson = JSON.stringify(myStockageJs);
                        localStorage.setItem("item", monPanierJson);
                    }else {
                        
                    }
                }
                if(addArticle === false){ // ce code ne s'exécute pas si addArticle === true, il s'agit d'ajouter un produit non existant dans le panier
                    myCart.push( 
                        {
                            id : idPicked,
                            quantity : quantityPicked,
                            colors : colorsPicked,
                        }
                    );
                    let myCartJson = JSON.stringify(myStockageJs);
                    localStorage.setItem("item", myCartJson);
                }
            }
            console.table(myCart);
        }else{
            myCart=[ {
                id : idPicked,
                quantity : quantityPicked,
                colors : colorsPicked,
            }];
            let myCartJson = JSON.stringify(myCart); // On transforme l'objet JS en JSON
            localStorage.setItem("item", myCartJson); // On le stocke dans le localStorage
        }
    }else {
        alert("Veuillez choisir une couleur ainsi qu'une quantité pour ce produit.")
        console.log("Choisissez une couleur & une quantité");
    }
})