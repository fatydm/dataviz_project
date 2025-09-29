
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

const modal = document.querySelector(".modal")


// Fonction pour obtenir des recettes par aire
export async function obtenerRecetasPorArea(area,svgCountries, hoveredCountryIdx) {
const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
const respuesta = await fetch(url);
const data = await respuesta.json();

if (data.meals) {
const divRecipes = document.getElementById("recipes-container");

const numeroRecettes = document.createElement("h2");
const countryName = svgCountries[hoveredCountryIdx].getAttribute("data-name");
numeroRecettes.textContent = `${data.meals.length} recettes pour "${countryName}"`;
divRecipes.appendChild(numeroRecettes);
             
data.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("eachMeal");
    recipeDiv.innerHTML = `
      <h3 class="meal-title">${meal.strMeal}</h3>
      <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    `;
    recipeDiv.classList.add("recipe");
    divRecipes.appendChild(recipeDiv);

    const mealImage = document.querySelector('.meal-image');
    recipeDiv.addEventListener("click",() => {
      getInstructions(meal.idMeal);
    })
    getYouTubeLink(meal.idMeal, recipeDiv);
  });
  console.log(divRecipes.innerHTML); 
} else {
  divRecipes.innerHTML = ""
}
}


async function getYouTubeLink(mealId, recipeDiv) {
    const mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealDetailsData = await mealDetailsResponse.json();
   
        const youtubeLink = mealDetailsData.meals[0].strYoutube; 
        const youtubeLinkElement = document.createElement("a");
        youtubeLinkElement.classList.add("youtube");
        youtubeLinkElement.href = youtubeLink;
        console.log(youtubeLinkElement)
        youtubeLinkElement.textContent = "La recette en vidéo, ici.";
        youtubeLinkElement.target = "_blank";
        recipeDiv.appendChild(youtubeLinkElement);
    } 


  const closeModal = document.querySelector('.closeModal')
  async function getInstructions(mealId) {
  modal.innerText = "";  
  modal.style.display = "flex";
  closeModal.style.display = "flex"

    const mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealsDetailsData = await mealDetailsResponse.json();

      const instructions = mealsDetailsData.meals[0].strInstructions;
      // console.log(instructionsLink)
      const instructionsElement = document.createElement('p');
      instructionsElement.classList.add('instructionParagraph')
      instructionsElement.textContent = instructions;
      
      modal.appendChild(instructionsElement);
}      

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
  closeModal.style.display = "none"
})