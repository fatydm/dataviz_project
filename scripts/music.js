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

async function afficherChansons(genre, pays, cleApi) {
    const chansons = await rechercherChansons(genre, pays, cleApi);
    if (chansons.length > 0) {
        chansons.forEach((chanson) => {
            const divRecipes = document.createElement("div");
            divRecipes.innerHTML = `
        <h4>${chanson.titre}</h4>
        <a href="${chanson.url}" target="_blank">Voir la vidéo</a>
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