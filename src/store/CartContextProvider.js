import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  title: localStorage.getItem("title") ? localStorage.getItem("title") : "",
  image: localStorage.getItem("image") ? localStorage.getItem("image") : "",
  recipes: localStorage.getItem("recipes")
    ? localStorage.getItem("recipes")
    : [],
};

const cartReducer = (state, action) => {
  if (action.type === "SET RECIPE") {
    const { title, image } = action.recipe;
    // Clear storage
    localStorage.removeItem("title");
    localStorage.removeItem("image");

    // Set storage
    localStorage.setItem("title", title);
    localStorage.setItem("image", image);

    return {
      title,
      image,
      recipes: state.recipes,
    };
  } else if (action.type === "SET RECIPES") {
    localStorage.removeItem("recipes");
    localStorage.setItem("recipes", action.recipes);
    return {
      ...state,
      recipes: action.recipes,
    };
  } else {
    return state;
  }
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const setRecipe = (recipe) => {
    dispatchCartAction({ type: "SET RECIPE", recipe });
  };

  const setRecipes = (recipes) => {
    dispatchCartAction({ type: "SET RECIPES", recipes });
  };

  const context = {
    title: cartState.title,
    image: cartState.image,
    setRecipe,
    setRecipes,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
