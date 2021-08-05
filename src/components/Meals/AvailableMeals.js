import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);

  useEffect(() => {
    const receivedRecipes = localStorage.getItem("recipes");
    setRecipes(JSON.parse(receivedRecipes));
  }, []);

  let pageContent;
  if (!recipes || recipes.length === 0) {
    pageContent = (
      <p style={{ textAlign: "center" }}>Please start by searching for recipes</p>
    );
  } else {
    const recipesList = recipes.map((recipe) => (
      <MealItem
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
      />
    ));
    pageContent = <ul className={classes["meal-template"]}>{recipesList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{pageContent}</Card>
    </section>
  );
};

export default AvailableMeals;
