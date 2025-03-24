// Fonction pour obtenir des recettes par ingrédient

async function getRecipesByIngredients(type) {

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`
    const response = await fetch(url);
    const data = await response.json();
    console.log("Données reçues : ", data);
    return data.meals;
}
getRecipesByIngredients("chicken");

const imagesOfFood = document.querySelectorAll('.images img')
console.log(imagesOfFood);

for (let i = 0; i < imagesOfFood.length; i++) {
    imagesOfFood[i].addEventListener('click', async (event) => {
        console.log('coco. ', event.target.id);

        const type = event.target.id;
        const meals = await getRecipesByIngredients(type);

        getRecipesByIngredients(event.target.id);

        const imagesDiv = document.querySelector('.images');
        const divRecipes = document.createElement("div");
        divRecipes.classList.add("recipes-container");
        divRecipes.innerHTML = `
            <h2>${meals.length} recettes au ${type}</h2>
            `
        imagesDiv.parentNode.insertBefore(divRecipes, imagesDiv.nextSibling)

        if (meals) {
           meals.forEach((meal) => {
            
                const recipeDiv = document.createElement("div");
                recipeDiv.innerHTML = `
               <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
               <h3 class="meal-title">${meal.strMeal}</h3>
           `
                divRecipes.appendChild(recipeDiv);
                ;
            });
        }
        recipeDiv.innerHTML = "";
    });
}
