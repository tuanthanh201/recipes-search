import { createContext } from "react";

const CartContext = createContext({
  title: "",
  image: "",
  recipes: [],
  setRecipe: (recipe) => {},
  setRecipes: (recipes) => {},
});

export default CartContext;
