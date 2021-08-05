import apiKey from "../apiKey";

// Get Recipes
export const getRecipes = async (data) => {
  // const { dish: query, cuisine, diet, intolerances } = data;

  // Format data
  const receivedQuery = data.dish.toLowerCase();
  const receivedCuisine = data.cuisine.toLowerCase();
  const receivedDiet = data.diet.toLowerCase();
  const receivedIntolerances = data.intolerances.toLowerCase();

  // Check data
  const query = receivedQuery === "none" ? "" : `&query=${receivedQuery}`;
  const cuisine =
    receivedCuisine === "none" ? "" : `&cusine=${receivedCuisine}`;
  const diet = receivedDiet === "none" ? "" : `&diet=${receivedDiet}`;
  const intolerances =
    receivedIntolerances === "none"
      ? ""
      : `&intolerances=${receivedIntolerances}`;

  // Create url
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${query}${cuisine}${diet}${intolerances}&number=100`;

  const response = await fetch(url);
  const parsedData = await response.json();
  const results = parsedData.results;

  if (!response.ok) {
    throw new Error(parsedData.message || "Could not fetch recipes");
  }

  const resultsLength = results.length;
  const indices = [];
  const recipes = [];
  let count = 0;
  let recipeLength = 0;
  while (count < 20 && recipeLength !== resultsLength) {
    const index = Math.floor(Math.random() * resultsLength);
    if (!indices.includes(index)) {
      indices.push(index);
      recipes.push(results[index]);
      count++;
      recipeLength++;
    }
  }

  return recipes;
};

// Get Ingredients
export const getIngredients = async () => {};
