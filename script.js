import apiKey from './config.js';
const recipeList = document.getElementById("recipe-list");

// Async function to fetch and display recipes
const displayRecipes = async () => {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`
        );

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        const recipes = data.recipes;

        recipeList.innerHTML = ""; // Clear existing recipes

        // Use map to create HTML for each recipe item and join to insert them all at once
        recipeList.innerHTML = recipes.map((recipe) => `
            <li class="recipe-item">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <p><strong>Ingredients:</strong> ${recipe.extendedIngredients
                    .map((ingredient) => ingredient.original)
                    .join(", ")}</p>
                <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
            </li>
        `).join(""); // Join to create a single string of HTML to insert
    } catch (error) {
        console.error("Error fetching or displaying recipes:", error);
        recipeList.innerHTML = "<p>Sorry, we couldn't load the recipes. Please try again later.</p>";
    }
};

// Initialize the display of recipes
displayRecipes();