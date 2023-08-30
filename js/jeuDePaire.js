let userAnswers = [];
let clickedCards = [];
let allowClick = true;
let cartes = [];
let randomTab = randomizeItems();

let startGameButton = document.getElementById("decouvrir");

function randomizeItems() { // Création d'un tableau avec un ordre aléatoire
    let imagesCartes = [
        "logocss",
        "logocss",
        "logohtml",
        "logohtml",
        "logojs",
        "logojs",
        "logopython",
        "logopython",
        "logoreact",
        "logoreact",
        "logosass",
        "logosass",
    ];
    return imagesCartes.sort(function(a, b) {
        return 0.5 - Math.random()
    });
}

class Card {
    constructor(name, isHidden, hauteur, largeur, div) {
        this.name = name;
        this.isHidden = isHidden;
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.div = div;
    }
}

function createCard(i) { // création de la carte dans le html 
    let div = document.createElement('div');
    let name = randomTab[i];
    div.className = "card questionmark imagescartes";
    div.style.backgroundImage = `url('../images/JeuDePaire/questionmark.png')`; 
    div.title = "?";


    div.addEventListener('click', function() { // Mise en place de l'action de jeu "retourner la carte" au moment du click
        if (allowClick && clickedCards.length < 2) {
            changeCardImage(div, name);
            div.title = (name.replace("logo",""));
        }
    });

    let card = new Card(name, true, 80, 80, div); // création de la carte 
    return card;
}

function addCards() { // ajout des cartes dans la surface de jeu 
    let jeuDePaire = document.getElementById("jeuDePaire");
    for (let i = 0; i < 12; i++) {
        let card = createCard(i);
        cartes.push(card);
        jeuDePaire.appendChild(card.div);
    }
}

function changeCardImage(div, name) { //Changement de l'image sur la carte
    div.style.backgroundImage = `url('../images/JeuDePaire/${name}.png')`;
    registerAnswers(name, div);
}

function registerAnswers(userAnswer, clickedCard) { // enregistrement des réponses de l'utilisateur
    userAnswers.push(userAnswer);
    clickedCards.push(clickedCard);

    if (clickedCards.length === 2) {
        allowClick = false;
        handleAnswers();
    }
}

function handleAnswers() { // gestion des réponses de l'utilisateur 
    setTimeout(function() {
        if (userAnswers[0] !== userAnswers[1]) {
            clearCards();
        }
        clearAnswers();
        
    }, 500);

}

function clearAnswers() { //réinitialisation des réponses 
    userAnswers = [];
    clickedCards = [];
    allowClick = true;
}

function clearCards() { //on retourne les cartes si les réponses de l'utilisateur sont mauvaises
    clickedCards[0].style.backgroundImage = "url('../images/JeuDePaire/questionmark.png')";
    clickedCards[1].style.backgroundImage = "url('../images/JeuDePaire/questionmark.png')"; 
    clickedCards[0].title = "?";
    clickedCards[1].title = "?";
}

startGameButton.addEventListener("click", function() { // Commencer le jeu 
    this.style.display = "none";
    addCards();
});
