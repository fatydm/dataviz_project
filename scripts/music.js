export async function rechercherChansons(genre, pays, cleApi) {
    const requete = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${genre}music${pays}&type=video&key=${cleApi}&maxResults=5`);
    const reponse = await requete.json();

    if (reponse.items) {
        return reponse.items.map((item) => ({
            // map va a buscar cada letra en los objetos para ver si corresponde
            titre: item.snippet.title.slice(0, 20),
            miniature: item.snippet.thumbnails.default.url,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`, 
        }));
    } else {
        return [];
    }
}

export async function afficherChansons(genre, pays, cleApi) {
    const chansons = await rechercherChansons(genre, pays, cleApi);
    console.log(chansons)
    const divMusic = document.getElementById("music-container");
    const titreMusicGeneral = document.createElement("h2");
    titreMusicGeneral.textContent = `${chansons.length} musique pour ${pays}`;
    divMusic.appendChild(titreMusicGeneral) 
    if (chansons.length > 0) {
        chansons.forEach((chanson) => {
            const musciDiv = document.createElement("div");
            musciDiv.innerHTML = `
        <h4 class="chanson">${chanson.titre}</h4>
        <img class="imgMusic" src="${chanson.miniature}" alt="Miniature de la vidéo">
        <a class="linkMusic" href="${chanson.link}" target="_blank">Voir la vidéo</a>
         `;
         divMusic.appendChild(musciDiv);
        });
    } else {
        console.log(`Aucune chanson ${genre} trouvée en ${pays}.`);
    }
}



