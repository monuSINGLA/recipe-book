const searchBox = document.querySelector(".searchBox");
const searchButton = document.querySelector(".btn");
const recipeContainer = document.querySelector(".recipe_container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const closeBtn = document.querySelector(".recipe-close-btn")
const recipeDetails = document.querySelector(".recipe-details")
const video = document.querySelector(".fa-youtube");

// fetch recipes by api 
async function fetchRecipes(query) {
    recipeContainer.innerHTML = `<h2 class="fetching-recipe">Fetching Recipes.....<h2>`

    try {

        const resposnse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const data = await resposnse.json()

        recipeContainer.innerHTML = " ";
        data.meals.forEach(meal => {
            console.log(meal)
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span/>${meal.strArea}</span> Dish! <P>
        <p>Belongs to <span>${meal.strCategory}</span><P>
        
        
        `
            // creating veiw recipe and recipe video button 
            const button = document.createElement("button");
            button.textContent = "View Recipe"

            const videoButton = document.createElement("i");
            videoButton.classList.add("fa-brands", "fa-youtube", "fa-beat-fade");
            recipeDiv.appendChild(videoButton);
            recipeDiv.appendChild(button);

            //appending recipe div in main recipe container//
            recipeContainer.appendChild(recipeDiv)

            // adding evenlistner on video button
            videoButton.addEventListener("click", () => {
                openVideoPopPup(meal);
            });

            // adding event listner in recipe button 
            button.addEventListener("click", () => {
                openRecipePopPup(meal);
            });

        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2> Dish not found</h2>`
    }
}

// funingredientsction for fetch ingredients
const fetchIngredients = (meal) => {
    let ingredients = " ";

    console.log(meal.strInstructions)
    for (let i = 1; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
            const measurment = meal[`strMeasure${i}`]
            ingredients += `<li>${measurment} : ${ingredient}</li> `;


        } else {
            break;
        }

    }
    return ingredients

}


// -------poppup function---------
const openRecipePopPup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipe-name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
        <div class="instructions">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p>
        </div>
    `


    recipeDetailsContent.parentElement.style.display = "block"
}

window.addEventListener("DOMContentLoaded", () => {
    searchBox.focus();
})

closeBtn.addEventListener("click", () => {
    recipeDetails.style.display = "none"
})

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Plaease enter recipe name in search box.</h2>`;
        return
    } else {

        fetchRecipes(searchInput)
    }
});

// -----videoPopPup------
const openVideoPopPup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h3 class= "wtachVideoHeading">Watch Video</h3>
        <iframe class="iframe" width="520" height="315" src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
        
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

