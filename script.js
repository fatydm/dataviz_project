// import {scene} from './visualmap.js';

const itemCount = 22;
const batchSize = 4;
let currentBatchStart = 1;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function animateBatch(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.querySelector(`.item-${i}`);

        const randomColor = getRandomColor();

        //     0%, 15% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 20}%; opacity: 0; }
        //     15%, 30% {left: ${Math.random() * 100}%; top: ${Math.random() * 50}%; opacity: 0.5; }
        //     30%, 50% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 50}%; opacity: 1; }
        //     50%, 70% { left: ${Math.random() * 100}%;top: ${Math.random() * 50}%; opacity: 0.5; }
        //     70%, 85% { left: ${Math.random() * 100}%; bottom: ${Math.random() * 50}%; opacity: 1; }
        //     90%, 100% { left: ${Math.random() * 100 + 100}%; bottom: ${Math.random() * 50}%; opacity: 0; }
        // }`;

        const keyframes = `@keyframes anim-${i} {
            0%, 15% {
                left: ${Math.random() * -50}%; 
                bottom: ${Math.random() * 20}%; 
                opacity: 0;
            }
            15%, 30% {
                left: ${Math.random() * 100}%; 
                top: ${Math.random() * 50}%; 
                opacity: 0.5;
            }
            30%, 50% {
                left: ${Math.random() * 100}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 1;
            }
            50%, 70% {
                left: ${Math.random() * 80}%; 
                top: ${Math.random() * 50}%; 
                opacity: 0.5;
            }
            70%, 85% {
                left: ${Math.random() * 20}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 1;
            }
            90%, 100% {
                left: ${Math.random() * 120 + 80}%; 
                bottom: ${Math.random() * 50}%; 
                opacity: 0;
            }
        }`;


        const styleSheet = document.createElement("style");
        styleSheet.innerText = keyframes;

        const tongueTransition = document.getElementById('tongue_transitions')
        tongueTransition.appendChild(item)
        tongueTransition.appendChild(styleSheet);

        item.style.animationName = `anim-${i}`;
        item.style.opacity = 1;
    }
}

function fadeOutBatch(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.querySelector(`.item-${i}`);
    item.style.opacity = 0; // Faire disparaître l'élément
    }
}

function animateNextBatch() {
    const batchEnd = Math.min(currentBatchStart + batchSize - 1, itemCount);
    if (currentBatchStart > 1) {

        // Faire disparaître le lot précédent
        const prevBatchStart = currentBatchStart - batchSize;
        const prevBatchEnd = batchEnd - batchSize;
        fadeOutBatch(prevBatchStart, prevBatchEnd);
    }
    animateBatch(currentBatchStart, batchEnd);
    currentBatchStart = batchEnd + 1;
    if (currentBatchStart <= itemCount) {
        setTimeout(animateNextBatch, 20000);
    }
}
animateNextBatch();







// async function obtenerRecetasPorArea(area) {
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
//     const respuesta = await fetch(url);
//     const data = await respuesta.json();

//     for (let i = 0; i < data.meals.length; i++) {

//         const divRecipes = document.createElement("div");

//         divRecipes.innerHTML = `
//             <h2>${data.meals.length} recettes</h2>
//             <h3>${data.meals[i].strMeal}</h3>
//             <img src="${data.meals[i].strMealThumb}">
//         `;
//         document.body.appendChild(divRecipes);
//     }
// }

// obtenerRecetasPorArea("Mexican");
// obtenerRecetasPorArea("Italian");



// async function rechercherChansons(genre, pays, cleApi) {
//     const requete = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${genre} music ${pays}&type=video&key=${cleApi}&maxResults=5`);
//     const reponse = await requete.json();

//     if (reponse.items) {
//         return reponse.items.map((item) => ({
//             // map va a buscar cada letra en los objetos para ver si corresponde
//             titre: item.snippet.title.slice(0, 20),
//             miniature: item.snippet.thumbnails.default.url,
//             link: `https://www.youtube.com/watch?v=$${item.id.videoId}`, 
//         }));
//     } else {
//         return [];
//     }
// }

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