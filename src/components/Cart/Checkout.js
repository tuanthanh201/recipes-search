import { useState } from "react";

import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [showCuisines, setShowCuisines] = useState(false);
  const [showDiets, setShowDiets] = useState(false);
  const [showIntolerances, setShowIntolerances] = useState(false);

  //#region
  // dish
  const {
    value: dish,
    valueIsValid: dishIsValid,
    valueIsInvalid: dishIsInvalid,
    valueChangeHandler: dishChangeHandler,
    valueBlurHandler: dishBlurHandler,
    reset: dishReset,
  } = useInput((value) => value.trim() !== "");
  // cuisine
  const {
    value: cuisine,
    valueIsValid: cuisineIsValid,
    valueIsInvalid: cuisineIsInvalid,
    valueChangeHandler: cuisineChangeHandler,
    valueBlurHandler: cuisineBlurHandler,
    reset: cuisineReset,
  } = useInput((value) => value.trim() !== "");
  // diet
  const {
    value: diet,
    valueIsValid: dietIsValid,
    valueIsInvalid: dietIsInvalid,
    valueChangeHandler: dietChangeHandler,
    valueBlurHandler: dietBlurHandler,
    reset: dietReset,
  } = useInput((value) => value.trim() !== "");
  // intolerances
  const {
    value: intolerances,
    valueIsValid: intolerancesIsValid,
    valueIsInvalid: intolerancesIsInvalid,
    valueChangeHandler: intolerancesChangeHandler,
    valueBlurHandler: intolerancesBlurHandler,
    reset: intolerancesReset,
  } = useInput((value) => value.trim() !== "");
  //#endregion
  const formIsValid =
    dishIsValid && cuisineIsValid && dietIsValid && intolerancesIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const data = {
      dish,
      cuisine,
      diet,
      intolerances,
    };
    props.onConfirm(data);
    dishReset();
    cuisineReset();
    dietReset();
    intolerancesReset();
  };

  const dishClasses = `${classes.control} ${
    dishIsInvalid ? classes.invalid : ""
  }`;
  const cuisineClasses = `${classes.control} ${
    cuisineIsInvalid ? classes.invalid : ""
  }`;
  const dietClasses = `${classes.control} ${
    dietIsInvalid ? classes.invalid : ""
  }`;
  const intolerancesClasses = `${classes.control} ${
    intolerancesIsInvalid ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler} autoComplete="off">
      <div className={dishClasses}>
        <label htmlFor="dish">Dish</label>
        <input
          type="text"
          id="dish"
          onChange={dishChangeHandler}
          onBlur={dishBlurHandler}
          value={dish}
        />
        {dishIsInvalid && (
          <p className={classes["error-text"]}>
            Please enter the dish you want to search for.
          </p>
        )}
      </div>
      <div className={cuisineClasses}>
        <label htmlFor="cuisine">
          Cuisine(s)
          <span
            className={classes["error-text"]}
            onMouseOver={() => setShowCuisines(true)}
            onMouseOut={() => setShowCuisines(false)}
          >
            {" "}
            (Supported cuisines)
          </span>
        </label>
        {showCuisines && (
          <p className={classes["error-text"]}>
            African, American, British, Cajun, Caribbean, Chinese, Eastern,
            European, European, French, German, Greek, Indian, Irish, Italian,
            Japanese, Jewish, Korean, Latin, American, Mediterranean, Mexican,
            Middle Eastern, Nordic, Southern, Spanish, Thai, Vietnamese
          </p>
        )}
        <input
          type="text"
          id="cuisine"
          onChange={cuisineChangeHandler}
          onBlur={cuisineBlurHandler}
          value={cuisine}
        />
        {cuisineIsInvalid && (
          <p className={classes["error-text"]}>Please enter cuisine(s).</p>
        )}
      </div>
      <div className={dietClasses}>
        <label htmlFor="diet">
          Diet
          <span
            className={classes["error-text"]}
            onMouseOver={() => setShowDiets(true)}
            onMouseOut={() => setShowDiets(false)}
          >
            {" "}
            (Supported diets)
          </span>
        </label>
        {showDiets && (
          <p className={classes["error-text"]}>
            Gluten Free, Ketogenic, Vegetarian, Lacto-Vegetarian,
            Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, Whole30
          </p>
        )}

        <input
          type="text"
          id="diet"
          onChange={dietChangeHandler}
          onBlur={dietBlurHandler}
          value={diet}
        />
        {dietIsInvalid && (
          <p className={classes["error-text"]}>Please enter your diet.</p>
        )}
      </div>
      <div className={intolerancesClasses}>
        <label htmlFor="intolerances">
          intolerance(s)
          <span
            className={classes["error-text"]}
            onMouseOver={() => setShowIntolerances(true)}
            onMouseOut={() => setShowIntolerances(false)}
          >
            {" "}
            (Supported intolerances)
          </span>
        </label>
        {showIntolerances && (
          <p className={classes["error-text"]}>
            Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy,
            Sulfite, Tree Nut, Wheat
          </p>
        )}
        <input
          type="text"
          id="intolerances"
          onChange={intolerancesChangeHandler}
          onBlur={intolerancesBlurHandler}
          value={intolerances}
        />
        {intolerancesIsInvalid && (
          <p className={classes["error-text"]}>
            Please enter food that you are allergic to.
          </p>
        )}
      </div>
      <p className={classes["error-text"]}>
        * Write 'None' if there's no preference
        <br />
        * Separate cusines and intolerances by commas
      </p>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes["button--alt"]}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Search
        </button>
      </div>
    </form>
  );
};

export default Checkout;
