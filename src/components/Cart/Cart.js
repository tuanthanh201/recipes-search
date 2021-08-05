import { useState } from "react";
import { useHistory } from "react-router";

import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import apiKey from "../../apiKey";

const Cart = (props) => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const submitOrderHandler = async (data) => {
    const getRecipes = async (data) => {
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
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${query}${cuisine}${diet}${intolerances}&number=20`;

      const response = await fetch(url);
      const parsedData = await response.json();
      const results = parsedData.results;

      if (!response.ok) {
        throw new Error(parsedData.message || "Could not fetch recipes");
      }

      // Initially I want to search for 100 recipes (max allowed) but I don't have money ._.
      // const resultsLength = results.length;
      // const indices = [];
      // const recipes = [];
      // let count = 0;
      // let recipeLength = 0;
      // while (count < 20 && recipeLength !== resultsLength) {
      //   const index = Math.floor(Math.random() * resultsLength);
      //   if (!indices.includes(index)) {
      //     indices.push(index);
      //     recipes.push(results[index]);
      //     count++;
      //     recipeLength++;
      //   }
      // }

      return results;
    };

    setIsSubmitting(true);
    const receivedRecipes = await getRecipes(data);
    localStorage.setItem("recipes", JSON.stringify(receivedRecipes));
    setDidSubmit(true);
    setIsSubmitting(false);
    history.replace("/food");
  };

  const cartModalContent = (
    <>
      <Checkout
        onConfirm={submitOrderHandler}
        onCancel={props.hideCartHandler}
      />
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order!</p>;

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
  //#endregion
};

export default Cart;
