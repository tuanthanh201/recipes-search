import { useContext } from "react";

import classes from "./MealItem.module.css";
import { Link } from "react-router-dom";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cardCtx = useContext(CartContext);

  const setImage = () => {
    cardCtx.setRecipe({ title: props.title, image: props.image });
  };

  return (
    <li className={`${classes.meal} ${props.className}`}>
      <div>
        <div className={classes.title}>
          <p>{props.title}</p>
        </div>
        <img src={props.image} alt=""></img>
        <Link
          className={classes.btn}
          to={`/recipe/${props.id}`}
          onClick={setImage}
        >
          See more
        </Link>
      </div>
    </li>
  );
};

export default MealItem;
