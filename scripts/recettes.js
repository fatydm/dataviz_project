

// Correspondance entre les pays dans le SVG et les aires dans l'API
export const areas = {
  "États-Unis": "American",
  "Royaume-Uni": "British",
  "Canada": "Canadian",
  "Chine": "Chinese",
  "Croatie": "Croatian",
  "Pays-Bas": "Dutch",
  "Égypte": "Egyptian",
  "Philippines": "Filipino",
  "France": "French",
  "Grèce": "Greek",
  "Inde": "Indian",
  "Irlande": "Irish",
  "Italie": "Italian",
  "Jamaïque": "Jamaican",
  "Japon": "Japanese",
  "Kenya": "Kenyan",
  "Malaisie": "Malaysian",
  "Mexique": "Mexican",
  "Maroc": "Moroccan",
  "Pologne": "Polish",
  "Portugal": "Portuguese",
  "Russie": "Russian",
  "Espagne": "Spanish",
  "Thaïlande": "Thai",
  "Tunisie": "Tunisian",
  "Turquie": "Turkish",
  "Ukraine": "Ukrainian",
  "Uruguay": "Uruguayan",
  "Vietnam": "Vietnamese"
}



// Fonction pour obtenir des recettes par aire
export async function obtenerRecetasPorArea(area,svgCountries, hoveredCountryIdx) {
const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
const respuesta = await fetch(url);
const data = await respuesta.json();


if (data.meals) {
const divRecipes = document.getElementById("recipes-container");
const numeroRecettes = document.createElement("h2");
const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");
numeroRecettes.textContent = `${data.meals.length} recettes pour ${countryName}`;
divRecipes.appendChild(numeroRecettes);
             
data.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.innerHTML = `
      <h3 class="meal-title">${meal.strMeal}</h3>
      <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    `;
    divRecipes.appendChild(recipeDiv);
    getYouTubeLink(meal.idMeal, recipeDiv);
  });
  console.log(divRecipes.innerHTML); // Vérifie si le HTML est bien mis à jour
} else {
  console.log(`Aucune recette trouvée pour la zone : ${area}`);
}
}


    
    
async function getYouTubeLink(mealId, recipeDiv) {
    const mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealDetailsData = await mealDetailsResponse.json();
   
        const youtubeLink = mealDetailsData.meals[0].strYoutube; //Vérifie si le premier élément du tableau meals a une propriété strYoutube 
        const youtubeLinkElement = document.createElement("a");
        youtubeLinkElement.href = youtubeLink;
        console.log(youtubeLinkElement)
        youtubeLinkElement.textContent = "Pour la recette, regardez sa vidéo";
        youtubeLinkElement.target = "_blank"; // Ouvre le lien dans un nouvel onglet
        recipeDiv.appendChild(youtubeLinkElement);
    } 

        
       
        
    