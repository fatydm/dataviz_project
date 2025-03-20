async function obtenerRecetasPorArea(area) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
   
    const divRecipes = document.createElement("div");
    divRecipes.innerHTML = `
    <h2>${data.meals.length} recettes</h2>`;

    for (let i = 0; i < data.meals.length; i++) {
         divRecipes.innerHTML += `
        <h3 class="meal-title">${data.meals[i].strMeal}</h3>
        <img class="meal-image" src="${data.meals[i].strMealThumb}">
    `;
    document.body.appendChild(divRecipes);
    }
}

const mexicanButton = document.getElementById("MX")
mexicanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Mexican"))
})

const americanButton = document.getElementsByClassName("United States")
americanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("American"))
})

const britishButton = document.getElementsByClassName("United Kingdom")
britishButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("British"))
})

const canadaButton = document.getElementsByClassName("Canada")
canadaButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Canadian"))
})

const chineseButton = document.getElementsByClassName("China")
chineseButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Chinese"))
})

const croatianButton = document.getElementsById("HR")
croatianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Croatian"))
})

const dutchButton = document.getElementsById("NL")
dutchButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Dutch"))
})

const egyptianButton = document.getElementsById("EG")
egyptianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Egyptian"))
})

const filipinoButton = document.getElementsByClassName("Philippines")
filipinoButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Filipino"))
})

const frenchButton = document.getElementsByClassName("France")
frenchButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("French"))
})

const greeceButton = document.getElementsByClassName("Greece")
greeceButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Greek"))
})

const indianButton = document.getElementsById("IN")
indianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Indian"))
})

const irishButton = document.getElementsById("IE")
irishButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Irish"))
})

const italianButton = document.getElementsByClassName("Italy")
italianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Italian"))
})

const jamaicanButton = document.getElementsById("JM")
jamaicanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Jamaican"))
})

const japanButton = document.getElementsByClassName("Japan")
japanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Japanese"))
})

const kenyanButton = document.getElementsById("KE")
kenyanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Kenyan"))
})

const malaysianButton = document.getElementsByClassName("Malaysia")
malaysianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Malaysian"))
})

const moroccanButton = document.getElementsById("MA")
moroccanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Moroccan"))
})

const polishButton = document.getElementsById("PL")
polishButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Polish"))
})

const portugueseButton = document.getElementsById("PT")
portugueseButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Portuguese"))
})

const russianButton = document.getElementsByClassName("Russian Federation")
russianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Russian"))
})

const spanishButton = document.getElementsById("ES")
spanishButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Spanish"))
})

const thaiButton = document.getElementsById("TH")
thaiButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Thai"))
})

const tunisianButton = document.getElementsById("TN")
tunisianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Tunisian"))
})

const turkishButton = document.getElementsByClassName("Turkey")
turkishButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Turkish"))
})

const ukrainianButton = document.getElementsById("UA")
ukrainianButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Ukrainian"))
})

const uruguayanButton = document.getElementsById("UY")
uruguayanButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Uruguayan"))
})

const vietnameseButton = document.getElementsById("VN")
vietnameseButton.addEventListener("click", function() {
        (obtenerRecetasPorArea("Vietnamese"))
})


async function rechercherChansons(genre, pays, cleApi) {
    const requete = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${genre} music ${pays}&type=video&key=${cleApi}&maxResults=5`);
    const reponse = await requete.json();

    if (reponse.items) {
        return reponse.items.map((item) => ({
            // map va a buscar cada letra en los objetos para ver si corresponde
            titre: item.snippet.title.slice(0, 20),
            miniature: item.snippet.thumbnails.default.url,
            link: `https://www.youtube.com/watch?v=$${item.id.videoId}`, 
        }));
    } else {
        return [];
    }
}

// async function afficherChansons(genre, pays, cleApi) {
//     const chansons = await rechercherChansons(genre, pays, cleApi);
//     if (chansons.length > 0) {
//         chansons.forEach((chanson) => {
//             const divRecipes = document.createElement("div");
//             divRecipes.innerHTML = `
//         <h4>${chanson.titre}</h4>
//         <a href="${chanson.url}" target="_blank">Voir la vidéo</a>
//         <img src="${chanson.miniature}" alt="Miniature de la vidéo">
//          `;
//             document.body.appendChild(divRecipes);
//         });
//     } else {
//         console.log(`Aucune chanson ${genre} trouvée en ${pays}.`);
//     }
// }
// // Exemple d'utilisation
// const genreMusical = 'pop'; // ou 'rock', 'hip-hop', etc.
// const pays = 'France'; // ou 'USA', 'UK', etc.
// const maCleApi = 'AIzaSyAx7Fx7yCkS28Kpz48rdCeRG8G68RJfC1E'; // Remplacez par votre clé API
// afficherChansons(genreMusical, pays, maCleApi);