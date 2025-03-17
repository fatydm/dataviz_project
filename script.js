console.log("coucou");


async function recettes() {
    const url = 'http://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
    const reponse = await fetch(url);
    const data = await reponse.json();
    console.log(data);

    for (let i = 0; i < data.meals.length; i++) {

        const divRecipes = document.createElement("div");

        divRecipes.innerHTML = `
            <h2>${data.meals.length} recettes</h2>
            <h3>${data.meals[i].strMeal}</h3>
            <img src="${data.meals[i].strMealThumb}">
        `;
        document.body.appendChild(divRecipes);
    }
}
recettes();



async function rechercherChansons(genre, pays, cleApi) {
    const requete = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${genre} music ${pays}&type=video&key=${cleApi}&maxResults=10`
    );
    const reponse = await requete.json();
    if (reponse.items) {
        return reponse.items.map((item) => ({
            titre: item.snippet.title,
            idVideo: item.id.videoId,
            miniature: item.snippet.thumbnails.default.url,
            chaine: item.snippet.channelTitle,
        }));
    } else {
        return [];
    }
}

async function afficherChansons(genre, pays, cleApi) {
    const chansons = await rechercherChansons(genre, pays, cleApi);
    if (chansons.length > 0) {
        console.log(`Chansons ${genre} en ${pays} :`);
        chansons.forEach((chanson) => {
            const divRecipes = document.createElement("div");
            divRecipes.innerHTML = `
        <h4>${chanson.titre} (ID: ${chanson.idVideo})</h4>
        <h2>Chaîne: ${chanson.chaine}</h2>
         <img src="${chanson.miniature}" alt="Miniature de la vidéo">
         `;
            document.body.appendChild(divRecipes);
        });
    } else {
        console.log(`Aucune chanson ${genre} trouvée en ${pays}.`);
    }
}
// Exemple d'utilisation
const genreMusical = 'pop'; // ou 'rock', 'hip-hop', etc.
const pays = 'France'; // ou 'USA', 'UK', etc.
const maCleApi = 'AIzaSyAx7Fx7yCkS28Kpz48rdCeRG8G68RJfC1E'; // Remplacez par votre clé API
afficherChansons(genreMusical, pays, maCleApi);