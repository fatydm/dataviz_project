const divRecipes = document.createElement("div");
divRecipes.classList.add('divRecipes')


async function obtenerRecetasPorArea(area) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
   
    
    divRecipes.innerHTML = `
    <h2>${data.meals.length} recettes</h2>`;

    for (let i = 0; i < data.meals.length; i++) {
         divRecipes.innerHTML += `
        
        <div class="eachMeal">
                <img class="meal-image" src="${data.meals[i].strMealThumb}">
                <h3 class="meal-title">${data.meals[i].strMeal}</h3>
        </div>
    `;
    document.body.appendChild(divRecipes);
    }
}

const mexicanButton = document.querySelector('[data-name="Mexico"]')
mexicanButton.addEventListener("click", () => {
        (obtenerRecetasPorArea("Mexican"))
        divRecipes.innerHTML = ""   
})


