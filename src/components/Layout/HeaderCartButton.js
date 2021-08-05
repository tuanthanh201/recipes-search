import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  return (
    <button className={classes.button} onClick={props.showCartHandler}>
      <span className={classes.icon}>
        <i className="fas fa-search"></i>
      </span>
      <span>Search</span>
    </button>
  );
};

export default HeaderCartButton;
