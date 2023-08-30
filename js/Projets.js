function sliderConstructor(containerId, images, title, lien) {
    // Créez le conteneur du diaporama
    const slideshowContainer = document.createElement("div");
    slideshowContainer.classList.add("slideshow");

    // Créez un élément h2 pour le titre
    const titre = document.createElement("a");
    titre.textContent = title; // Ajoutez le titre souhaité ici
    titre.className = "lienProjet"
    titre.href  = lien;

    // Créez les boutons "Précédent" et "Suivant"
    const prevButton = document.createElement("a");
    prevButton.classList.add("prev");
    prevButton.textContent = "\u25C0"; // Flèche gauche

    const nextButton = document.createElement("a");
    nextButton.classList.add("next");
    nextButton.textContent = "\u25B6"; // Flèche droite

    slideshowContainer.appendChild(titre); // Ajoutez le titre en haut
    slideshowContainer.appendChild(prevButton);
    slideshowContainer.appendChild(nextButton);

    // Créez des éléments pour chaque image
    images.forEach((imageUrl, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = `Image ${index + 1}`;

        slide.appendChild(image);
        slideshowContainer.appendChild(slide);
    });

    // Ajoutez le diaporama au conteneur cible
    const container = document.getElementById(containerId);
    container.appendChild(slideshowContainer);

    // Logique du diaporama
    const slides= slideshowContainer.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].style.display = "none";
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].style.display = "block";
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    // Affiche la première image au chargement de la page
    showSlide(currentSlide);
}

// Création des diapo
const images1 = ["../images/SlideProjet1/maquetteDeskBooki.png", "../images/SlideProjet1/maquetteTelBooki.png",];
sliderConstructor("conteneur", images1,"Booki, site de réservation d'hotel", "https://github.com/Gansuto/Booki");

const images2 = ["../images/SlideProjet2/gameboy.png", "../images/SlideProjet2/portfolio.png",];
sliderConstructor("conteneur", images2, "Portfolio");

