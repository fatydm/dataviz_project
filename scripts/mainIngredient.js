// // Fonction pour obtenir des recettes par ingrédient

// async function getRecipesByIngredients(type) {
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("Données reçues : ", data);

//     return data.meals;
// }

// const imagesOfFood = document.querySelectorAll('.images img');
// console.log(imagesOfFood);

// imagesOfFood.forEach(image => {
//     image.addEventListener('click', async (event) => {

//         console.log('coco. ', event.target.id);

//         const type = event.target.id;
//         const meals = await getRecipesByIngredients(type);

//         const imagesDiv = document.querySelector('.images');

//         // Supprime l'ancienne section des recettes si elle existe
//         const oldRecipesContainer = document.querySelector('.recipes-container');
//         if (oldRecipesContainer) {
//             oldRecipesContainer.remove();
//         }

//         imagesOfFood.forEach(img => img.classList.remove('active'));

//         event.target.classList.add('active');

//         const divRecipes = document.createElement("div");
//         divRecipes.classList.add("recipes-container");

//         imagesDiv.parentNode.insertBefore(divRecipes, imagesDiv.nextSibling);

//         if (meals) {
//             meals.forEach((meal) => {
//                 const recipeDiv = document.createElement("div");
//                 recipeDiv.classList.add("recipe");

//                 recipeDiv.innerHTML = `
//                 <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
//                 <h3 class="meal-title">${meal.strMeal}</h3>
//                 `;
//                 divRecipes.appendChild(recipeDiv);
//             });
//         }
//     });
// });

// Fonction pour obtenir des recettes par ingrédient
async function getRecipesByIngredients(type) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Données reçues : ", data);

    return data.meals;
}

const imagesOfFood = document.querySelectorAll('.images img');
const imagesDiv = document.querySelector('.images');

imagesOfFood.forEach(image => {
    image.addEventListener('click', async (event) => {
        const type = event.target.id;
        const meals = await getRecipesByIngredients(type);

        const oldRecipesContainer = document.querySelector('.recipes-container');
        if (oldRecipesContainer) {
            oldRecipesContainer.remove();
        }

        // J'ai fait une condition ici pour cacher les autres images
        imagesOfFood.forEach(img => {
            if (img !== event.target) {
                img.style.display = 'none';
                event.target.style.display = 'block';
                event.target.style.gridColumn = 'span 2';
            }
        });

        const divRecipes = document.createElement("div");
        divRecipes.classList.add("recipes-container");

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('close-button');
        divRecipes.appendChild(closeButton);

        if (meals) {
            meals.forEach((meal) => {
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

                recipeDiv.innerHTML = `
                <img class="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3 class="meal-title">${meal.strMeal}</h3>
                `;
                divRecipes.appendChild(recipeDiv);
            });
        }

        imagesDiv.parentNode.insertBefore(divRecipes, imagesDiv.nextSibling);

        closeButton.addEventListener('click', () => {
            divRecipes.remove(); 
            imagesOfFood.forEach(img => img.style.display = 'inline-block');
            event.target.style.display = 'grid';
            event.target.style.gridColumn = 'span 1';
        });
    });
});
