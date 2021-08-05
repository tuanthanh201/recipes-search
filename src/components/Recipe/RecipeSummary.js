import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CartContext from "../../store/cart-context";
import classes from "./RecipeSummary.module.css";
import apiKey from "../../apiKey";

const RecipeSummary = (props) => {
  const cartCtx = useContext(CartContext);
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [equipmentLoading, setEquipmentLoading] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const params = useParams();
  const recipeId = params.recipe_id;
  console.log(ingredients);
  console.log(equipment);

  useEffect(() => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`;
    setIngredientLoading(true);
    fetch(url)
      .then((response) => {
        setIngredientLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Couldn't get ingredients";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const receivedIngredients = data.ingredients;
        setIngredients(receivedIngredients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeId]);

  useEffect(() => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget.json?apiKey=${apiKey}`;
    setEquipmentLoading(true);
    fetch(url)
      .then((response) => {
        setEquipmentLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Couldn't get equipment";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const receivedEquipment = data.equipment;
        setEquipment(receivedEquipment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [recipeId]);

  let pageContent;
  if (ingredientLoading || equipmentLoading) {
    return <p style={{textAlign: "center"}}>Loading...</p>
  } else if (!ingredients || !equipment) {
    pageContent = (
      <p>
        Couldn't get ingredients and equipment. Maximum quota reached, sorry :(
      </p>
    );
  } else {
    //#region ingredients and equipment
    const ingredientsList = ingredients.map((ingredient) => (
      <li key={ingredient.name}>
        <p>
          {ingredient.name}: {ingredient.amount.metric.value}{" "}
          {ingredient.amount.metric.unit}
        </p>
      </li>
    ));

    const equipmentList = equipment.map((equipment) => (
      <li>
        <p>{equipment.name}</p>
      </li>
    ));
    //#endregion

    pageContent = (
      <>
        <p className={classes["ingredient-section"]}>Ingredients:</p>
        <ul className={classes.ingredients}>{ingredientsList}</ul>
        <p className={classes["ingredient-section"]}>Equipment:</p>
        <ul className={classes.ingredients}>{equipmentList}</ul>
      </>
    );
  }

  return (
    <section className={classes.summary}>
      <h2>{cartCtx.title}</h2>
      <img src={cartCtx.image} alt="meal" />
      {pageContent}
    </section>
  );
};

export default RecipeSummary;
